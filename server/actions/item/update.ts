"use server"

import { updateSchema } from "@/lib/validation/itemForm";
import prisma from "@/lib/data/prismadb"
import checkItemOwner from "@/lib/auth/checkItemOwner";
import uploadImageToS3 from "@/lib/services/uploadImageToS3";

export default async function update(data: FormData) {
  const price = Number(data.get("price"));
  const stock = Number(data.get("stock"));
  try {
    const validatedFields = updateSchema.parse({
      name: data.get("name"),
      price: price,
      expirationDate: data.get("expirationDate"),
      stock: stock,
      detail: data.get("detail"),
      itemId: data.get("itemId"),
      ...(data.get("image") && {
        image: data.get("image"),
        imageURL: data.get("imageURL"),
      })
    })
    const ownerItemId = await checkItemOwner(validatedFields.itemId!)
    if (!ownerItemId) {
      return new Error("オーナー権限がありません")
    }
    let imageURL = ""
    if (validatedFields.image && validatedFields.imageURL) {
      imageURL = await uploadImageToS3(validatedFields.image, validatedFields.imageURL)
    }
    await prisma.item.update({
      where: {
        id: ownerItemId
      },
      data: {
        name: validatedFields.name,
        price: validatedFields.price,
        expirationDate: validatedFields.expirationDate,
        stock: validatedFields.stock,
        detail: validatedFields.detail,
        ...(imageURL && { imageURL: imageURL })
      }
    })
  } catch (error: any) {
    console.error("商品情報の更新に失敗しました", error.message)
    return new Error("商品情報の更新に失敗しました")
  }
}