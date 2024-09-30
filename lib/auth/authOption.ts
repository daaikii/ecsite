import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/data/prismadb"
import bcrypt from "bcryptjs"

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



          if (credentials.purpose === "USER") {
            const user = await prisma.user.findUnique({
              where: {
                email: credentials.email
              }
            })
            if (!user) {
              return null
            }
            const correctPassword = await bcrypt.compare(
              credentials.password,
              user.hashedPassword
            )
            if (!correctPassword) {
              return null
            }
            return { ...user, purpose: credentials.purpose }



          } else if (credentials.purpose === "SHOP") {
            const shop = await prisma.shop.findUnique({
              where: {
                email: credentials.email
              }
            })
            if (!shop) {
              return null
            }
            const correctPassword = await bcrypt.compare(
              credentials.password,
              shop.hashedPassword
            )
            if (!correctPassword) {
              return null
            }
            return { ...shop, purpose: credentials.purpose, shopId: shop.id }



          } else {
            return null
          }
        } catch (error) {
          return null
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token, user }: any) {
      // sessionにpurposeを含める
      session.user.purpose = token.purpose;
      //sessionにshopIdを含める
      session.user.shopId = token.shopId || undefined;
      return session;
    },
    async jwt({ token, user }: any) {
      // JWTにpurposeを含める
      if (user) {
        token.purpose = user.purpose;
        token.shopId = user.shopId || undefined;
      }
      return token;
    }
  }
}
