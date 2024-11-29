import { FC } from "react"

const Loading: FC = () => {
  return (
    <div className=" h-[calc(100vh-80px)] flex items-center justify-center">
      <div className=" loader"></div >
    </div >
  )
}

export default Loading