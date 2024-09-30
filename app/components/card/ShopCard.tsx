"use client"
import { FC } from "react"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { ShopDTO } from "@/lib/types/data"

type ShopProps = {
  shop: ShopDTO
}

const ShopCard: FC<ShopProps> = ({ shop }) => {
  const router = useRouter()
  return (
    <li
      className="
        mb-8
        w-[100%]
        rounded-lg
        xl:w-[15%]
        "
    >
      <div
        onClick={() => router.push(`/item/list/selectShop?shopId=${shop.id}&page=1`)}
        className="
        mx-auto
        w-[100%]
        shadow-md 
        cursor-pointer
        xl:w-[200px]
        "
      >
        <div className="
          relative 
          h-[200px]
          w-[100%]
          xl:w-[200px] 
          rounded-t-lg 
          overflow-hidden
          "
        >
          <Image src={shop.imageURL} alt="shop icon" fill objectFit="cover" />
        </div>
        <ul className="
        list-item
        pt-5
        bg-custom-main
        text-white
        font-bold
        text-center 
        lg:max-xl:[&>li:nth-child(-n+2))]:mr-2 
        "
        >
          <li key="item0" className="mb border-b text-sm">{shop.items[0]?.name || "ー"}</li>
          <li key="item1" className="mb border-b text-sm">{shop.items[1]?.name || "ー"}</li>
          <li key="item2" className="mb text-sm">{shop.items[2]?.name || "ー"}</li>
        </ul>
      </div>
    </li>

  )
}

export default ShopCard