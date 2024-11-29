import { getServerSession } from "next-auth"

import { authOption } from "@/lib/auth/authOption"
import prisma from "@/lib/utils/prismadb"
import { ItemDTO, ShopDTO } from "../types/data"

export default async function getCurrentShop() {
  try {
    const session = await getServerSession(authOption)
    if (!session || !session?.user?.email) {
      return new Error("セッションの確認に失敗しました")
    }
    const shop = await prisma.shop.findUnique({
      where: {
        email: session.user.email
      },
      include: {
        items: true
      }
    })
    if (!shop) {
      return new Error("ショップが見つかりません")
    }
    const itemsDTO: ItemDTO[] = shop.items.map((item) => {
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        stock: item.stock,
        expirationDate: item.expirationDate,
        detail: item.detail,
        imageURL: item.imageURL
      }
    })
    const shopDTO: ShopDTO = {
      id: shop.id,
      name: shop.name,
      address: shop.address,
      latitude: shop.latitude,
      longitude: shop.longitude,
      imageURL: shop.imageURL,
      items: itemsDTO
    }
    return shopDTO
  } catch (error) {
    console.error("ショップの認証に失敗しました", error)
    return new Error("ショップの認証に失敗しました")
  }
}
