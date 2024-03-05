import getShopItems from "@/app/action/getShopItems";
import { useParams } from "next/navigation";
import { FC } from "react";
import ShopItemList from "./components/ShopItemList";

const Page: FC = async () => {
  const params = useParams()
  const id = params.id
  if (typeof id !== "string") {
    return null
  }
  const shopItems = await getShopItems(id)
  if (!shopItems) {
    return <p>ショップに商品がありません</p>
  }
  return (
    <ShopItemList items={shopItems} />
  )
}

export default Page