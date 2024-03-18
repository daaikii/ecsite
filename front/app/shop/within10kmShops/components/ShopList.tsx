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
  const path = usePathname()
  return (
    <div className="mt-[72px] px-[40px] md:px-[120px]">
      <h2 className="mb-8 text-category">店舗一覧</h2>
      <ul className="flex flex-wrap">
        {
          shops.map((shop) => {
            return (
              <ShopCard shop={shop} />
            )
          })
        }
      </ul>
      <Pagination currentPage={page} limit={21} itemLength={itemLength} path={path} />
    </div>
  )
}

export default ShopList