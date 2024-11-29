import { FC } from "react";

import getShop from "@/lib/data/getShopWithItems";
import ItemList from "@/app/components/ItemList"
import ErrorPage from "@/app/components/ErrorPage";


type pageProps = {
  searchParams: {
    [key: string]: string
  }
}

const Page: FC<pageProps> = async ({ searchParams }) => {
  const id = searchParams.shopId
  const page = Number(searchParams.page)
  if (!id || !page) {
    return <ErrorPage message="パラメータが正しくありません。" />
  }

  const res = await getShop(id)
  if (res instanceof Error) {
    return <ErrorPage message={res.message} />
  }

  const items = res.itemsDTO.slice((page - 1) * 30, page * 30)

  if (!res.itemsDTO.length) {
    return <ErrorPage message="商品が存在しません" />
  }

  return (
    <>
      <title>{`SHOP ITEM LIST ${page}`}</title>
      <div className="pt-[72px] px-[40px] md:px-[120px]">
        <h2 className="mb-8 text-cl_lg font-bold">{res.shop.name}の商品一覧</h2>
        <ItemList items={items} itemLength={res.itemsDTO.length} />
      </div>
    </>
  )
}

export default Page