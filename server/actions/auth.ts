"use server"
import bcrypt from "bcryptjs"
import z from "zod"

import prisma from "@/lib/utils/prismadb"
import uploadImageToS3 from "@/lib/services/uploadImageToS3"
import { AuthFormSchema, getSchema } from "@/lib/validation/authForm"


export async function transformZodError(error: z.ZodError) {
  return error.issues.map((issue) => {
    return ({
      path: issue.path.join("."),
      message: issue.message,
    })
  })
}





export default async function submitAuth(formData: any) {
  const isLogin = formData.get("variant") === "LOGIN"
  const isRegister = formData.get("variant") === "REGISTER"
  const isShop = formData.get("purpose") === "SHOP"
  const isUser = formData.get("purpose") === "USER"

  const lat = formData.get("lat")
  const lng = formData.get("lng")
  const latitude = lat ? parseFloat(lat as string) : undefined
  const longitude = lng ? parseFloat(lng as string) : undefined

  try {
    const validatedFields: Partial<AuthFormSchema> = getSchema(isRegister, isShop).parse({
      email: formData.get("email"),
      password: formData.get("password"),
      ...(isRegister && { name: formData.get("name") }),
      ...(isRegister && isShop && {
        address: formData.get("address"),
        image: formData.get("image"),
        lat: latitude,
        lng: longitude
      })
    })


    //アカウント作成の場合
    //emailが既に存在するか確認
    const existingAccount = await prisma.user.findUnique({ where: { email: validatedFields.email } })
      || await prisma.shop.findUnique({ where: { email: validatedFields.email } });
    if (existingAccount) {
      throw new Error("入力されたメールアドレスは既に使用されています。");
    }

    //パスワードのハッシュ化
    const hashedPassword = await bcrypt.hash(validatedFields.password!, 10)

    //USER作成の場合
    if (isUser) {
      //データ保存
      const user = await prisma.user.create({
        data: {
          email: validatedFields.email!,
          hashedPassword,
          name: validatedFields.name!,
        }
      })
      //SHOP作成の場合
    } else if (isShop) {
      //imageをdbに保存し、urlを取得
      const imageURL = await uploadImageToS3(validatedFields.image!)
      if (!imageURL) {
        throw new Error("s3へのアップロードに失敗しました。")
      }
      //データ保存
      const user = await prisma.shop.create({
        data: {
          email: validatedFields.email!,
          hashedPassword,
          name: validatedFields.name!,
          address: validatedFields.address!,
          latitude: validatedFields.lat!,
          longitude: validatedFields.lng!,
          imageURL
        }
      })
      // purposeが無い場合
    } else {
      throw new Error("invalid registration purpose specified")
    }
  } catch (error: any) {
    console.error("authentication処理中にエラーが発生しました。", error)
    throw error
  }

}