"use client"
import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import { signIn } from "next-auth/react"
import axios from "axios"
import { S3 } from "aws-sdk"

import Input from "@/app/components/ui/Input"
import Button from "@/app/components/ui/Button"

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
  const s3 = new S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION,
  })

  const authFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    // setIsLoading(true)
    // サインイン処理のみ
    if (variant === "Login") {
      data = { ...data, purpose }
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
    // アカウント作成処理とサインイン処理
    if (variant === "Register") {
      // Businessの場合S3の画像保存処理
      if (purpose === "Business") {
        // アップロードの時間を追加してs3に保存
        const fileName = `${Date.now()}-${data.image[0].name}`;
        console.log(data.image[0])
        const params = {
          Bucket: process.env.S3_BUCKET_NAME ? process.env.S3_BUCKET_NAME : '',
          Key: fileName,
          ContentType: data.image[0].type,
          Body: data.image[0],
        }
        try {
          const s3ResponseData = await s3.upload(params).promise()
          data = { ...data, image: s3ResponseData.Location }
        } catch (error) {
          console.error(error)
          return null
        }
      }
      data = { ...data, purpose }
      axios.post("/api/register", data)
        .then(() => signIn("credentials", { ...data, redirect: false }))
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
  }

  return (
    <div className="px-[480px] py-[160px] ">
      {/* inner */}
      <div className="bg-white text-center h-[500px]">
        {/* アカウント作成時のみpurpose切り替え */}
        {variant === "Register" &&
          <div className="flex justify-between">
            <div className="" onClick={() => { purpose === "Business" && changePurpose() }}>User</div>
            <div onClick={() => { purpose === "User" && changePurpose() }}>Business</div>
          </div>
        }

        <form onSubmit={handleSubmit(authFormSubmit)}>
          <Input type="text" id="email" label="email" disabled={isLoading} required={true} register={register} />
          <Input type="password" id="password" label="password" disabled={isLoading} required={true} register={register} />
          {variant === "Register" && (
            <>
              {/* アカウント作成の場合のみ入力する物 */}
              <Input type="text" id="name" label="name" disabled={isLoading} required={true} register={register} />
              {purpose === "Business" && (
                <>
                  {/* 商用アカウントの場合のみ入力する物 */}
                  <Input type="text" id="address" label="address" disabled={isLoading} required={true} register={register} />
                  <Input type="file" id="image" label="image" disabled={isLoading} required={true} register={register} />
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

      </div>
    </div>
  )
}

export default AuthForm