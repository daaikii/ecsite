import { FC } from "react";

import ItemList from "@/app/shop/item/itemList/components/ItemList";
import getCurrentShop from "@/app/action/getCurrentShop";

import { shop } from "@/app/mock";
import Head from "next/head";

type Props = {
  params: {
    page: string
  }
}

const Page: FC<Props> = async ({ params }) => {
  let page = Number(params.page)
  page = page || 1

  // const currentShop = await getCurrentShop()
  // if (!currentShop?.items) {
  //   return <p>商品はありません</p>
  // }

  // const items = currentShop.items.slice(page - 1, page * 30)
  const items = shop.items.slice(page - 1, page * 30)
  return (
    <>
      <Head>
        <title>{`CURRENT SHOP ITEM LIST ${page}`}</title>
        <meta name="description" content="" />
      </Head>
      <ItemList items={items} page={page} itemLength={shop.items.length} />
    </>
  )
}

export default Page