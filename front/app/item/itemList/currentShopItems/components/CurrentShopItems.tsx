"use client"
import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";

import ItemCard from "@/app/components/card/ItemCard";
import { Item } from "@prisma/client";
import { useStore } from "@/app/lib/store/purpose";

type ShopItemsProps = {
  items: Item[]
}

const CurrentShopItems: FC<ShopItemsProps> = async ({ items }) => {
  const router = useRouter()
  const purpose = useStore((state) => state.purpose)
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
            <ItemCard item={item} />
          )
        })}
      </ul>
    </>
  )
}

export default CurrentShopItems