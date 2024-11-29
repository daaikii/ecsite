import { FC } from "react"
import { NextResponse } from "next/server"

import getShopsWithItems from "@/lib/data/getShopsWithItems"
import ShopList from "@/app/components/ShopList"
import ErrorPage from "@/app/components/ErrorPage"

type Props = {
  searchParams: {
    [key: string]: string
  }
}

const Page: FC<Props> = async ({ searchParams }) => {
  let page = Number(searchParams.page)
  if (!page) {
    return <ErrorPage message="パラメータが正しくありません。" />
  }

  const res = await getShopsWithItems()
  if (res instanceof Error) {
    return <ErrorPage message="予期せぬエラーが発生しました。" />
  }

  const shopsProps = res.shopsDTO.slice((page - 1) * 21, page * 21)
  return (
    <>
      <title>{`WITHIN 1KM SHOP LIST${page}`}</title>
      <div className="mt-[72px] px-[40px] md:px-[120px]">
        <h2 className="mb-8 text-cl_lg font-bold">近くの店舗一覧</h2>
        <ShopList shops={shopsProps} itemLength={res.shopsDTO.length} />
      </div>
    </>
  )
}

export default Page