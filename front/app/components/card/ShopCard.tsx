import { FC } from "react"

import Image from "next/image"
import { ShopWithItems } from "@/app/type/prisma"

type ShopProps = {
  shop: ShopWithItems
}

const ShopCard: FC<ShopProps> = ({ shop }) => {
  return (
    <>
      <Image src={shop.imageURL} alt="shop icon"
        width={0}
        height={0}
        style={{ width: "200px", height: "200px" }}
      />
      <ul>
        <li key="item0">{shop.items[0]?.name}</li>
        <li key="item1">{shop.items[1]?.name}</li>
        <li key="item2">{shop.items[2]?.name}</li>
      </ul>
    </>
  )
}

export default ShopCard