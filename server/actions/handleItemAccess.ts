"use server"

import checkItemOwner from "@/lib/auth/checkItemOwner"
import { ItemDTO } from "@/lib/types/data"

export default async function handleItemAccess({ item, purpose }: { item: ItemDTO, purpose: string }) {
  if (!item || !purpose) {
    console.error("パラメータが正しくありません")
    return { isOwner: false, message: "パラメータが正しくありません" }
  }
  if (purpose === "USER") {
    return { isOwner: false, message: "ユーザーにはオーナー権限がありません" }
  }
  const isOwner = await checkItemOwner(item.id)
  if (!isOwner) {
    return { isOwner: false, message: "オーナー権限がありません" }
  }
  if (isOwner) {
    return { isOwner: true, redirectUrl: `/item/update?itemId=${item.id}&purpose=${purpose}` }
  }
  return { isOwner: false, message: "オーナー権限がありません" }
}