import bcrypt from "bcrypt"
import prisma from "@/app/lib/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password, name, address, image, purpose } = body
  const hashedPassword = await bcrypt.hash(password, 10)
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
    if (address && image) {
      const business = await prisma.business.create({
        data: {
          email,
          hashedPassword,
          name,
          address,
          image
        }
      })
      return NextResponse.json(business)
    }
  }
} 