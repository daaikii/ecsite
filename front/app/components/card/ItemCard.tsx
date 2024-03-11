"use client"
import { FC } from "react";
import Image from "next/image"

import { Item } from "@prisma/client";
import { useRouter } from "next/navigation";

type ItemCardProps = {
  item: Item
}

const ItemCard: FC<ItemCardProps> = ({ item }) => {
  const router = useRouter()
  return (
    <li onClick={() => router.push(`/item/itemDetail/${item.id}`)} key={item.id}>
      <Image src={item.imageURL} alt={item.name} width={0} height={0} />
      <p>{item.name}</p>
      <p>{item.price}</p>
    </li>
  )
}

export default ItemCard