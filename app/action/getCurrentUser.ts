import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

import { authOption } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/app/lib/prismadb"

export default async function getCurrentUser() {
  try {
    const session = await getServerSession(authOption)
    if (!session || !session?.user?.email) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    })
    if (!user) {
      return null
    }
    return user
  } catch (error) {
    console.error("failed to get current user", error)
    return null
  }
}
