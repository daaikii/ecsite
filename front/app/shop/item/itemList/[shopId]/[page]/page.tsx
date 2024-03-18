import { FC } from "react";

import getShopItems from "@/app/action/getShopItems";
import ItemList from "@/app/shop/item/itemList/components/ItemList"

import { shop } from "@/app/mock"

type Params = {
  params: {
    shopId: string
    page: string
  }
}

const Page: FC<Params> = async ({ params }) => {
  const id = params.shopId
  let page = Number(params.page)
  page = page || 1

  // const shopItems = await getShopItems(id)
  // if (!shopItems) {
  //   return <p>ショップに商品がありません</p>
  // }
  // const items = shopItems.slice(page - 1, page * 30)
  const items = shop.items.slice(page - 1, page * 30)
  return (
    // <ItemList items={shopItems} />
    <ItemList items={items} page={page} itemLength={shop.items.length} />
  )
}

export default Page