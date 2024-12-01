"use client"
import { FC } from "react"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { ShopDTO } from "@/lib/types/data"
import { String } from "aws-sdk/clients/acm"

type ShopProps = {
  shop: ShopDTO
}

const ShopCard: FC<ShopProps> = ({ shop }) => {
  const router = useRouter()
  return (

    <li
      onClick={() => router.push(`/item/list/selectShop?shopId=${shop.id}&page=1`)}
      className="
          grid grid-rows-[200px,50px,30px,30px,30px]
          shadow-md cursor-pointer
        "
    >
      <div>
        <Image src={decodeURIComponent(shop.imageURL)} alt="shop image" width={1920} height={1080} className="object-cover block w-full h-full" />
      </div>

      <Item text={shop.name || "ー"} />
      <Item text={shop.items[0]?.name || "ー"} />
      <Item text={shop.items[1]?.name || "ー"} />
      <Item text={shop.items[2]?.name || "ー"} />

    </li>

  )
}

export default ShopCard

function Item({ text }: { text: String }) {
  return (
    <p className={`
        bg-custom-main border-b
        text-cl_sm text-white text-center content-center 
        truncate whitespace-nowrap overflow-hidden
      `}
    >
      {text}
    </p>
  )
}