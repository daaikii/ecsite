import prisma from "@/lib/utils/prismadb"
import { ItemDTO } from "../types/data"

export default async function getSelectItem(id: string) {
  if (!id) throw new Error("商品IDが見つかりません")
  try {
    const item = await prisma.item.findUnique({ where: { id }, include: { shop: true } })
    if (!item) {
      throw new Error("商品が見つかりません")
    }
    const itemDTO: ItemDTO = {
      id: item.id,
      name: item.name,
      price: item.price,
      expirationDate: item.expirationDate,
      stock: item.stock,
      detail: item.detail,
      imageURL: item.imageURL,
      shop: {
        id: item.shop.id,
        latitude: item.shop.latitude,
        longitude: item.shop.longitude,
        name: item.shop.name,
        address: item.shop.address
      }
    }
    if (!item.shop) {
      throw new Error("商品情報の取得に失敗しました")
    }
    return { itemDTO }
  } catch (error) {
    console.error("商品情報の取得に失敗しました", error)
    return Error("商品情報の取得に失敗しました")
  }
}