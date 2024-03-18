"use client"
import GoogleMapComponent from "@/app/components/ui/GoogleMap";
import { Item, Shop } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";

type ItemDetailProps = {
  item: Item & { shop: Shop }
}

const ItemDetail: FC<ItemDetailProps> = ({ item }) => {
  return (
    <>
      <div className="relative w-full h-[300px]">
        <Image src={item.imageURL} alt={item.name} fill objectFit="cover" />
      </div>
      <div className="px-[40px] py-[72px] mg:px-[600px]">
        <dl
          className="
            flex flex-wrap
            [&>dt]:w-[30%]
            [&>dd]:w-[60%]
            [&>dt]:font-bold
            [&>dt]:pl-2
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
      <GoogleMapComponent lat={item.shop.latitude} lng={item.shop.longitude} />
    </>
  )
}

export default ItemDetail