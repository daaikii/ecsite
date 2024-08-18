import { getServerSession } from "next-auth"

import { authOption } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/app/lib/prismadb"
import { NextResponse } from "next/server"

export default async function getCurrentShop() {
  try {
    const session = await getServerSession(authOption)
    if (!session || !session?.user?.email) {
      return null
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
      return null
    }
    return shop
  } catch (error) {
    console.error("failed to get current shop", error)
    return null
  }
}
