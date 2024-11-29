import { FC } from "react"

type FormBaseProps = { children: React.ReactNode }

const FormBase: FC<FormBaseProps> = ({ children }) => {
  return (
    <div className="
      py-10
      text-center
      flex justify-center content-center
    "
    >
      <div className="w-[clamp(350px,80vw,600px)]">
        {children}
      </div>
    </div>
  )
}

export default FormBase