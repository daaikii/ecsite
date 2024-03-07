import { FC } from "react";

import CurrentShopItems from "./components/CurrentShopItems";
import getCurrentShop from "@/app/action/getCurrentShop";

const Page: FC = async () => {
  const currentShop = await getCurrentShop()
  if (!currentShop?.items) {
    return <p>商品はありません</p>
  }
  return (
    <CurrentShopItems items={currentShop.items} />
  )
}

export default Page