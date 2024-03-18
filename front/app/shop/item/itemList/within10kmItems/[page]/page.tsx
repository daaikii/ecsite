import { FC } from "react"

import getWithin10kmShops from "@/app/action/getWithin10kmShops"
import ItemList from "@/app/shop/item/itemList/components/ItemList"
import { Item } from "@prisma/client"

import { shops } from "@/app/mock"

type Props = {
  params: {
    page: string
  }
}

const Page: FC<Props> = ({ params }) => {
  let page = Number(params.page)
  page = page || 1

  // const shops = await getWithin10kmShops()
  // if (!shops) {
  //   return <p>ショップが見つかりません</p>
  // }

  let items: Item[] = []
  shops.map((shop) => items = [...items, ...shop.items])
  const itemsProps = items.slice((page - 1) * 30, page * 30)

  return (
    <ItemList items={itemsProps} page={page} itemLength={items.length} />
  )
}

export default Page