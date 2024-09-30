"use server"

import { createSchema } from "@/lib/validation/itemForm"
import prisma from "@/lib/data/prismadb"
import getCurrentShop from "@/lib/data/getCurrentShop"
import uploadImageToS3 from "@/lib/services/uploadImageToS3"

export async function create(data: any) {
  const price = Number(data.get("price"))
  const stock = Number(data.get("stock"))
  try {
    const validatedFields = createSchema.parse({
      name: data.get("name"),
      price: price,
      expirationDate: data.get("expirationDate"),
      stock: stock,
      detail: data.get("detail"),
      image: data.get("image")
    })


    const imageURL = await uploadImageToS3(validatedFields.image)
    const res = await getCurrentShop()
    if (res instanceof Error) {
      return new Error("アカウントの認証に失敗しました。")
    }
    await prisma.item.create({
      data: {
        name: validatedFields.name,
        price: validatedFields.price,
        expirationDate: validatedFields.expirationDate,
        stock: validatedFields.stock,
        detail: validatedFields.detail,
        imageURL: imageURL,
        shop: {
          connect: {
            id: res.id
          }
        }
      }
    })
  } catch (error: any) {
    console.error("商品の削除に失敗しました", error.message)
    return new Error("商品の削除に失敗しました")
  }
}