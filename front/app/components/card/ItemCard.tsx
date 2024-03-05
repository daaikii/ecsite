import { FC } from "react";
import Image from "next/image"

import { Item } from "@prisma/client";

type ItemCardProps = {
  item: Item
}

const ItemCard: FC<ItemCardProps> = ({ item }) => {
  return (
    <>
      <Image src={item.imageURL} alt={item.name} />
      <p>{item.name}</p>
      <p>{item.price}</p>
    </>
  )
}

export default ItemCard