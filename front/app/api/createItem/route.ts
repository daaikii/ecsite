import prisma from "@/app/lib/db"

import getCurrentBusiness from "../action/getCurrentBusiness"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const business = await getCurrentBusiness()
    if (!business) {
      throw new Error("business is not in database")
    }
    const body = await request.json()
    const { name, price, expiration, stock, detail, imageURL } = body
    const item = await prisma.item.create({
      data: {
        name,
        price,
        expirationDate: expiration,
        stock,
        detail,
        imageURL,
        business: {
          connect: business
        }
      }
    })
    return NextResponse.json(item)
  }
  catch (error) {
    return new NextResponse(error as string, { status: 500 });
  }
}