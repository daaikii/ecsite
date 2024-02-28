import { getServerSession } from "next-auth"

import { authOption } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/app/lib/prismadb"

async function getCurrentUser() {
  try {
    const session = await getServerSession(authOption)
    if (!session?.user?.email) {
      throw new Error("failed to get session")
    }
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    })
    if (!user) {
      throw new Error("failed to get user using prisma")
    }
    return user
  } catch (error) {
    console.log(error)
    throw new Error("failed to get current user")
  }
}

export default getCurrentUser