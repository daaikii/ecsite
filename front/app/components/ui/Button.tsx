"use client"

type ButtonProps = {
  label: string,
  disabled: boolean,
  onClick?: () => void
}

const Button = ({ label, disabled, onClick }: ButtonProps) => {
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