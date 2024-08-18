"use client"
import { FC, useState, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

import Input from "@/app/components/ui/Input"
import FileInput from "@/app/components/ui/FileInput"
import Textarea from "@/app/components/ui/Textarea"
import Button from "@/app/components/ui/Button"
import FormBase from "@/app/components/base/FormBase";
import uploadImageToS3 from "@/app/lib/s3"
import { usePurposeStore, useStore } from "@/app/lib/store/purpose";
import { Item } from "@prisma/client";

type Props = {
  item: Item,
  isCurrentUser: boolean
}

const UpdateItemForm: FC<Props> = ({ item, isCurrentUser }) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm()
  const router = useRouter()

  const purpose = useStore(usePurposeStore, state => state.purpose)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<null | string>(null)

  useEffect(() => {
    if (purpose === "USER" && isCurrentUser) {
      router.push("/")
    }
    setValue("name", item.name)
    setValue("price", item.price)
    setValue("expiration", item.expirationDate)
    setValue("stock", item.stock)
    setValue("detail", item.detail)
  }, [purpose])


  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    setIsLoading(true)
    try {
      //画像を保存しURLを返却、そのURLと入力からitemを作成
      const imageURL = await uploadImageToS3(data, item.imageURL)
      if (!imageURL) {
        throw new Error("failed to upload image")
      }
      data = { ...data, id: item.id, imageURL }
      axios.post("/api/updateItem", data)
      router.push("/")
      reset()
    } catch (error) {
      console.error("Failed to update item", error)
      setErrorMessage("アイテムの更新に失敗しました。再試行してください。")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FormBase>
      <p>{errorMessage}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* priceとstockには数字限定のforNumber、imageには入力の変化を監視するcontrolを渡している。 */}
        <Input disabled={isLoading} required register={register} errors={errors} type="text" id="name" label="名前" />
        <Input disabled={isLoading} required register={register} errors={errors} type="text" id="price" label="値段" forNumber />
        <Input disabled={isLoading} required register={register} errors={errors} type="text" id="expiration" label="有効期限" />
        <Input disabled={isLoading} required register={register} errors={errors} type="text" id="stock" label="在庫" forNumber />
        <Textarea disabled={isLoading} required register={register} errors={errors} id="detail" label="詳細" />
        <FileInput disabled={isLoading} required register={register} errors={errors} type="file" id="image" label="画像" watch={watch} />
        <Button label="出品" disabled={isLoading} />
      </form>
    </FormBase>
  )
}

export default UpdateItemForm