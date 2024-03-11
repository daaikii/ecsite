"use client"
import { FC } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import Image from "next/image"

import { useStore } from "@/app/lib/store/purpose"

const Header: FC = () => {
  const { status } = useSession()
  const purpose = useStore((state) => state.purpose)
  return (
    <div className="h-20 bg-[#FF6565]">
      <h1>
        <Link href="/">
          {/* <Image src="/" alt="logo" width={0} height={0} /> */}
        </Link>
      </h1>
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