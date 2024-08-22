import { FC } from "react"
import { NextResponse } from "next/server"

import getWithin1kmShops from "@/app/action/getWithin1kmShops"
import ItemList from "@/app/item/list/ItemList"
import { Item } from "@prisma/client"
import ErrorComponent from "@/app/components/ErrorComponent"
import { usePathname } from "next/navigation"


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
  if (!items.length) {
    return <ErrorComponent message="商品が見つかりません。" />
  }

  const path = usePathname

  return (
    <>
      <title>{`WITHIN 1KM ITEM LIST ${page}`}</title>
      <div className="mt-[72px] px-[40px] md:px-[120px]">
        <h2 className="mb-8 text-category">近くの商品一覧</h2>
        <ItemList items={itemsProps} page={page} itemLength={items.length} />
      </div>
    </>
  )
}

export default Page