"use client"
import { useEffect, FC } from "react"
import { useRouter } from "next/navigation"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn, useSession } from "next-auth/react";

import Input from "@/app/components/ui/input/Input"
import FileInput from "@/app/components/ui/input/FileInput"
import Button from "@/app/components/ui/Button"
import FormBase from "@/app/components/base/FormBase"
import ErrorMessage from "@/app/components/ui/ErrorMessage"
import LocationForm from "./LocationForm"
import PurposeToggle from "./PurposeToggle"
import VariantToggle from "./VariantToggle"

import { usePurposeStore } from "@/lib/context/purpose"
import { useVariant } from "@/lib/hooks/useVariant"
import { usePurpose } from "@/lib/hooks/usePurpose"

import useErrorMessage from "@/lib/hooks/useErrorMessage"
import submitAuth from "@/server/actions/auth"
import { getSchema, AuthFormSchema } from "@/lib/validation/authForm"
import useLoading from "@/lib/hooks/useLoading"





const AuthForm: FC = () => {
  //lib
  const router = useRouter()
  const session = useSession()
  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/")
    }
  }, [session])
  //context
  const setGlobalPurpose = usePurposeStore((state) => state.setGlobalPurpose)
  // custom hooks
  const { errorMessage, setErrorMessage } = useErrorMessage()
  const { purpose, changePurpose, isUser, isShop } = usePurpose()
  const { variant, changeVariant, isLogin, isRegister } = useVariant()
  const { isLoading, startLoading, stopLoading } = useLoading()


  async function login(data: any) {
    const callback = await signIn("credentials", { email: data.email, password: data.password, purpose: purpose, redirect: false })
    if (callback?.error) {
      throw new Error("Failed to login")
    }
  }


  // form settings
  const form = useForm<AuthFormSchema>({
    resolver: zodResolver(getSchema(isRegister, isShop)),
  });
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = form
  // isRegister, isShopの変更を監視してフォームのバリデーションを更新
  useEffect(() => {
    reset({}, { keepValues: true });
  }, [isRegister, isShop, reset]);
  //  Fileに変換し手動で値をセット
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setValue("image", file);
  }




  //submit
  const authFormSubmit: SubmitHandler<AuthFormSchema> = async (data) => {
    startLoading()
    setErrorMessage("")

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("purpose", purpose || "");
    formData.append("variant", variant || "");
    if (isRegister) formData.append("name", data.name || "");
    if (isRegister && isShop) {
      formData.append("address", data.address || "");
      formData.append("image", data.image!); // ファイルを追加
      formData.append("lat", String(data.lat!)); // 数値を文字列に変換
      formData.append("lng", String(data.lng!)); // 数値を文字列に変換
    }

    if (isLogin) {        //ログインの場合
      try {
        await login(data)
      } catch (error) {
        setErrorMessage("Login failed")
      }
    }
    if (isRegister) {
      try {
        await submitAuth(formData)  //server action
        await login(data)
      } catch (error) {
        console.error("An unexpected error occurred:", error)
        setErrorMessage("予期しないエラーが発生しました。しばらくしてから再度お試しください。")
      }
    }
    setGlobalPurpose(purpose)
    reset()
    await router.push("/")
    stopLoading()
  }


  return (
    <FormBase>
      <h2 className="mb-6 text-4xl font-bold">{variant}</h2>
      {/* purposeの切り替え */}
      <PurposeToggle changePurpose={changePurpose} isUser={isUser} isShop={isShop} />
      {/* auth form */}
      <form onSubmit={handleSubmit(authFormSubmit)}>
        {/* ログイン・アカウント作成どちらも表示 */}
        <Input<AuthFormSchema> disabled={isLoading} register={register} errors={errors} type="text" id="email" label="Email" />
        <Input<AuthFormSchema> disabled={isLoading} register={register} errors={errors} type="password" id="password" label="パスワード" />
        {/* //アカウント作成のみ表示 */}
        {isRegister && <Input disabled={isLoading} register={register} errors={errors} type="text" id="name" label="名前または会社名" />}
        {/* アカウント作成 (商用アカウント作成)のみ表示 */}
        {isRegister && isShop && (
          <>
            <Input<AuthFormSchema> disabled={isLoading} register={register} errors={errors} type="text" id="address" label="住所" />
            <LocationForm isLoading={isLoading} register={register} setValue={setValue} errors={errors} />
            <FileInput onChange={handleFileChange} disabled={isLoading} errors={errors} type="file" id="image" label="プロフィール画像" watch={watch} />
          </>
        )}
        <Button label={variant} disabled={isLoading} />
      </form>
      {/* エラーメッセージを表示 */}
      <ErrorMessage message={errorMessage} />
      {/* variantの切り替え */}
      <VariantToggle variant={variant} changeVariant={changeVariant} />
    </FormBase >
  )
}

export default AuthForm