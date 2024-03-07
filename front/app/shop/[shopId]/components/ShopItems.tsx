"use client"
import ItemCard from "@/app/components/card/ItemCard";
import { Item } from "@prisma/client";
import { FC } from "react";

type ShopItemsProps = {
  items: Item[]
}

const ShopItems: FC<ShopItemsProps> = async ({ items }) => {
  return (
    <>
      <h2>商品一覧</h2>
      <ul>
        {items?.map((item) => {
          return (
            <li>
              <ItemCard item={item} />
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ShopItems