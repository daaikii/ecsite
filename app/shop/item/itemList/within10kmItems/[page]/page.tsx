import { FC } from "react"

import getWithin10kmShops from "@/app/action/getWithin10kmShops"
import ItemList from "@/app/shop/item/itemList/components/ItemList"
import { Item } from "@prisma/client"


type Props = {
  params: {
    page: string
  }
}

const Page: FC<Props> = async ({ params }) => {
  let page = Number(params.page)
  page = page || 1

  const shops = await getWithin10kmShops()
  if (!shops) {
    return (
      <div className="
      h-[calc(100vh-80px)]
      flex items-center justify-center
      "
      >
        <p>アイテムが見つかりません</p>
      </div >
    )
  }

  let items: Item[] = []
  shops.map((shop) => items = [...items, ...shop.items])
  const itemsProps = items.slice((page - 1) * 30, page * 30)

  return (
    <>
      <title>{`WITHIN 10KM ITEM LIST ${page}`}</title>
      <meta name="description" content="" />
      <ItemList items={itemsProps} page={page} itemLength={items.length} />
    </>
  )
}

export default Page