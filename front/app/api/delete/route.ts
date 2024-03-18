import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { id } = await request.json()
  try {
    const ret = await prisma.item.delete({
      where: {
        id: id
      }
    })
    return NextResponse.json(ret)
  } catch (error) {
    console.log(error)
    return new NextResponse("Error", { status: 500 })
  }
}
