import { FC } from "react";

import ItemDetail from "./components/ItemDetail"
import getIdItem from "@/app/action/getIdItem"
import getCurrentShop from "@/app/action/getCurrentShop";
import getCurrentUser from "@/app/action/getCurrentUser";
import Head from "next/head";

type Params = {
  params: {
    id: string[]
  }
}

const Page: FC<Params> = async ({ params }) => {
  const [itemId, purpose] = params.id
  const item = await getIdItem(itemId)
  let user
  if (purpose === "SHOP") {
    user = await getCurrentShop()
  }
  if (purpose === "USER") {
    user = await getCurrentUser()
  }

  if (!item) {
    return <p>商品が見つかりません</p>
  }
  return (
    <>
      <Head>
        <title>ITEM DETAIL</title>
        <meta name="description" content="" />
      </Head>
      <ItemDetail item={item} isCurrentUser={item.shop.id === user?.id} />
    </>
  )
}

export default Page