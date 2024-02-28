import { FC } from "react"

import Home from "./components/Home"
import getWithin10kmShops from "@/app/action/getWithin10kmShops"

const Page: FC = async () => {
  const shops = await getWithin10kmShops()
  return <Home shops={shops} />
}

export default Page
