import { FC } from "react"

import ShopCard from "@/app/components/card/ShopCard"
import { ShopWithItems } from "@/app/type/prisma"
import { useRouter } from "next/navigation"

type ShopsProps = {
  shops: ShopWithItems[]
}

const Within10kmShops: FC<ShopsProps> = ({ shops }) => {
  const router = useRouter()
  return (
    <>
      <h2>近くの店舗</h2>
      <ul>
        {shops.map((shop) => {
          return (
            <li key={shop.id} onClick={() => { router.push(`/shop/${shop.id}`) }}>
              <ShopCard shop={shop} />
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Within10kmShops