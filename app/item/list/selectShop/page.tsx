import { FC } from "react";

import getShop from "@/lib/data/getShopWithItems";
import ItemList from "@/app/components/ItemList"
import ErrorMessage from "@/app/components/ui/ErrorMessage";


type pageProps = {
  searchParams: {
    [key: string]: string
  }
}

const Page: FC<pageProps> = async ({ searchParams }) => {
  const id = searchParams.shopId
  const page = Number(searchParams.page)
  if (!id || !page) {
    return <ErrorMessage message="パラメータが正しくありません。" />
  }

  const res = await getShop(id)
  if (res instanceof Error) {
    return <ErrorMessage message={res.message} />
  }

  const items = res.itemsDTO.slice((page - 1) * 30, page * 30)

  return (
    <>
      <title>{`SHOP ITEM LIST ${page}`}</title>
      <div className="mt-[72px] px-[40px] md:px-[120px]">
        <h2 className="mb-8 text-category">{res.shop.name}の商品一覧</h2>
        <ItemList items={items} page={page} itemLength={res.itemsDTO.length} />
      </div>
    </>
  )
}

export default Page