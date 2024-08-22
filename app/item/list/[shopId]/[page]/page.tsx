import { FC } from "react";

import getShopContents from "@/app/action/getShopContents";
import ItemList from "@/app/item/list/ItemList"
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

  const shop = await getShopContents(id)
  if (shop instanceof NextResponse) {
    return <ErrorComponent message={`${shop.status}:${shop.statusText}`} />
  }
  if (!shop) {
    return <ErrorComponent message="店舗が見つかりません。" />
  }
  const items = shop.items
  if (!items.length) {
    return <ErrorComponent message="商品が見つかりません。" />
  }

  const narrowItems = items.slice(page - 1, page * 30)
  return (
    <>
      <title>{`SHOP ITEM LIST ${page}`}</title>
      <div className="mt-[72px] px-[40px] md:px-[120px]">
        <h2 className="mb-8 text-category">{shop.name}の商品一覧</h2>
        <ItemList items={narrowItems} page={page} itemLength={items.length} />
      </div>
    </>
  )
}

export default Page