import { FC } from "react";

type Params = {
  message: string
}

const ErrorComponent: FC<Params> = ({ message }: Params) => {
  return (
    <div className="h-[100%] w-full flex justify-center items-center">
      <h2 className="font-bold text-5xl">
        {message}
      </h2>
    </div>
  )
}

export default ErrorComponent;