import { FC } from "react"

import getShops from "@/lib/data/getShopsWithItems"
import ItemList from "@/app/components/ItemList"
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

  const res = await getShops()
  if (res instanceof Error) {
    return <ErrorPage message={res.message} />
  }
  if (!res.itemsDTO.length) {
    return <ErrorPage message="商品が見つかりません。" />
  }

  const itemsProps = res.itemsDTO.slice((page - 1) * 30, page * 30)


  return (
    <>
      <title>{`WITHIN 1KM ITEM LIST ${page}`}</title>
      <div className="pt-[72px] px-[40px] md:px-[120px]">
        <h2 className="mb-8 text-cl_lg font-bold">近くの商品一覧</h2>
        <ItemList items={itemsProps} itemLength={res.itemsDTO.length} />
      </div>
    </>
  )
}

export default Page