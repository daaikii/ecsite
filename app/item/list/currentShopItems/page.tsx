import { FC } from "react";

import ItemList from "@/app/components/ItemList";
import getCurrentShop from "@/lib/data/getCurrentShop";
import ErrorMessage from "@/app/components/ui/ErrorMessage";

type pageProps = {
  searchParams: {
    [key: string]: string
  }
}

const Page: FC<pageProps> = async ({ searchParams }) => {
  const page = Number(searchParams.page)
  if (!page) {
    return <ErrorMessage message="パラメータが正しくありません。" />
  }

  const currentShop = await getCurrentShop()
  if (currentShop instanceof Error) {
    return <ErrorMessage message={currentShop.message} />
  }
  if (!currentShop) {
    return <ErrorMessage message="ユーザーが見つかりません。" />
  }
  if (!currentShop?.items.length) {
    return <ErrorMessage message="商品が見つかりません。" />
  }
  const items = currentShop.items.slice((page - 1) * 30, page * 30)

  return (
    <>
      <title>{`CURRENT SHOP ITEM LIST ${page}`}</title>
      <div className="mt-[72px] px-[40px] md:px-[120px]">
        <h2 className="mb-8 text-category">出品商品一覧</h2>
        <ItemList items={items} itemLength={currentShop.items.length} />
      </div>
    </>
  )
}

export default Page