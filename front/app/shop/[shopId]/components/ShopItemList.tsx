import ItemCard from "@/app/components/card/ItemCard";
import { Item } from "@prisma/client";
import { FC } from "react";

type ShopItemListProps = {
  items: Item[]
}

const ShopItemList: FC<ShopItemListProps> = async ({ items }) => {
  return (
    <ul>
      {items?.map((item) => {
        return (
          <ItemCard item={item} />
        )
      })}
    </ul>
  )
}

export default ShopItemList