"use client"
import { FC } from "react"

import ItemCard from "@/app/components/card/ItemCard"
import Pagination from "@/app/components/ui/Pagination"
import { ItemDTO } from "@/lib/types/data"

type ItemsProps = {
  items: ItemDTO[],
  itemLength: number
}

const ItemList: FC<ItemsProps> = ({ items, itemLength }) => {
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
      <Pagination limit={30} itemLength={itemLength} />
    </>
  )
}

export default ItemList