import prisma from "@/app/lib/prismadb"
import { NextResponse } from "next/server"

export default async function getSelectItem(id: string) {
  if (!id) {
    return null
  }
  try {
    const item = await prisma.item.findUnique({
      where: {
        id
      },
      include: {
        shop: true
      }
    })
    if (!item) {
      return null
    }
    return item
  } catch (error) {
    console.error("failed to get item width id", error)
    return null
  }
}