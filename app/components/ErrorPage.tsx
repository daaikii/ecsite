import { FC } from "react";

type Params = {
  message: string
}

const ErrorPage: FC<Params> = ({ message }: Params) => {
  return (
    <div className="h-[50%] w-full flex justify-center items-center">
      <h2 className="font-bold text-cl_lg">
        {message}
      </h2>
    </div>
  )
}

export default ErrorPage;