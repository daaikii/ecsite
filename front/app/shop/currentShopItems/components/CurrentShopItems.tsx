"use client"
import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";

import ItemCard from "@/app/components/card/ItemCard";
import { Item } from "@prisma/client";
import { purpose } from "@/app/store/purpose";

type ShopItemsProps = {
  items: Item[]
}

const CurrentShopItems: FC<ShopItemsProps> = async ({ items }) => {
  const router = useRouter()

  useEffect(() => {
    if (purpose === "User") {
      router.push("/")
    }
  }, [purpose])

  return (
    <>
      <h2>出品中の商品</h2>
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

export default CurrentShopItems