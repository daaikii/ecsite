import { FC } from "react"

type FormBaseProps = { children: React.ReactNode }

const FormBase: FC<FormBaseProps> = ({ children }) => {
  return (
    <div className="
     px-[100px] lg:px-[200px]  xl:px-[400px] 2xl:px-[800px] 
     py-10 
     text-center"
    >
      {children}
    </div>
  )
}

export default FormBase