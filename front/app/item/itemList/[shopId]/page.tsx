import { FC } from "react";

import getShopItems from "@/app/action/getShopItems";
import ShopItems from "./components/ShopItems"

type Params = {
  params: {
    shopId: string
  }
}

const Page: FC<Params> = async ({ params }) => {
  const id = params.shopId
  if (typeof id !== "string") {
    return null
  }
  const shopItems = await getShopItems(id)
  if (!shopItems) {
    return <p>ショップに商品がありません</p>
  }
  return (
    <ShopItems items={shopItems} />
  )
}

export default Page