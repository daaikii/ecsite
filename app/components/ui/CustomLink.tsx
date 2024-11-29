import Link from "next/link"


type NavLinkProps = {
  text: string,
  href: string,
  event?: () => void,
}


export function NavLink({ text, href, event }: NavLinkProps) {
  return (
    <Link
      className={
        `
          block
          text-cl_sm text-white
          hover:border-b hover:border-white hover:mb-[-1px]
        `
      }
      href={href}
      onClick={() => !!event && event()}
    >
      {text}
    </Link>
  )
}

export function CustomLink({ text, href, event }: NavLinkProps) {
  return (
    <Link
      className={
        `
        text-cl_sm text-custom-point hover:text-custom-main
        hover:border-b hover:border-custom-main hover:mb-[-1px]
        `
      }
      href={href}
      onClick={() => !!event && event()}
    >
      {text}
    </Link>
  )
}