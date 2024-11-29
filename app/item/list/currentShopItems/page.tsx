import { FC } from "react";

import ItemList from "@/app/components/ItemList";
import getCurrentShop from "@/lib/data/getCurrentShop";
import ErrorPage from "@/app/components/ErrorPage"

type pageProps = {
  searchParams: {
    [key: string]: string
  }
}

const Page: FC<pageProps> = async ({ searchParams }) => {
  const page = Number(searchParams.page)
  if (!page) {
    return <ErrorPage message="パラメータが正しくありません。" />
  }

  const currentShop = await getCurrentShop()
  if (currentShop instanceof Error) {
    return <ErrorPage message={currentShop.message} />
  }
  if (!currentShop) {
    return <ErrorPage message="ユーザーが見つかりません。" />
  }
  if (!currentShop?.items.length) {
    return <ErrorPage message="商品が見つかりません。" />
  }
  const items = currentShop.items.slice((page - 1) * 30, page * 30)

  return (
    <>
      <title>{`CURRENT SHOP ITEM LIST ${page}`}</title>
      <div className="pt-[72px] px-[40px] md:px-[120px]">
        <h2 className="mb-8 text-cl_lg font-bold">出品商品一覧</h2>
        <ItemList items={items} itemLength={currentShop.items.length} />
      </div>
    </>
  )
}

export default Page