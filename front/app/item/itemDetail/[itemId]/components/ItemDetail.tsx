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
      <div>
        <dl>
          <dt>商品名</dt>
          <dd>{item.name}</dd>
          <dt>値段</dt>
          <dd>{item.price}</dd>
          <dt>販売者の名称及び住所</dt>
          <dd>{item.shop.name}</dd>
          <dd>{item.shop.address}</dd>
          <dt>賞味期限</dt>
          <dd>{item.expirationDate}</dd>
          <dt>在庫</dt>
          <dd>{item.stock}</dd>
          <dt>詳細</dt>
          <dd>{item.detail}</dd>
        </dl>
      </div>
      <GoogleMapComponent lat={item.shop.latitude} lng={item.shop.longitude} />
    </>
  )
}

export default ItemDetail