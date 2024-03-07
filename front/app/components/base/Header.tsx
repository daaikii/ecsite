"use client"
import { FC } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import Image from "next/image"

import { purpose } from "@/app/store/purpose"

const Header: FC = () => {
  const { status } = useSession()
  return (
    <div className="h-20 bg-[#FF6565]">
      <Link href="/">
        <Image src="/" alt="logo" />
      </Link>
      <ul>
        {purpose === "Shop" && (
          <>
            <li><Link href="/shop/currentShopItems">出品商品一覧</Link></li>
          </>
        )}
        <li>
          {status !== "authenticated" &&
            <Link href="/auth">
              Login
            </Link>
          }
        </li>
      </ul>
    </div>
  )
}

export default Header