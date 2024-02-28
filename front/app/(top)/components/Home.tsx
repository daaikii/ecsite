"use client"
import { FC } from "react"
import { useRouter } from "next/navigation"

import { Item, Shop } from "@prisma/client"
import ShopCard from "@/app/components/card/ShopCard"
import Link from "next/link"


type HomeProps = {
  shops: ({ items: Item[] } & Shop)[] | null
}

const Home: FC<HomeProps> = ({ shops }) => {
  console.log(shops)
  const router = useRouter()
  return (
    <>
      <section>
        <h2>近くの商品一覧</h2>
        <ul>
          {shops?.map((shop) => {
            return shop.items.map((item) => {
              return (
                <li key={item.id} onClick={() => router.push("/item/detail")}>
                  <img src={item.imageURL} alt="Item Image" />
                </li>
              )
            })
          })}
        </ul>
        <Link href="shop/item/itemList">詳しく見る</Link>
      </section>

      <section>
        <h2>近くの店舗一覧</h2>
        <ul>
          {shops?.map((shop) => {
            return (
              <li key={shop.id}>
                <ShopCard shop={shop} onClick={() => router.push("/shop/itemList")} />
              </li>
            )
          })}
        </ul>
        <Link href="/shop/shopList">詳しく見る</Link>
      </section>
    </>
  )
}

export default Home
