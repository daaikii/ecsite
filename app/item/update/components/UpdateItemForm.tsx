"use client"
import { FC, useState, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaExclamationTriangle } from "react-icons/fa";

import Input from "@/app/components/ui/input/Input"
import FileInput from "@/app/components/ui/input/FileInput"
import Textarea from "@/app/components/ui/input/Textarea"
import Button from "@/app/components/ui/Button"
import FormBase from "@/app/components/base/FormBase";
import { usePurposeStore, useStore } from "@/lib/context/purpose";
import { ItemDTO } from "@/lib/types/data";
import ErrorMessage from "@/app/components/ui/ErrorMessage";
import useLoading from "@/lib/hooks/useLoading";
import useErrorMessage from "@/lib/hooks/useErrorMessage";
import { updateSchema, ItemFormSchema } from "@/lib/validation/itemForm";
import { zodResolver } from "@hookform/resolvers/zod";
import update from "@/server/actions/item/update";



type Props = {
  item: ItemDTO,
  isCurrentUser: boolean
}



const UpdateItemForm: FC<Props> = ({ item, isCurrentUser }) => {
  //lib
  const router = useRouter()

  //context
  const purpose = useStore(usePurposeStore, state => state.purpose)

  // custom hooks
  const { isLoading, startLoading, stopLoading } = useLoading()
  const { errorMessage, setErrorMessage } = useErrorMessage()

  // form settings
  const form = useForm<ItemFormSchema>({
    resolver: zodResolver(updateSchema)
  })
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = form
  useEffect(() => {
    reset({}, { keepValues: true })
  }, [reset])

  //setValues
  useEffect(() => {
    if (purpose === "USER" && isCurrentUser) {
      router.push("/")
    }
    setValue("name", item.name)
    setValue("price", Number(item.price))
    setValue("expirationDate", item.expirationDate)
    setValue("stock", Number(item.stock))
    setValue("detail", item.detail || "")
  }, [item, purpose])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setValue("image", file)
  }


  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    startLoading()
    setErrorMessage("")
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("price", String(data.price))
    formData.append("expirationDate", data.expirationDate)
    formData.append("stock", String(data.stock))
    formData.append("detail", data.detail)
    //商品の検索、画像の更新に使用
    formData.append("itemId", item.id)
    if (data.image) {
      formData.append("image", data.image)
      formData.append("imageURL", item.imageURL)
    }

    try {
      await update(formData)
      await router.push("/")
      reset()
    } catch (error) {
      console.error("Failed to update item", error)
      setErrorMessage("予期しないエラーが発生しました。しばらくしてから再度お試しください。")
    } finally {
      stopLoading()
    }
  }

  return (
    <FormBase>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input disabled={isLoading} register={register} errors={errors} type="text" id="name" label="名前" />
        <Input disabled={isLoading} register={register} errors={errors} type="number" id="price" label="値段" step="any" forNumber />
        <Input disabled={isLoading} register={register} errors={errors} type="text" id="expirationDate" label="有効期限" />
        <Input disabled={isLoading} register={register} errors={errors} type="number" id="stock" label="在庫" step="any" forNumber />
        <Textarea disabled={isLoading} register={register} errors={errors} id="detail" label="詳細" />
        <FileInput onChange={handleFileChange} disabled={isLoading} errors={errors} type="file" id="image" label="画像" watch={watch} />
        <Button label="変更" disabled={isLoading} />
      </form>
      <ErrorMessage message={errorMessage} />
    </FormBase>
  )
}

export default UpdateItemForm