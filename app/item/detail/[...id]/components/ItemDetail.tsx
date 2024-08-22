"use client"
import { FC, useState } from "react"
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { FaExclamationTriangle } from "react-icons/fa";

import { Item, Shop } from "@prisma/client";
import GoogleMapComponent from "@/app/components/ui/GoogleMap";
import Button from "@/app/components/ui/Button"
import { useStore, usePurposeStore } from "@/app/lib/store/purpose";

type ItemDetailProps = {
  item: Item & { shop: Shop },
  isCurrentUser: boolean
}

const ItemDetail: FC<ItemDetailProps> = ({ item, isCurrentUser }) => {
  const router = useRouter()
  const purpose = useStore(usePurposeStore, state => state.purpose)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<null | string>(null)

  const toUpdate = () => {
    setIsLoading(true)
    if (isCurrentUser) {
      router.push(`/item/update/${item.id}/${purpose}`)
    }
  }

  const deleteItem = async () => {
    setIsLoading(true)
    setErrorMessage("")
    if (isCurrentUser) {
      try {
        await axios.post("/api/item/delete", item)
        router.push("/")
      }
      catch (error) {
        console.error("failed to delete item", error)
        setErrorMessage("予期しないエラーが発生しました。しばらくしてから再度お試しください。")
      }
      finally { setIsLoading(false) }
    }
  }

  return (
    <>
      <div className="relative w-full h-[300px]">
        <Image src={item.imageURL} alt={item.name} fill objectFit="cover" />
      </div>

      <div className="px-[20px] py-[40px] md:px-[200px] xl:px-[400px]">
        <dl
          className="
            flex flex-wrap

            [&>dt]:w-[30%]
            [&>dt]:font-bold
            [&>dt]:border-b
            [&>dt]:border-dashed

            [&>dd]:pl-[10%]
            [&>dd]:w-[70%]
            [&>dd]:border-b
            [&>dd]:border-dashed
          "
        >
          <dt>商品名</dt>
          <dd>{item.name}</dd>
          <dt>値段</dt>
          <dd>{item.price}</dd>
          <dt>販売者の名称及び住所</dt>
          <dd>
            <span >{item.shop.name}</span>
            <span >{item.shop.address}</span>
          </dd>
          <dt>賞味期限</dt>
          <dd>{item.expirationDate}</dd>
          <dt>在庫</dt>
          <dd>{item.stock}</dd>
          <dt>詳細</dt>
          <dd>{item.detail}</dd>
        </dl>
      </div >
      {purpose === "SHOP" && isCurrentUser &&
        <div className="w-[300px] mx-auto flex gap-2">
          <Button label="編集" disabled={isLoading} onClick={toUpdate} />
          <Button label="削除" disabled={isLoading} onClick={deleteItem} />
        </div>
      }
      <div className="mb-6
                      flex justify-center items-center 
                      text-xl font-bold text-custom-point"
      >
        {errorMessage && <FaExclamationTriangle />}
        <p>{errorMessage}</p>
      </div>

      <GoogleMapComponent lat={item.shop.latitude} lng={item.shop.longitude} />
    </>
  )
}

export default ItemDetail