import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    purpose?: "USER" | "SHOP"; // カスタムフィールド 'purpose' を追加
    shopId?: string | undefined;
  }

  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      purpose?: "USER" | "SHOP"; // Session の User に 'purpose' を追加
      shopId?: string | undefined;
    };
  }
}
