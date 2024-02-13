import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"

import prisma from "@/app/lib/db"

const authOption = {
  providers: [
    CredentialsProvider({
      name: "Credential",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
        purpose: { label: "purpose", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email && !credentials?.password) {
          return null
        }
        let user
        if (credentials.purpose === "User") {
          user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          })
        }
        if (credentials.purpose === "Business") {
          user = await prisma.business.findUnique({
            where: {
              email: credentials.email
            }
          })
        }
        if (!user) {
          return null
        }
        const verifiedPassword = bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )
        if (!verifiedPassword) {
          return null
        }
        return user
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOption)

export { handler as GET, handler as POST }