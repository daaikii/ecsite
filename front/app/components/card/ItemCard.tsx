"use client"
import { FC } from "react";
import Image from "next/image"

import { Item } from "@prisma/client";
import { useRouter } from "next/navigation";
import { usePurposeStore, useStore } from "@/app/lib/store/purpose";

type ItemCardProps = {
  item: Item
}

const ItemCard: FC<ItemCardProps> = ({ item }) => {
  const router = useRouter()
  const purpose = useStore(usePurposeStore, state => state.purpose)
  return (
    <li
      className="
        mb-8
        w-[100%]
        xl:w-[10%]
      "
      key={item.id}
    >
      <div
        className="
        flex
        items-center
        xl:list-item
        mx-auto
        w-[100%]
        xl:w-[120px]
        cursor-pointer
        text-center
        hover:outline-dotted
        hover:outline-1
      "
        onClick={() => router.push(`/shop/item/itemDetail/${item.id}/${purpose}`)}
      >
        <div
          className="
          relative 
          h-[120px] 
          w-[60%]
          xl:w-[120px]
          "
        >
          <Image src={item.imageURL} alt={item.name} fill objectFit="cover" />
        </div>
        <div className="text-center w-[40%] xl:w-[120px]">
          <p className="text-sm font-bold">{item.name}</p>
          <p className="font-bold text-custom-point">￥{item.price}</p>
        </div>
      </div>
    </li>
  )
}

export default ItemCard