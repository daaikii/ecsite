import prisma from "@/lib/data/prismadb"
import { ItemDTO } from "../types/data"

export default async function getShopContents(id: string) {
  if (!id) {
    return new Error("ショップIDがありません")
  }
  try {
    const shop = await prisma.shop.findUnique({ where: { id: id }, include: { items: true } })
    if (!shop) {
      return new Error("ショップが見つかりません")
    }
    const itemsDTO: ItemDTO[] = shop.items.map((item) => {
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        expirationDate: item.expirationDate,
        stock: item.stock,
        detail: item.detail,
        imageURL: item.imageURL,
      }
    })
    return { shop, itemsDTO }
  } catch (error) {
    console.error("shop get failed", error)
    return new Error("ショップ情報の取得に失敗しました")
  }
}
