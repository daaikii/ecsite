"use client"
import { FC } from "react"

import ShopCard from "@/app/components/card/ShopCard"
import Pagination from "@/app/components/ui/Pagination"
import { ShopDTO } from "@/lib/types/data"

type ShopsProps = {
  shops: ShopDTO[],
  itemLength: number
}

const ShopList: FC<ShopsProps> = ({ shops, itemLength }) => {
  return (
    <>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(200px,100%),1fr))] gap-10">
        {
          shops.map((shop, index) => {
            return (
              <ShopCard key={index} shop={shop} />
            )
          })
        }
      </ul>
      <Pagination limit={21} itemLength={itemLength} />
    </>
  )
}

export default ShopList