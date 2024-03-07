import { FC } from "react"

import getWithin10kmShops from "@/app/action/getWithin10kmShops"
import Within10kmItems from "./components/Within10kmItems"

const Page: FC = async () => {
  const shops = await getWithin10kmShops()
  if (!shops) {
    return <p>ショップが見つかりません</p>
  }
  return (
    <Within10kmItems shops={shops} />
  )
}

export default Page