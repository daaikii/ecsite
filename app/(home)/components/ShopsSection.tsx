"use client"
import { FC } from "react"

import ShopCard from "@/app/components/card/ShopCard"
import { ShopDTO } from "../../../lib/types/data"
import { CustomLink } from "@/app/components/ui/CustomLink"

type ShopsProps = {
  shops: ShopDTO[]
}


const ShopsSection: FC<ShopsProps> = ({ shops }) => {

  return (
    <section className="
        py-8  px-12
        bg-custom-gray_light
      "
    >
      <h2 className="mb-6 text-cl_lg font-bold">近くの店舗一覧</h2>
      <ul className="mb-6 grid grid-cols-[repeat(auto-fill,minmax(min(200px,100%),1fr))] gap-10
          max-sm:[&>li:nth-child(n+2)]:hidden  
          sm:max-md:[&>li:nth-child(n+3)]:hidden
          md:max-lg:[&>li:nth-child(n+4)]:hidden
          lg:max-xl:[&>li:nth-child(n+5)]:hidden
          xl:[&>li:nth-child(n+6)]:hidden
          "
      >
        {
          shops?.map((shop, index) => {
            // return index < 5 && <ShopCard key={index} shop={shop} />
            return <ShopCard key={index} shop={shop} />
          })
        }
      </ul>
      <CustomLink
        text="詳しく見る"
        href="/shop/list?page=1"
      />
    </section>
  )
}

export default ShopsSection
