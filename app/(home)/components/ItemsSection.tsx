"use client"
import { FC } from "react"
import Link from "next/link"

import ItemCard from "@/app/components/card/ItemCard"
import { ItemDTO } from "../../../lib/types/data"

type ShopsProps = {
  items: ItemDTO[]
}


const ItemsSection: FC<ShopsProps> = ({ items }) => {

  return (
    <section className="py-8  px-[40px] md:px-[120px]">
      <h2 className="mb-6 text-category">近くの商品一覧</h2>
      <ul className="flex
          max-sm:[&>li:nth-child(n+3)]:hidden  
          sm:max-md:[&>li:nth-child(n+4)]:hidden
          md:max-xl:[&>li:nth-child(n+5)]:hidden
          "
      >
        {
          items.map((item, index) => {
            return <ItemCard key={index} item={item} />
          })
        }
      </ul>
      <Link className="text-link " href="/item/list?page=1">
        詳しく見る
      </Link>
    </section>
  )
}

export default ItemsSection
