import bcrypt from "bcrypt"
import prisma from "@/app/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password, name, address, lat, lng, imageURL, purpose } = body
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    // purposeから作成するアカウントを決める
    if (purpose === "USER") {
      const user = await prisma.user.create({
        data: {
          email,
          hashedPassword,
          name,
        }
      })
      return NextResponse.json(user)
    }
    if (purpose === "SHOP") {
      const shop = await prisma.shop.create({
        data: {
          email,
          hashedPassword,
          name,
          address,
          latitude: Number(lat),
          longitude: Number(lng),
          imageURL
        }
      })
      return NextResponse.json(shop)
    }
  } catch (error) {
    return new NextResponse(`${error}`, { status: 500 });
  }
} 