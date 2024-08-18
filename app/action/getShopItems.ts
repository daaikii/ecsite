import prisma from "@/app/lib/prismadb"
import { NextResponse } from "next/server"

export default async function getShopItems(id: string) {
  if (!id) {
    return new NextResponse("Missing params id", { status: 400 })
  }
  try {
    const shop = await prisma.shop.findUnique({
      where: {
        id: id
      },
      include: {
        items: true
      }
    })
    if (!shop || !shop.items) {
      return null
    }
    return shop.items
  } catch (error) {
    console.error("failed get shop items", error)
    return new NextResponse("internal server error")
  }
}
