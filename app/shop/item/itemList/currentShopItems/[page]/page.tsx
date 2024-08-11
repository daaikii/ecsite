import { FC } from "react";

import ItemList from "@/app/shop/item/itemList/components/ItemList";
import getCurrentShop from "@/app/action/getCurrentShop";

type Props = {
  params: {
    page: string
  }
}

const Page: FC<Props> = async ({ params }) => {
  let page = Number(params.page)
  page = page || 1

  const currentShop = await getCurrentShop()
  if (!currentShop?.items) {
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

  const items = currentShop.items.slice(page - 1, page * 30)
  return (
    <>
      <title>{`CURRENT SHOP ITEM LIST ${page}`}</title>
      <meta name="description" content="" />
      <ItemList items={items} page={page} itemLength={currentShop.items.length} />
    </>
  )
}

export default Page