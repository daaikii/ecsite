import { FC } from "react"
import { NextResponse } from "next/server"

import getWithin1kmShops from "@/app/action/getWithin1kmShops"
import Within1kmShops from "@/app/shop/within1kmShops/components/ShopList"
import ErrorComponent from "@/app/components/errorComponent"

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
  if (!shops) {
    return <p>商品が見つかりません。</p>
  }


  const shopsProps = shops.slice((page - 1) * 21, page * 21)
  return (
    <>
      <title>{`WITHIN 1KM SHOP LIST${page}`}</title>
      <meta name="description" content="" />
      <Within1kmShops shops={shopsProps} page={page} itemLength={shops.length} />
    </>
  )
}

export default Page