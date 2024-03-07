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
import { purpose } from "@/app/store/purpose";

const ItemPostForm: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { register, control, handleSubmit, formState: { errors } } = useForm()
  const router = useRouter()

  useEffect(() => {
    if (purpose === "User") {
      router.push("/")
    }
  }, [purpose])


  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    setIsLoading(true)
    //画像を保存しURLを返却、そのURLと入力からitemを作成
    const imageURL = await uploadImageToS3(data)
    if (!imageURL) {
      return null
    }
    data = { ...data, imageURL }
    axios
      .post("/api/createItem", data)
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
        <Input disabled={isLoading} required register={register} errors={errors} type="file" id="image" label="Image" control={control} />
        <Button label="出品" disabled={isLoading} />
      </form>
    </FormBase>
  )
}

export default ItemPostForm