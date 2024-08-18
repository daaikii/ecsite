"use client"
import { FC } from "react"
import ErrorComponent from "./components/ErrorComponent"

const Error: FC = () => {
  return (
    <ErrorComponent message="予期せぬエラーが発生しました。" />
  )
}

export default Error