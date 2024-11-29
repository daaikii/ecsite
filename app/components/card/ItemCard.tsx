"use client"
import { FC } from "react";
import Image from "next/image"

import { useRouter } from "next/navigation";
import { usePurposeStore, useStore } from "@/lib/context/purpose";
import { ItemDTO } from "@/lib/types/data";

type ItemCardProps = {
  item: ItemDTO
}

const ItemCard: FC<ItemCardProps> = ({ item }) => {
  const router = useRouter()
  const purpose = useStore(usePurposeStore, state => state.purpose)
  return (
    <li className=" 
      items-center text-center 
      cursor-pointer hover:outline-dotted hover:outline-1
      "
      onClick={() => router.push(`/item/detail?itemId=${item.id}&purpose=${purpose}`)}
    >
      <div className="h-32">
        <Image src={item.imageURL} alt={item.name} width={1920} height={1080}
          className="object-cover block w-full h-full"
        />
      </div>
      <p className="text-cl_sm truncate whitespace-nowrap overflow-hidden">
        {item.name}
      </p>
      <p className="text-custom-point truncate whitespace-nowrap overflow-hidden">
        ￥{item.price}
      </p>
    </li>
  )
}

export default ItemCard