import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { id } = await request.json()
  if (!id) {
    return new NextResponse("Missing params id", { status: 400 })
  }
  try {
    const ret = await prisma.item.delete({
      where: {
        id: id
      }
    })
    return NextResponse.json(ret)
  } catch (error) {
    console.error("failed to delete item")
    return new NextResponse("internal server error", { status: 500 })
  }
}
