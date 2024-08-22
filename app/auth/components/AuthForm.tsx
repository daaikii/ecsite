"use client"
import { useState, useEffect, useCallback, FC, ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import { useSession, signIn } from "next-auth/react"
import axios from "axios"
import clsx from "clsx"
import { FaExclamationTriangle, FaRegQuestionCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Link from 'next/link'

import Input from "@/app/components/ui/Input"
import FileInput from "@/app/components/ui/FileInput"
import Button from "@/app/components/ui/Button"
import FormBase from "@/app/components/base/FormBase"
import uploadImageToS3 from "@/app/action/uploadImageToS3"
import { usePurposeStore } from "@/app/lib/store/purpose"



const AuthForm: FC = () => {
  const router = useRouter()
  const session = useSession()
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm()

  const setGlobalPurpose = usePurposeStore((state) => state.setGlobalPurpose)
  const [isLoading, setIsLoading] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const [errorMessage, setErrorMessage] = useState<null | string>(null)


  const [variant, setVariant] = useState<"REGISTER" | "LOGIN">("LOGIN")
  const changeVariant = useCallback(() => {
    variant === "LOGIN" && setVariant("REGISTER")
    variant === "REGISTER" && setVariant("LOGIN")
  }, [variant])


  const [purpose, setPurpose] = useState<"USER" | "SHOP">("USER")
  const changePurpose = useCallback(() => {
    purpose === "USER" && setPurpose("SHOP")
    purpose === "SHOP" && setPurpose("USER")
  }, [purpose])


  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/")
    }
  }, [session])


  const getPresentLocation = useCallback(() => {      //位置情報を取得し、値を設定。
    navigator.geolocation.getCurrentPosition((position) => {
      if (!position) {
        throw new Error("failed to get location information")
      }
      setValue("lat", position.coords.latitude)
      setValue("lng", position.coords.longitude)
    })
  }, [])


  const authFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)
    setErrorMessage("")
    data = { ...data, purpose }    // ログインする種類の指定に使用

    try {
      // throw new Error("Error")
      if (variant === "LOGIN") {

        const callback = await signIn("credentials", { ...data, redirect: false })
        if (callback?.error) {
          setErrorMessage("認証情報が正しくありません。修正し再度実行してください。")
          setIsLoading(false)
          return
        }

      } else if (variant === "REGISTER") {

        if (purpose === "SHOP") {      // ShopのS3の画像保存
          const imageURL = await uploadImageToS3(data, "")
          if (!imageURL) {
            throw new Error("failed to upload image")
          }
          data = { ...data, imageURL }
        }

        await axios.post("/api/register", data)
        const callback = await signIn("credentials", { ...data, redirect: false })
        if (callback?.error) {
          throw new Error("filed to logIn")
        }

      } else {
        throw new Error("invalid purpose")
      }
      reset()
      setGlobalPurpose(purpose)
      router.push("/")


    } catch (error) {
      console.error("An unexpected error occurred:", error)
      setErrorMessage("予期しないエラーが発生しました。しばらくしてから再度お試しください。")


    } finally {
      setIsLoading(false)
    }
  }



  return (
    <>
      <FormBase>
        <h2 className="mb-6 text-4xl font-bold">{variant === "LOGIN" ? "LOGIN" : "REGISTER"}</h2>


        <div className="mb-6 flex justify-between border-b ">
          <div
            className={clsx(`
              px-5 py-2 bg-white text-2xl font-bold cursor-pointer
              `, purpose === "USER" && `mb-[-1px] border-t border-x`
            )}
            onClick={() => { purpose === "SHOP" && changePurpose() }}
          >USER</div>

          <div
            className={clsx(`
              px-5 py-2 bg-white text-2xl font-bold cursor-pointer
              `, purpose === "SHOP" && `mb-[-1px] border-t border-x`
            )}
            onClick={() => { purpose === "USER" && changePurpose() }}
          >SHOP</div>
        </div>


        <form onSubmit={handleSubmit(authFormSubmit)}>
          {/* ログイン・アカウント作成どちらも表示 */}
          <Input disabled={isLoading} required={true} register={register} errors={errors} type="text" id="email" label="Email" />
          <Input disabled={isLoading} required={true} register={register} errors={errors} type="password" id="password" label="パスワード" />

          {variant === "REGISTER" && ( //アカウント作成のみ表示
            <>
              <Input disabled={isLoading} required={true} register={register} errors={errors} type="text" id="name" label="名前または会社名" />

              {purpose === "SHOP" && ( //アカウント作成 (商用アカウント作成)のみ表示
                <>
                  <Input disabled={isLoading} required={true} register={register} errors={errors} type="text" id="address" label="住所" />



                  <div className="mb-6">
                    <div className="flex justify-start">
                      <p className="text-l font-bold text-start">
                        緯度・経度
                      </p>
                      <FaRegQuestionCircle onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} />
                    </div>

                    <div
                      className={clsx(
                        `absolute text-start bg-custom-gray border text-white text-xs rounded p-4
                        after:content-[''] after:absolute after:top-[-0.6rem] after:left-[70px] after:w-0 after:h-0 
                        after:border-l-[0.75rem] after:border-l-transparent after:border-r-[0.75rem] after:border-r-transparent after:border-b-[calc(0.75rem*0.866)] 
                        after:border-custom-gray
                        `, isHover ? "opacity-100 z-10" : " opacity-0 z-0 hidden"
                      )}
                      onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
                    >
                      <p>
                        GoogleMapを使用し、店舗の詳細から位置を表示するために緯度、経度を使用します。<br />
                        入力または位置情報から緯度、経度を取得してください。<br />
                        ※GoogleMapからの緯度経度取得方法<br />
                        <Link href="https://support.google.com/maps/answer/18539?hl=ja&co=GENIE.Platform%3DDesktop" target="_blank">
                          https://support.google.com/maps/answer/18539?hl=ja&co=GENIE.Platform%3DDesktop
                        </Link>
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-start mb-1">
                      <div className="relative w-full">
                        <div className="mb-[-1.5rem]">
                          <Input disabled={isLoading} required={true} register={register} errors={errors} type="text" id="lat" label="緯度" forNumber placeholder="緯度" />
                        </div>
                        <div className="mb-[-1.5rem]">
                          <Input disabled={isLoading} required={true} register={register} errors={errors} type="text" id="lng" label="経度" forNumber placeholder="経度" />
                        </div>
                      </div>
                      <div className="bg-custom-pastel text-white text-xs p-2 rounded hover:cursor-pointer ml-2 w-[5%]" onClick={getPresentLocation} ><FaLocationDot /></div>
                    </div>
                  </div>



                  <FileInput disabled={isLoading} required={true} register={register} errors={errors} type="file" id="image" label="プロフィール画像" watch={watch} />
                </>
              )}
            </>
          )}

          <div><Button label={variant === "REGISTER" ? "REGISTER" : "LOGIN"} disabled={isLoading} /> </div>

        </form>

        <div className=" mb-6
                        flex justify-center items-center 
                        text-xl font-bold text-custom-point"
        >
          {errorMessage && <FaExclamationTriangle />}
          <p>{errorMessage}</p>
        </div>

        {/* variant切り替え */}
        <div className="mt-20">
          <p>アカウントをお持ちですか?</p>
          <div onClick={() => changeVariant()} className="text-link">{variant === "LOGIN" ? "REGISTER" : "LOGIN"}</div>
        </div>


      </FormBase >
    </>
  )
}

export default AuthForm