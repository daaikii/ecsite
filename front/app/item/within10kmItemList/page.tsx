import { FC } from "react"

import getWithin10kmShops from "@/app/action/getWithin10kmShops"
import Within10kmItemsList from "./components/Within10kmItemsList"

const Page: FC = async () => {
  const shops = await getWithin10kmShops()

  return (
    <Within10kmItemsList shops={shops} />
  )
}

export default Page