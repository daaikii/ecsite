"use client"
import { FC, useState, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

import Input from "@/app/components/ui/Input"
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
  const [isLoading, setIsLoading] = useState(false)
  const { register, control, handleSubmit, formState: { errors }, setValue, getValues } = useForm()
  const router = useRouter()
  const purpose = useStore(usePurposeStore, state => state.purpose)

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
    //画像を保存しURLを返却、そのURLと入力からitemを作成
    let imageURL
    const imageValue = getValues("image")
    if (imageValue.length) {
      imageURL = await uploadImageToS3(data, item.imageURL)
    } else {
      imageURL = item.imageURL
    }
    if (!imageURL) {
      return null
    }
    data = { ...data, id: item.id, imageURL }
    axios
      .post("/api/updateItem", data)
      .then(() => {
        router.push("/")
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false))
  }

  return (
    <FormBase>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* priceとstockには数字限定のforNumber、imageには入力の変化を監視するcontrolを渡している。 */}
        <Input disabled={isLoading} required register={register} errors={errors} type="text" id="name" label="Name" />
        <Input disabled={isLoading} required register={register} errors={errors} type="text" id="price" label="Price" forNumber />
        <Input disabled={isLoading} required register={register} errors={errors} type="text" id="expiration" label="Expiration" />
        <Input disabled={isLoading} required register={register} errors={errors} type="text" id="stock" label="Stock" forNumber />
        <Textarea disabled={isLoading} required register={register} errors={errors} id="detail" label="Detail" />
        <Input disabled={isLoading} required={false} register={register} errors={errors} type="file" id="image" label="Image" control={control} />
        <Button label="出品" disabled={isLoading} />
      </form>
    </FormBase>
  )
}

export default UpdateItemForm