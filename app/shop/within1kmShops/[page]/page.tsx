import { FC } from "react"
import { NextResponse } from "next/server"

import getWithin1kmShops from "@/app/action/getWithin1kmShops"
import ShopList from "@/app/shop/within1kmShops/components/ShopList"
import ErrorComponent from "@/app/components/ErrorComponent"

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

  const shops = await getWithin1kmShops()
  if (shops instanceof NextResponse) {
    return <ErrorComponent message="予期せぬエラーが発生しました。" />
  }
  if (!shops?.length) {
    return <ErrorComponent message="店舗が見つかりません。" />
  }


  const shopsProps = shops.slice((page - 1) * 21, page * 21)
  return (
    <>
      <title>{`WITHIN 1KM SHOP LIST${page}`}</title>
      <div className="mt-[72px] px-[40px] md:px-[120px]">
        <h2 className="mb-8 text-category">近くの店舗一覧</h2>
        <ShopList shops={shopsProps} page={page} itemLength={shops.length} />
      </div>
    </>
  )
}

export default Page