import { FC } from "react";

import ItemDetail from "./components/ItemDetail"
import getIdItem from "@/app/action/getIdItem"

type Params = {
  params: {
    itemId: string
  }
}

const Page: FC<Params> = async ({ params }) => {
  const id = params.itemId
  if (typeof id !== "string") {
    return <p>パラメータが正しくありません</p>
  }
  const item = await getIdItem(id)
  if (!item) {
    return <p>商品が見つかりません</p>
  }
  return (
    <ItemDetail item={item} />
  )
}

export default Page