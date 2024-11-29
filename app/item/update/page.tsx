import { FC } from "react";
import { getServerSession } from "next-auth";

import UpdateItemForm from "@/app/item/update/components/UpdateItemForm";
import getIdItem from "@/lib/data/getItem";
import ErrorPage from "@/app/components/ErrorPage";
import { authOption } from "@/lib/auth/authOption";

type pageProps = {
  searchParams: {
    [key: string]: string
  }
}

const Page: FC<pageProps> = async ({ searchParams }) => {
  const { itemId, purpose } = searchParams
  if (!itemId || !purpose) {
    return <ErrorPage message="パラメータが正しくありません" />
  }

  const itemRes = await getIdItem(itemId)
  if (itemRes instanceof Error) {
    return <ErrorPage message={itemRes.message} />
  }

  const session = await getServerSession(authOption)
  if (!session || !session.user.shopId) {
    return <ErrorPage message="セッション情報が間違っています" />
  }

  return (
    <>
      <title>UPDATE ITEM FORM</title>
      <UpdateItemForm item={itemRes.itemDTO} isCurrentUser={itemRes.itemDTO.shop?.id === session.user.shopId} />
    </>
  )
}

export default Page