import { FC } from "react"

import getWithin10kmShops from "@/app/action/getWithin10kmShops"
import Within10kmShops from "@/app/shop/within10kmShops/components/ShopList"

type Props = {
  params: {
    page: string
  }
}

const Page: FC<Props> = async ({ params }) => {
  let page = Number(params.page)
  page = page || 1

  const shops = await getWithin10kmShops()
  if (!shops) {
    return (
      <div className="
      h-[calc(100vh-80px)]
      flex items-center justify-center
      "
      >
        <p>ショップが見つかりません</p>
      </div >
    )
  }

  const shopsProps = shops.slice((page - 1) * 21, page * 21)
  return (
    <>
      <title>{`WITHIN 10KM SHOP LIST${page}`}</title>
      <meta name="description" content="" />
      <Within10kmShops shops={shopsProps} page={page} itemLength={shops.length} />
    </>
  )
}

export default Page