import { FC } from "react"

import { Item } from "@prisma/client"
import Home from "./components/Home"
import getWithin10kmShops from "@/app/action/getWithin10kmShops"

const Page: FC = async () => {
  const shops = await getWithin10kmShops()
  let items: Item[] = []
  shops.map((shop) => {
    if (items.length < 20) {
      items = [...items, ...shop.items]
    }
  })
  return (
    <>
      <title>HOME</title>
      <meta name="description" content="" />
      <Home shops={shops} items={items} />
    </>
  )
}

export default Page
