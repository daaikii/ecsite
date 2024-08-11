import { withAuth } from "next-auth/middleware"

export default withAuth(
  // Matches the pages config in `[...nextauth]`
  {
    pages: {
      signIn: '/auth',
    }
  },
)

export const config = {
  matcher: "/((?!register|api|auth).*)"
};