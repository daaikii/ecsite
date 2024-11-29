"use server"

import { ItemDTO } from "@/lib/types/data"
import checkItemOwner from "@/lib/auth/checkItemOwner"
import deleteImageS3 from "@/lib/services/deleteImageS3"
import prisma from "@/lib/utils/prismadb"

export default async function deleteItem(item: ItemDTO) {
  try {
    const ownerItemId = await checkItemOwner(item.id)
    if (!ownerItemId) {
      return new Error("ユーザーにはオーナー権限がありません")
    }
    //s3の画像削除
    await deleteImageS3(item)
    await prisma.item.delete({
      where: {
        id: ownerItemId
      }
    })
  } catch (error) {
    console.error("アイテムの削除に失敗しました", error)
    return new Error("アイテムの削除に失敗しました")
  }
}