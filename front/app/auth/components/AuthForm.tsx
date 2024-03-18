"use client"
import { useState, useEffect, useCallback, FC } from "react"
import { useRouter } from "next/navigation"
import { useForm, SubmitHandler, FieldValues, useWatch } from "react-hook-form"
import { useSession, signIn } from "next-auth/react"
import axios from "axios"
import clsx from "clsx"

import Input from "@/app/components/ui/Input"
import Button from "@/app/components/ui/Button"
import FormBase from "@/app/components/base/FormBase"
import uploadImageToS3 from "@/app/lib/s3"
import { usePurposeStore } from "@/app/lib/store/purpose"

const AuthForm: FC = () => {

  const [variant, setVariant] = useState<"REGISTER" | "LOGIN">("LOGIN")
  const [purpose, setPurpose] = useState<"USER" | "SHOP">("USER")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm()
  const watchLat = useWatch({ control, name: "lat" })
  const watchLng = useWatch({ control, name: "lng" })
  const session = useSession()
  const setGlobalPurpose = usePurposeStore((state) => state.setGlobalPurpose)


  const changeVariant = useCallback(() => {
    variant === "LOGIN" && setVariant("REGISTER")
    variant === "REGISTER" && setVariant("LOGIN")
  }, [variant])

  const changePurpose = useCallback(() => {
    purpose === "USER" && setPurpose("SHOP")
    purpose === "SHOP" && setPurpose("USER")
  }, [purpose])


  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/")
    }
  }, [session])

  const getPresentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setValue("lat", position.coords.latitude)
      setValue("lng", position.coords.longitude)
    })
  }, [])

  const authFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    // ログインする種類の指定に使用
    setIsLoading(true)
    data = { ...data, purpose }
    // サインインしてルートに移動
    if (variant === "LOGIN") {
      signIn("credentials", { ...data, redirect: false })
        .then((callback) => {
          if (callback?.error) {
            console.error("error")
          }
          if (callback?.ok) {
            router.push("/")
          }
        })
        .finally(() => {
          setIsLoading(false)
          setGlobalPurpose(purpose)
        })
    }
    // アカウント作成とサインインしてルートに移動
    if (variant === "REGISTER") {
      // ShopのS3の画像保存
      if (purpose === "SHOP") {
        const imageURL = await uploadImageToS3(data)
        if (!imageURL) {
          return null
        }
        data = { ...data, imageURL }
      }
      axios.post("/api/register", data)
        .then(() => signIn("credentials", { ...data, redirect: false }))
        .then((callback) => {
          if (callback?.error) {
            console.error(callback.error)
          }
          if (callback?.ok) {
            router.push("/")
          }
        })
        .finally(() => {
          setIsLoading(false)
          setGlobalPurpose(purpose)
        })
    }
  }

  return (
    <FormBase>
      <h2 className="mb-6 text-4xl font-bold">{variant === "LOGIN" ? "LOGIN" : "REGISTER"}</h2>
      <div className="
          mb-6
          flex justify-between 
          border-b 
        ">
        <div
          className={clsx(`
              px-5
              py-2
              bg-white
              `,
            purpose === "USER" && `
              mb-[-1px]
              border-t border-x
              `
          )}
          onClick={() => { purpose === "SHOP" && changePurpose() }}
        >
          USER
        </div>
        <div
          className={clsx(`
            px-5
            py-2
            bg-white
            `,
            purpose === "SHOP" && `
              mb-[-1px]
              border-t border-x
            `
          )}
          onClick={() => { purpose === "USER" && changePurpose() }}
        >
          SHOP
        </div>
      </div>

      <form
        className=""
        onSubmit={handleSubmit(authFormSubmit)}
      >
        {/* ログイン・アカウント作成どちらも表示 */}
        <Input disabled={isLoading} required={true} register={register} errors={errors} type="text" id="email" label="Email" />
        <Input disabled={isLoading} required={true} register={register} errors={errors} type="password" id="password" label="Password" />

        {variant === "REGISTER" && ( //アカウント作成のみ表示
          <>
            <Input disabled={isLoading} required={true} register={register} errors={errors} type="text" id="name" label="Name" />
            {purpose === "SHOP" && ( //アカウント作成 (商用アカウント作成)のみ表示
              <>
                <Input disabled={isLoading} required={true} register={register} errors={errors} type="text" id="address" label="Address" />
                <p>緯度、経度を入力、または位置情報から緯度、経度を取得してください</p>
                <Button onClick={getPresentLocation} disabled={isLoading || watchLat || watchLng} label="位置情報からのアドレスを登録" />
                <Input disabled={isLoading} required={true} register={register} errors={errors} type="text" id="lat" label="Latitude" forNumber />
                <Input disabled={isLoading} required={true} register={register} errors={errors} type="text" id="lng" label="Longitude" forNumber />
                <Input disabled={isLoading} required={true} register={register} errors={errors} type="file" id="image" label="Image" control={control} />
              </>
            )}
          </>
        )}
        <div className="mt-10">
          <Button label={variant === "REGISTER" ? "REGISTER" : "LOGIN"} disabled={isLoading} />
        </div>
      </form>

      {/* variant切り替え */}
      <div
        onClick={() => changeVariant()}
        className=" 
        text-link
        "
      >
        {variant === "LOGIN" ? "REGISTER" : "LOGIN"}
      </div>


    </FormBase>
  )
}

export default AuthForm