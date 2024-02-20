"use client"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import { useSession, signIn } from "next-auth/react"
import axios from "axios"

import Input from "@/app/components/ui/Input"
import Button from "@/app/components/ui/Button"
import FormBase from "@/app/components/base/FormBase"
import uploadImageToS3 from "@/app/lib/s3"

const AuthForm = () => {

  const [variant, setVariant] = useState<"Register" | "Login">("Login")
  const [purpose, setPurpose] = useState<"User" | "Business">("User")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const changeVariant = useCallback(() => {
    variant === "Login" && setVariant("Register")
    variant === "Register" && setVariant("Login")
  }, [variant])
  const changePurpose = useCallback(() => {
    purpose === "User" && setPurpose("Business")
    purpose === "Business" && setPurpose("User")
  }, [purpose])
  const session = useSession()
  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/")
    }
  }, [session])

  const authFormSubmit: SubmitHandler<FieldValues> = async (data) => {
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
      // BusinessのS3の画像保存
      if (purpose === "Business") {
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

      {/* アカウント作成時のみpurpose切り替え */}
      {
        variant === "Register" &&
        <div className="flex justify-between">
          <div className="" onClick={() => { purpose === "Business" && changePurpose() }}>User</div>
          <div onClick={() => { purpose === "User" && changePurpose() }}>Business</div>
        </div>
      }

      <form onSubmit={handleSubmit(authFormSubmit)}>
        {/* ログイン・アカウント作成どちらも表示 */}
        <Input disabled={isLoading} required={true} register={register} errors={errors} type="text" id="email" label="email" />
        <Input disabled={isLoading} required={true} register={register} errors={errors} type="password" id="password" label="password" />

        {variant === "Register" && ( //アカウント作成のみ表示
          <>
            <Input disabled={isLoading} required={true} register={register} errors={errors} type="text" id="name" label="name" />
            {purpose === "Business" && ( //アカウント作成 (商用アカウント作成)のみ表示
              <>
                <Input disabled={isLoading} required={true} register={register} errors={errors} type="text" id="address" label="address" />
                <Input disabled={isLoading} required={true} register={register} errors={errors} type="file" id="image" label="image" />
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