import bcrypt from "bcrypt"
import prisma from "@/app/lib/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password, name, address, imageURL, purpose } = body
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    // purposeから作成するアカウントを決める
    if (purpose === "User") {
      const user = await prisma.user.create({
        data: {
          email,
          hashedPassword,
          name,
        }
      })
      return NextResponse.json(user)
    }
    if (purpose === "Business") {
      const business = await prisma.business.create({
        data: {
          email,
          hashedPassword,
          name,
          address,
          imageURL
        }
      })
      return NextResponse.json(business)
    }
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
} 