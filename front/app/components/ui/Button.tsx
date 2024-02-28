"use client"
import { FC } from "react"

type ButtonProps = {
  label: string,
  disabled: boolean,
  onClick?: () => void,
}

const Button: FC<ButtonProps> = ({ label, disabled, onClick }) => {
  return (
    <button onClick={() => onClick && onClick()}
      disabled={disabled}
      className='
        bg-[#ff6565]
          text-white
          w-full
          p-2
         '
    >
      {label}
    </button>
  )
}

export default Button