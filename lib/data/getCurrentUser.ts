import { getServerSession } from "next-auth"

import { authOption } from "@/lib/auth/authOption"
import prisma from "@/lib/utils/prismadb"
import { UserDTO } from "../types/data"

export default async function getCurrentUser() {
  try {
    const session = await getServerSession(authOption)
    if (!session || !session?.user?.email) {
      return new Error("セッションの確認に失敗しました")
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    })
    if (!user) {
      return new Error("ユーザーが見つかりません")
    }
    const userDTO: UserDTO = {
      name: user?.name,
      id: user?.id
    }
    return userDTO
  } catch (error) {
    console.error("ユーザーの認証に失敗しました", error)
    return new Error("ユーザーの認証に失敗しました")
  }
}
