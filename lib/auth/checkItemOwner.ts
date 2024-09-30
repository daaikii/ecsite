import prisma from "@/lib/data/prismadb"
import { getServerSession } from "next-auth"
import getSelectItem from "../data/getItem"
import { authOption } from "./authOption"

export default async function checkItemOwner(itemId: string) {
  try {
    const session = await getServerSession(authOption)
    if (!session || !session.user.shopId) {
      return session
    }
    const res = await getSelectItem(itemId)
    if (res instanceof Error) {
      return false
    }
    if (res.itemDTO.shop?.id !== session.user.shopId) {
      return false
    }
    return res.itemDTO.id
  } catch (error: any) {
    console.error("オーナー権限の確認に失敗しました", error)
    return false
  }
}