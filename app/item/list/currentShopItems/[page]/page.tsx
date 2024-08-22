import { FC } from "react";

import ItemList from "@/app/item/list/ItemList";
import getCurrentShop from "@/app/action/getCurrentShop";
import ErrorComponent from "@/app/components/ErrorComponent";

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
  if (!currentShop?.items.length) {
    return <ErrorComponent message="商品が見つかりません。" />
  }
  const items = currentShop.items.slice(page - 1, page * 30)

  return (
    <>
      <title>{`CURRENT SHOP ITEM LIST ${page}`}</title>
      <div className="mt-[72px] px-[40px] md:px-[120px]">
        <h2 className="mb-8 text-category">出品商品一覧</h2>
        <ItemList items={items} page={page} itemLength={currentShop.items.length} />
      </div>
    </>
  )
}

export default Page