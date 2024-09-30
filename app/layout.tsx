"use client"

import "./globals.css";
import { SessionProvider } from "next-auth/react";

import Header from "@/app/components/base/Header"
import PurposeObserver from "./PurposeObserver";

type Props = Readonly<{ children: React.ReactNode }>

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ja">
      <body >
        <SessionProvider>
          <PurposeObserver />
          <Header />
          <div className="h-[calc(100vh-100px)]">
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
