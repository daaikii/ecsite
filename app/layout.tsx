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
          <div className="h-[calc(100vh-100px)]">
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
