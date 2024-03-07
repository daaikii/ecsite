import { getServerSession } from "next-auth"

import { authOption } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/app/lib/prismadb"

async function getCurrentShop() {
  try {
    const session = await getServerSession(authOption)
    if (!session?.user?.email) {
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
  } catch {
    return null
  }
}

export default getCurrentShop