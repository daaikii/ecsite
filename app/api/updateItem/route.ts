import prisma from "@/app/lib/prismadb"

import getCurrentShop from "@/app/action/getCurrentShop"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const shop = await getCurrentShop()
    if (!shop) {
      throw new Error("shop is not in database")
    }
    const body = await request.json()
    const { id, name, price, expiration, stock, detail, imageURL } = body
    const item = await prisma.item.update({
      where: {
        id: id
      },
      data: {
        name,
        price,
        expirationDate: expiration,
        stock,
        detail,
        imageURL,
        shop: {
          connect: {
            id: shop.id
          }
        }
      }
    })
    return NextResponse.json(item)
  }
  catch (error) {
    return new NextResponse(error as string, { status: 500 });
  }
}