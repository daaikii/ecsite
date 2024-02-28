import { FC } from "react"

type FormBaseProps = { children: React.ReactNode }

const FormBase: FC<FormBaseProps> = ({ children }) => {
  return (
    <div className="px-[480px] py-[40px] ">
      <div className="bg-white text-center min-h-[500px] px-60 py-10 ">
        {children}
      </div>
    </div>
  )
}

export default FormBase