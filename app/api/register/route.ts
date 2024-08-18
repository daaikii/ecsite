import prisma from "@/app/lib/prismadb"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

type BODYTYPE = {
  email: string,
  password: string,
  name: string,
  address: string,
  lat: string,
  lng: string,
  imageURL: string,
  purpose: "SHOP" | "USER"
}

export async function POST(request: Request) {
  const body: BODYTYPE = await request.json()
  const { email, password, name, address, lat, lng, imageURL, purpose } = body

  if (!email || !password || !name || !address || !lat || !lng || !imageURL || !purpose) {
    return new NextResponse("Missing required fields", { status: 400 })
  }

  try {
    const existingAccount = await prisma.user.findUnique({ where: { email } })
      || await prisma.shop.findUnique({ where: { email } });

    if (existingAccount) {
      return new NextResponse("Email already in use", { status: 409 });
    }

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
    } else if (purpose === "SHOP") {
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
    } else {
      return new NextResponse("invalid purpose", { status: 400 })
    }

  } catch (error) {
    console.error("Error creating user or shop:", error);
    return new NextResponse("internal server error", { status: 500 });
  }

} 