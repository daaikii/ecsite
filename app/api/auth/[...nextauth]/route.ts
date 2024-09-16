import NextAuth from "next-auth/next";
import { authOption } from "@/app/lib/authOption"


const handler = NextAuth(authOption)

export { handler as GET, handler as POST }