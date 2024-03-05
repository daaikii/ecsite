"use client"
import { FC } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import Image from "next/image"

const Header: FC = () => {
  const { status } = useSession()
  return (
    <div className="h-20 bg-[#FF6565]">
      <Link href="/">
        <Image src="/" alt="logo" />
      </Link>
      {status !== "authenticated" && <Link href="/auth">
        Login
      </Link>
      }
    </div>
  )
}

export default Header