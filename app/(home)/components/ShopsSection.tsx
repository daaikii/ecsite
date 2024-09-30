"use client"
import { FC } from "react"
import Link from "next/link"

import ShopCard from "@/app/components/card/ShopCard"
import { ShopDTO } from "../../../lib/types/data"

type ShopsProps = {
  shops: ShopDTO[]
}


const ShopsSection: FC<ShopsProps> = ({ shops }) => {

  return (
    <section className="
        py-8  px-[40px]
        bg-custom-gray_light
        md:px-[120px]"
    >
      <h2 className="mb-6 text-category">近くの店舗一覧</h2>
      <ul className=" flex
          max-sm:[&>li:nth-child(n+3)]:hidden  
          sm:max-md:[&>li:nth-child(n+4)]:hidden
          md:max-xl:[&>li:nth-child(n+5)]:hidden
          "
      >
        {
          shops?.map((shop, index) => {
            return index < 6 && <ShopCard key={index} shop={shop} />
          })
        }
      </ul>
      <Link className="text-link" href="/shop/list?page=1">詳しく見る</Link>
    </section>
  )
}

export default ShopsSection
