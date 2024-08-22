"use client"
import { FC } from "react"
import { usePathname } from "next/navigation"

import { ShopWithItems } from "@/app/types/prisma"
import ShopCard from "@/app/components/card/ShopCard"
import Pagination from "@/app/components/ui/Pagination"

type ShopsProps = {
  shops: ShopWithItems[],
  page: number
  itemLength: number
}

const ShopList: FC<ShopsProps> = ({ shops, page, itemLength }) => {
  const currentPath = usePathname()
  const path = currentPath.slice(0, currentPath.length - 1)
  return (
    <>
      <ul className="flex flex-wrap">
        {
          shops.map((shop, index) => {
            return (
              <ShopCard key={index} shop={shop} />
            )
          })
        }
      </ul>
      <Pagination currentPage={page} limit={21} itemLength={itemLength} path={path} />
    </>
  )
}

export default ShopList