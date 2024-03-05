import { getServerSession } from "next-auth"

import { authOption } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/app/lib/prismadb"

async function getCurrentUser() {
  try {
    const session = await getServerSession(authOption)
    if (!session?.user?.email) {
      return null
    }
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    })
    if (!user) {
      null
    }
    return user
  } catch {
    null
  }
}

export default getCurrentUser