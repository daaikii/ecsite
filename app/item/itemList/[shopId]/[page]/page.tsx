import { FC } from "react";

import getShopItems from "@/app/action/getShopItems";
import ItemList from "@/app/item/itemList/ItemList"
import ErrorComponent from "@/app/components/ErrorComponent";
import { NextResponse } from "next/server";


type Params = {
  params: {
    shopId: string
    page: string
  }
}

const Page: FC<Params> = async ({ params }) => {
  const id = params.shopId
  let page = Number(params.page)
  if (!id || !page) {
    return <ErrorComponent message="パラメータが正しくありません。" />
  }

  const shopItems = await getShopItems(id)
  if (shopItems instanceof NextResponse) {
    return <ErrorComponent message={`${shopItems.status}:${shopItems.statusText}`} />
  }
  if (!shopItems) {
    return <p>商品が見つかりません。</p>
  }

  const items = shopItems.slice(page - 1, page * 30)
  return (
    <>
      <title>{`SHOP ITEM LIST$ {page}`}</title>
      <meta name="description" content="" />
      <ItemList items={items} page={page} itemLength={shopItems.length} />
    </>
  )
}

export default Page