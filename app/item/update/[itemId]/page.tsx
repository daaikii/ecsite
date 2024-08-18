import { FC } from "react";

import UpdateItemForm from "@/app/item/update/[itemId]/components/UpdateItemForm";
import getIdItem from "@/app/action/getSelectItem";
import getCurrentShop from "@/app/action/getCurrentShop";
import getCurrentUser from "@/app/action/getCurrentUser";
import ErrorComponent from "@/app/components/errorComponent";

type Props = {
  params: {
    id: string[]
  }
}

const Page: FC<Props> = async ({ params }) => {
  const [itemId, purpose] = params.id
  if (!itemId || !purpose) {
    return <ErrorComponent message="パラメータが正しくありません。" />
  }

  const item = await getIdItem(itemId)
  if (!item) {
    return <ErrorComponent message="商品が見つかりません。" />
  }

  let user
  if (purpose === "SHOP") {
    user = await getCurrentShop()
  } else if (purpose === "USER") {
    user = await getCurrentUser()
  } else {
    return <ErrorComponent message="不適切な値が使用されています。" />
  }
  if (!user) {
    return <ErrorComponent message="ユーザーが見つかりません。" />
  }

  return (
    <>
      <title>UPDATE ITEM FORM</title>
      <meta name="description" content="" />
      <UpdateItemForm item={item} isCurrentUser={user?.id === item.shop.id} />
    </>
  )
}

export default Page