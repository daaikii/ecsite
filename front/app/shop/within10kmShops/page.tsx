import { FC } from "react"

import getWithin10kmShops from "@/app/action/getWithin10kmShops"
import Within10kmShops from "./components/Within10kmShops"

const Page: FC = async () => {
  const shops = await getWithin10kmShops()
  return <Within10kmShops shops={shops} />
}

export default Page