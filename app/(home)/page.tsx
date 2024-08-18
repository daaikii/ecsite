import { FC } from "react"
import { NextResponse } from "next/server"

import { Item } from "@prisma/client"
import Home from "./components/Home"
import getWithin1kmShops from "@/app/action/getWithin1kmShops"
import ErrorComponent from "../components/errorComponent"

const Page: FC = async () => {
  const shops = await getWithin1kmShops()
  if (shops instanceof NextResponse) {
    return <ErrorComponent message="予期せぬエラーが発生しました。" />
  }
  if (!shops) {
    return <p>商品が見つかりません。</p>
  }

  let items: Item[] = []
  shops.map((shop) => {
    if (items.length < 20) {
      items = [...items, ...shop.items]
    }
  })
  if (!items) {
    return <ErrorComponent message="アイテムが見つかりません。" />
  }

  return (
    <>
      <title>HOME</title>
      <meta name="description" content="" />
      <Home shops={shops} items={items} />
    </>
  )
}

export default Page
