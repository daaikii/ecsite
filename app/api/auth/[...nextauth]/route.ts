import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"

import prisma from "@/app/lib/prismadb"

export const authOption = {
  providers: [
    CredentialsProvider({
      name: "Credential",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
        purpose: { label: "purpose", type: "text" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email && !credentials?.password) {
            return null
          }
          let user
          if (credentials.purpose === "USER") {
            user = await prisma.user.findUnique({
              where: {
                email: credentials.email
              }
            })
          }
          if (credentials.purpose === "SHOP") {
            user = await prisma.shop.findUnique({
              where: {
                email: credentials.email
              }
            })
          }
          if (!user) {
            return null
          }
          const correctPassword = bcrypt.compare(
            credentials.password,
            user.hashedPassword
          )
          if (!correctPassword) {
            return null
          }
          return user
        } catch (error) {
          return null
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOption)

export { handler as GET, handler as POST }