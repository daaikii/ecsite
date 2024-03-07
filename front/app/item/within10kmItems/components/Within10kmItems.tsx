"use client"
import { FC } from "react"

import { ShopWithItems } from "@/app/type/prisma"
import ItemCard from "@/app/components/card/ItemCard"

type ShopsProps = {
  shops: ShopWithItems[]
}

const Within10kmItems: FC<ShopsProps> = ({ shops }) => {
  return (
    <>
      <h2>近くの商品</h2>
      <ul>
        {shops.map((shop) => {
          return shop.items.map((item) => {
            return (
              <li key={item.id}>
                <ItemCard item={item} />
              </li>
            )
          })
        })}
      </ul>
    </>
  )
}

export default Within10kmItems