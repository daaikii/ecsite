import { FC } from "react"
import { NextResponse } from "next/server"

import { Item } from "@prisma/client"
import Home from "./components/Home"
import getWithin1kmShops from "@/app/action/getWithin1kmShops"
import ErrorComponent from "../components/ErrorComponent"

const Page: FC = async () => {
  const shops = await getWithin1kmShops()
  if (shops instanceof NextResponse) {
    return <ErrorComponent message="予期せぬエラーが発生しました。" />
  }
  if (!shops) {
    return <ErrorComponent message="近くにショップが見つかりません" />
  }

  let items: Item[] = []
  shops.map((shop) => {
    if (items.length < 10) {
      items = [...items, ...shop.items]
    }
  })
  if (!items.length) {
    return <ErrorComponent message="アイテムが見つかりません。" />
  }

  return (
    <>
      <title>HOME</title>
      <Home shops={shops} items={items} />
    </>
  )
}

export default Page
