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
  console.log(
    process.env.AWS_ACCESS_KEY_ID,
    process.env.AWS_SECRET_ACCESS_KEY,
    process.env.AWS_REGION,
    process.env.AWS_S3BUCKET_NAME,
    process.env.NEXT_PUBLIC_GOOGLE_MAP_MAPID,
    process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    process.env.NEXTAUTH_SECRET,

    process.env.DATABASE_URL,
    process.env.DIRECT_URL

  )
  return (
    <>
      <ul className="mb-6 grid grid-cols-[repeat(auto-fill,minmax(min(100px,100%),1fr))] gap-4">
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