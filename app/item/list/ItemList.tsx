"use client"
import { FC } from "react"
import { usePathname } from "next/navigation"

import ItemCard from "@/app/components/card/ItemCard"
import Pagination from "@/app/components/ui/Pagination"
import { Item } from "@prisma/client"

type ItemsProps = {
  items: Item[],
  page: number
  itemLength: number
}

const ItemList: FC<ItemsProps> = ({ items, page, itemLength }) => {
  const currentPath = usePathname()
  const path = currentPath.slice(0, currentPath.length - 1)
  return (
    <>
      <ul className="flex flex-wrap">
        {
          items.map((item, index) => {
            return (
              <ItemCard key={index} item={item} />
            )
          })
        }
      </ul>
      <Pagination currentPage={page} limit={30} itemLength={itemLength} path={path} />
    </>
  )
}

export default ItemList