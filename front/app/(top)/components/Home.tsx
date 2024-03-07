"use client"
import { FC } from "react"
import { useRouter } from "next/navigation"

import { ShopWithItems } from "@/app/type/prisma"
import ShopCard from "@/app/components/card/ShopCard"
import Link from "next/link"
import Image from "next/image"


type ShopsProps = {
  shops: ShopWithItems[]
}

const Home: FC<ShopsProps> = ({ shops }) => {
  const router = useRouter()
  return (
    <>
      <section>
        <h2>近くの商品一覧</h2>
        <ul>
          {shops?.map((shop) => {
            return shop.items.map((item) => {
              return (
                <li key={item.id} onClick={() => router.push(`/item/${item.id}`)}>
                  <Image src={item.imageURL} alt="Item Image" />
                </li>
              )
            })
          })}
        </ul>
        <Link href="item/within10kmItems">詳しく見る</Link>
      </section>

      <section>
        <h2>近くの店舗一覧</h2>
        <ul>
          {shops?.map((shop) => {
            return (
              <li key={shop.id} onClick={() => router.push(`/shop/${shop.id}`)}>
                <ShopCard shop={shop} />
              </li>
            )
          })}
        </ul>
        <Link href="/shop/within10kmShops">詳しく見る</Link>
      </section>
    </>
  )
}

export default Home
