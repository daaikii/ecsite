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
      mb-6 p-2
      w-full
      text-white
      bg-custom-main
      font-bold
      '
    >
      {label}
    </button>
  )
}

export default Button