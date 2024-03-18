import { FC } from "react";

import getShopItems from "@/app/action/getShopItems";
import ItemList from "@/app/shop/item/itemList/components/ItemList"


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

  const shopItems = await getShopItems(id)
  if (!shopItems) {
    return (
      <div className="
      h-[calc(100vh-80px)]
      flex items-center justify-center
      "
      >
        <p>ショップに商品が見つかりません</p>
      </div >
    )
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