import { FC } from "react"

import getShops from "@/lib/data/getShopsWithItems"
import ItemList from "@/app/components/ItemList"
import ErrorMessage from "@/app/components/ui/ErrorMessage"
import { usePathname } from "next/navigation"
import { ItemDTO } from "@/lib/types/data"


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

  const res = await getShops()
  if (res instanceof Error) {
    return <ErrorMessage message={res.message} />
  }
  if (!res.itemsDTO.length) {
    return <ErrorMessage message="商品が見つかりません。" />
  }

  const itemsProps = res.itemsDTO.slice((page - 1) * 30, page * 30)

  const path = usePathname

  return (
    <>
      <title>{`WITHIN 1KM ITEM LIST ${page}`}</title>
      <div className="mt-[72px] px-[40px] md:px-[120px]">
        <h2 className="mb-8 text-category">近くの商品一覧</h2>
        <ItemList items={itemsProps} itemLength={res.itemsDTO.length} />
      </div>
    </>
  )
}

export default Page