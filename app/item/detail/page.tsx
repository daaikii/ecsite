import { FC } from "react";
import { getServerSession } from "next-auth";

import getItem from "@/lib/data/getItem"
import ErrorMessage from "@/app/components/ui/ErrorMessage";
import ItemDetail from "./components/ItemDetail"
import { authOption } from "@/lib/auth/authOption";

type pageProps = {
  searchParams: { [key: string]: string }
}


const Page: FC<pageProps> = async ({ searchParams }) => {
  const { itemId, purpose } = searchParams
  if (!itemId || !purpose) {
    return <ErrorMessage message="パラメータが正しくありません。" />
  }

  const session = await getServerSession(authOption)
  if (!session || !session.user) {
    return <ErrorMessage message="セッション情報が間違っています" />
  }

  const itemRes = await getItem(itemId)
  if (itemRes instanceof Error) {
    return <ErrorMessage message={itemRes.message} />
  }


  return (
    <>
      <title>ITEM DETAIL</title>
      {itemRes &&
        < ItemDetail item={itemRes.itemDTO} isCurrentUser={itemRes.itemDTO.shop?.id === session.user.shopId} />
      }
    </>
  )
}

export default Page