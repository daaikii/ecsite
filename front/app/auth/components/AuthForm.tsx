"use client"
import { useState, useEffect, useCallback, FC } from "react"
import { useRouter } from "next/navigation"
import { useForm, SubmitHandler, FieldValues, useWatch } from "react-hook-form"
import { useSession, signIn } from "next-auth/react"
import axios from "axios"

import Input from "@/app/components/ui/Input"
import Button from "@/app/components/ui/Button"
import FormBase from "@/app/components/base/FormBase"
import uploadImageToS3 from "@/app/lib/s3"

const AuthForm: FC = () => {

  const [variant, setVariant] = useState<"Register" | "Login">("Login")
  const [purpose, setPurpose] = useState<"User" | "Shop">("User")
  const [isLoading, setIsLoading] = useState(false)
  const [lat, setLat] = useState<number>()
  const [lng, setLng] = useState<number>()
  const router = useRouter()
  const { register, handleSubmit, formState: { errors }, control } = useForm()
  const watchLat = useWatch({ control, name: "lat" })
  const watchLng = useWatch({ control, name: "lng" })

  const changeVariant = useCallback(() => {
    variant === "Login" && setVariant("Register")
    variant === "Register" && setVariant("Login")
  }, [variant])
  const changePurpose = useCallback(() => {
    purpose === "User" && setPurpose("Shop")
    purpose === "Shop" && setPurpose("User")
  }, [purpose])
  const session = useSession()
  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/")
    }
  }, [session])
  const getPresentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude)
      setLng(position.coords.longitude)
    })
  }, [])

  const authFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    // ログインする種類の指定に使用
    data = { ...data, purpose }
    setIsLoading(true)
    // サインインしてルートに移動
    if (variant === "Login") {
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
        })
    }
    // アカウント作成とサインインしてルートに移動
    if (variant === "Register") {
      // ShopのS3の画像保存
      if (purpose === "Shop") {
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
        })
    }
  }

  return (
    <FormBase>

      {/* アカウント作成時のみpurpose切り替え可 */}
      {
        variant === "Register" &&
        <div className="flex justify-between">
          <div className="" onClick={() => { purpose === "Shop" && changePurpose() }}>User</div>
          <div onClick={() => { purpose === "User" && changePurpose() }}>Shop</div>
        </div>
      }

      <form onSubmit={handleSubmit(authFormSubmit)}>
        {/* ログイン・アカウント作成どちらも表示 */}
        <Input disabled={isLoading} required={true} register={register} errors={errors} type="text" id="email" label="email" />
        <Input disabled={isLoading} required={true} register={register} errors={errors} type="password" id="password" label="password" />

        {variant === "Register" && ( //アカウント作成のみ表示
          <>
            <Input disabled={isLoading} required={true} register={register} errors={errors} type="text" id="name" label="name" />
            {purpose === "Shop" && ( //アカウント作成 (商用アカウント作成)のみ表示
              <>
                <Input disabled={isLoading} required={true} register={register} errors={errors} type="text" id="address" label="address" />
                <p>緯度、経度を入力、または位置情報から緯度、経度を取得してください</p>
                <Input disabled={isLoading} required={true} register={register} errors={errors} type="text" id="lat" label="latitude" forNumber />
                <Input disabled={isLoading} required={true} register={register} errors={errors} type="text" id="lng" label="longitude" forNumber />
                <Button onClick={getPresentLocation} disabled={isLoading || watchLat || watchLng} label="位置情報からのアドレスを登録" />
                <Input disabled={isLoading} required={true} register={register} errors={errors} type="file" id="image" label="image" control={control} />
              </>
            )}
          </>
        )}

        <Button label={variant === "Register" ? "Register" : "Login"} disabled={isLoading} />
      </form>

      {/* variant切り替え */}
      <div onClick={() => changeVariant()}>
        {variant === "Login" ? "Register" : "Login"}
      </div>


    </FormBase>
  )
}

export default AuthForm