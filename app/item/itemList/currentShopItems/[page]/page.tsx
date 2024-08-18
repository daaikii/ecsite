import { FC } from "react";

import ItemList from "@/app/item/itemList/ItemList";
import getCurrentShop from "@/app/action/getCurrentShop";
import ErrorComponent from "@/app/components/errorComponent";

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

  const currentShop = await getCurrentShop()
  if (!currentShop) {
    return <ErrorComponent message="ユーザーが見つかりません。" />
  }
  if (!currentShop?.items) {
    return <ErrorComponent message="商品が見つかりません。" />
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