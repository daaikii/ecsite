"use client"
import { FC } from "react"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

import { usePurposeStore, useStore } from "@/lib/context/purpose"

const Header: FC = () => {
  const { status } = useSession()
  const purpose = useStore(usePurposeStore, state => state.purpose)
  return (
    <div className="bg-custom-main h-[100px] w-full flex justify-between items-center px-12">
      <h1 className="text-category text-white text-4xl">
        <Link href="/">
          FoodLossToZero
        </Link>
      </h1>

      <ul className="flex">
        {
          status === "authenticated" &&
          purpose === "SHOP" &&
          <>
            <li className="ml-4 text-nav-item">
              <Link href="/item/list/currentShopItems?page=1">
                出品一覧
              </Link>
            </li>
            <li className="ml-4 text-nav-item">
              <Link href="/item/post">
                出品
              </Link>
            </li>
          </>
        }
        {
          status !== "authenticated"
            ?
            <li className="ml-4 text-nav-item">
              <Link href="/auth">
                LOGIN
              </Link>
            </li>
            :
            <li className="ml-4 text-nav-item">
              <Link href="" onClick={() => signOut()}>
                LOGOUT
              </Link>
            </li>
        }
      </ul>
    </div>
  )
}

export default Header