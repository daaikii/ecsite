"use client"

import "./globals.css";
import { SessionProvider } from "next-auth/react";

import Header from "@/app/components/base/Header"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body >
        <SessionProvider>
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
