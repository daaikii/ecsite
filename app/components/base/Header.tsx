"use client"
import { FC, useState } from "react"
import Link from "next/link"
import { NavLink } from "../ui/CustomLink"
import { signOut, useSession } from "next-auth/react"

import { usePurposeStore, useStore } from "@/lib/context/purpose"
import Toggle from "../ui/Toggle/Toggle"

const Header: FC = () => {
  const { status } = useSession()
  const purpose = useStore(usePurposeStore, state => state.purpose)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <div className="bg-custom-main h-[80px] w-full flex justify-between items-center px-12  relative">
      <h1 className="text-white text-cl_lg font-bold w-max">
        <Link href="/">
          Food Rescue Hub
        </Link>
      </h1>

      <ul className={`
        z-20

        absolute sm:relative
        ${isOpen ? "top-40" : "top-[-100%]"} sm:top-0
        ${isOpen ? "left-10" : "left-[-100%]"} sm:left-0 sm:right-12
        
        flex flex-col sm:flex-row gap-5
        `
      }>
        {
          status === "authenticated" ?
            <>
              {purpose === "SHOP" &&
                <>
                  <NavLink text="出品一覧" href="/item/list/currentShopItems?page=1" />
                  <NavLink text="出品" href="/item/post" />
                </>
              }
              <li onClick={() => signOut()}>
                <NavLink text="SIGNOUT" href="" />
              </li>
            </>
            : <NavLink text="LOGIN" href="/auth" />
        }
      </ul>
      <Toggle isOpen={isOpen} setIsOpen={setIsOpen} />
    </div >
  )
}

export default Header

