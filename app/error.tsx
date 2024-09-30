"use client"
import { FC } from "react"
import ErrorPage from "./components/ErrorPage"

const Error: FC = () => {
  return (
    <ErrorPage message="予期せぬエラーが発生しました。" />
  )
}

export default Error