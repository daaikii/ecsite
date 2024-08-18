import { FC } from "react"
import { NextResponse } from "next/server"

import getWithin1kmShops from "@/app/action/getWithin1kmShops"
import ItemList from "@/app/item/itemList/ItemList"
import { Item } from "@prisma/client"
import ErrorComponent from "@/app/components/ErrorComponent"


type Props = {
  params: {
    page: string
  }
}

const Page: FC<Props> = async ({ params }) => {
  let page = Number(params.page)
  if (!page) {
    return <ErrorComponent message="パラメータが正しくありません。" />
  }

  const shops = await getWithin1kmShops()
  if (shops instanceof NextResponse) {
    return <ErrorComponent message="予期せぬエラーが発生しました。" />
  }
  if (!shops) {
    return <p>商品が見つかりません。</p>
  }

  let items: Item[] = []
  shops.map((shop) => items = [...items, ...shop.items])
  const itemsProps = items.slice((page - 1) * 30, page * 30)
  if (!items) {
    return <ErrorComponent message="アイテムが見つかりません。" />
  }

  return (
    <>
      <title>{`WITHIN 1KM ITEM LIST ${page}`}</title>
      <meta name="description" content="" />
      <ItemList items={itemsProps} page={page} itemLength={items.length} />
    </>
  )
}

export default Page