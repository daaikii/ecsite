"use client"
import { FC } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"

import { usePurposeStore, useStore } from "@/app/lib/store/purpose"

const Header: FC = () => {
  const { status } = useSession()
  const purpose = useStore(usePurposeStore, state => state.purpose)
  return (
    <div className="bg-custom-main ">
      <div className="
      py-6 px-12 
      flex justify-between items-end"
      >
        <h1 className="text-category text-white">
          <Link href="/">
            FoodLossZero
          </Link>
        </h1>
        <ul className="flex">
          {purpose === "SHOP" &&
            <>
              <li className="ml-4 text-nav-item">
                <Link href="/shop/item/itemList/currentShopItems/1">
                  出品一覧
                </Link>
              </li>
              <li className="ml-4 text-nav-item">
                <Link href="/shop/item/post">
                  出品
                </Link>
              </li>
            </>
          }
          {status !== "authenticated" &&
            <li className="ml-4 text-nav-item">
              <Link href="/auth">
                LOGIN
              </Link>
            </li>
          }
        </ul>
      </div>
    </div>
  )
}

export default Header