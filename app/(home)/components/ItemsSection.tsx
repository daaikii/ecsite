"use client"
import { FC } from "react"

import ItemCard from "@/app/components/card/ItemCard"
import { ItemDTO } from "../../../lib/types/data"
import { CustomLink } from "@/app/components/ui/CustomLink"

type ShopsProps = {
  items: ItemDTO[]
}


const ItemsSection: FC<ShopsProps> = ({ items }) => {

  return (
    <section className="py-8 px-12">
      <h2 className="mb-6 text-cl_lg font-bold">近くの商品一覧</h2>
      <ul className="mb-6 grid grid-cols-[repeat(auto-fill,minmax(min(100px,100%),1fr))] gap-2
          max-sm:[&>li:nth-child(n+2)]:hidden  
          sm:max-md:[&>li:nth-child(n+3)]:hidden
          md:max-xl:[&>li:nth-child(n+4)]:hidden
          xl:[&>li:nth-child(n+10)]:hidden
          "
      >
        {
          items.map((item, index) => {
            return <ItemCard key={index} item={item} />
          })
        }
      </ul>
      <CustomLink
        text="詳しく見る"
        href="/item/list?page=1"
      />
    </section>
  )
}

export default ItemsSection
