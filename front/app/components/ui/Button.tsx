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
          mb-6 p-2
          text-white
          w-full
         '
    >
      {label}
    </button>
  )
}

export default Button