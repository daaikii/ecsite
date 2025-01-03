"use client"
import { FC, useState, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Input from "@/app/components/ui/input/Input"
import FileInput from "@/app/components/ui/input/FileInput"
import Textarea from "@/app/components/ui/input/Textarea"
import Button from "@/app/components/ui/Button"
import FormBase from "@/app/components/base/FormBase";
import { usePurposeStore, useStore } from "@/lib/context/purpose";
import useLoading from "@/lib/hooks/useLoading";
import useErrorMessage from "@/lib/hooks/useErrorMessage";
import { ItemFormSchema, createSchema } from "@/lib/validation/itemForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { create } from "@/server/actions/item/create";
import ErrorMessage from "@/app/components/ui/ErrorMessage";



const ItemPostForm: FC = () => {
  //context
  const purpose = useStore(usePurposeStore, state => state.purpose)
  //lib
  const router = useRouter()
  // custom hooks
  const { isLoading, startLoading, stopLoading } = useLoading()
  const { errorMessage, setErrorMessage } = useErrorMessage()
  //Userの場合、ルートに返す
  useEffect(() => {
    if (purpose === "USER") {
      router.push("/")
    }
  }, [purpose])


  // form settings
  const form = useForm<ItemFormSchema>({
    resolver: zodResolver(createSchema)
  })
  const { register, handleSubmit, formState: { errors }, watch, reset, setValue } = form
  useEffect(() => {
    reset({}, { keepValues: true });
  }, [reset])


  //imageを直接変更
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setValue("image", file);
  }

  const onSubmit: SubmitHandler<ItemFormSchema> = async (data: FieldValues) => {
    startLoading()
    setErrorMessage("")
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("price", String(data.price))
    formData.append("expirationDate", data.expirationDate)
    formData.append("stock", String(data.stock))
    formData.append("detail", data.detail || "")
    formData.append("image", data.image)

    try {
      await create(formData)
      // router.push("/")
      // reset()
    } catch (error) {
      console.error("Failed to create item", error)
      setErrorMessage("予期しないエラーが発生しました。しばらくしてから再度お試しください。")
    } finally {
      stopLoading()
    }
  }

  return (
    <FormBase>
      {/* priceとstockには数字限定のforNumber*/}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input disabled={isLoading} register={register} errors={errors} type="text" id="name" label="名前" placeholder="幕ノ内" />
        <Input disabled={isLoading} register={register} errors={errors} type="number" id="price" label="値段" step="any" forNumber placeholder="400" />
        <Input disabled={isLoading} register={register} errors={errors} type="text" id="expirationDate" label="有効期限" placeholder="20xx/xx月/xx日/xx時xx分" />
        <Input disabled={isLoading} register={register} errors={errors} type="number" id="stock" label="在庫" step="any" forNumber placeholder="1" />
        <Textarea disabled={isLoading} register={register} errors={errors} id="detail" label="詳細"
          placeholder="
            セット内容例:ご飯（白米または五穀米）焼き魚（鯖の塩焼きや鮭）鶏の唐揚げ 玉子焼き 季節の煮物（大根、里芋、人参）ひじき煮 漬物（梅干し、きゅうりの漬物）お浸し（ほうれん草や小松菜）
            価格:500円（税込）～
          "
        />
        <FileInput onChange={handleFileChange} disabled={isLoading} errors={errors} type="file" id="image" label="画像" watch={watch} />
        <Button label="出品" disabled={isLoading} />
      </form>
      <ErrorMessage message={errorMessage} />
    </FormBase>
  )
}

export default ItemPostForm