import { FC } from "react"

type FormBaseProps = { children: React.ReactNode }

const FormBase: FC<FormBaseProps> = ({ children }) => {
  return (
    <div className="px-[100px] lg:px-[200px]  xl:px-[500px] py-10 text-center ">
      {children}
    </div>
  )
}

export default FormBase