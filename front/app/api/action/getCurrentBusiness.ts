import { getServerSession } from "next-auth"

import { authOption } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/app/lib/db"

const getCurrentBusiness = async () => {
  try {
    const session = await getServerSession(authOption)
    if (!session?.user?.email) {
      throw new Error("failed to get current session")
    }
    const business = await prisma.business.findUnique({
      where: {
        email: session.user.email
      }
    })
    if (!business) {
      throw new Error("failed to get business using prisma ")
    }
    return business
  } catch (error) {
    console.log(error)
    throw new Error("failed to get business")
  }
}

export default getCurrentBusiness