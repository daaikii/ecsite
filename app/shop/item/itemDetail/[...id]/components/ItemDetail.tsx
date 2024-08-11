"use client"
import { FC, useState } from "react"
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Item, Shop } from "@prisma/client";
import GoogleMapComponent from "@/app/components/ui/GoogleMap";
import Button from "@/app/components/ui/Button"
import { useStore, usePurposeStore } from "@/app/lib/store/purpose";
import axios from "axios";

type ItemDetailProps = {
  item: Item & { shop: Shop },
  isCurrentUser: boolean
}

const ItemDetail: FC<ItemDetailProps> = ({ item, isCurrentUser }) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const purpose = useStore(usePurposeStore, state => state.purpose)

  const toUpdate = () => {
    setIsLoading(true)
    if (isCurrentUser) {
      router.push(`/shop/item/update/${item.id}/${purpose}`)
    }
  }

  const deleteItem = () => {
    if (isCurrentUser) {
      setIsLoading(true)
      axios
        .post("/api/delete", { id: item.id })
        .then(() => router.push("/"))
        .catch(error => console.error(error))
        .finally(() => setIsLoading(false))
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
            [&>dd]:pl-[10%]
            [&>dt]:w-[30%]
            [&>dd]:w-[70%]
            [&>dt]:font-bold
            [&>dt]:border-b
            [&>dd]:border-b
            [&>dt]:border-dashed
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
      <GoogleMapComponent lat={item.shop.latitude} lng={item.shop.longitude} />
    </>
  )
}

export default ItemDetail