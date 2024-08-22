import prisma from "@/app/lib/prismadb"

import getCurrentShop from "@/app/action/getCurrentShop"
import { NextResponse } from "next/server"

export async function POST(request: Request) {

  const body = await request.json()
  const { id, name, price, expiration, stock, detail, imageURL } = body
  if (!id || !name || !price || !expiration || !stock || !detail || !imageURL) {
    return new NextResponse("Missing required fields", { status: 400 })
  }

  try {
    const shop = await getCurrentShop()
    if (!shop) {
      return new NextResponse("shop is not in database", { status: 404 })
    }

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

  } catch (error) {
    console.error("failed to update item", error)
    return new NextResponse("internal server error", { status: 500 });
  }
}