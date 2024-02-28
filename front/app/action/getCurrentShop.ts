import { getServerSession } from "next-auth"

import { authOption } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/app/lib/prismadb"

async function getCurrentShop() {
  try {
    const session = await getServerSession(authOption)
    if (!session?.user?.email) {
      throw new Error("failed to get current session")
    }
    const shop = await prisma.shop.findUnique({
      where: {
        email: session.user.email
      }
    })
    if (!shop) {
      throw new Error("failed to get shop using prisma ")
    }
    return shop
  } catch (error) {
    console.log(error)
    throw new Error("failed to get shop")
  }
}

export default getCurrentShop