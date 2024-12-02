import { FC } from "react"

import getShops from "@/lib/data/getShopsWithItems"
import ErrorPage from "./components/ErrorPage"
import ShopsSection from "./home/components/ShopsSection"
import ItemsSection from "./home/components/ItemsSection"
// import ErrorPage from "../components/ErrorPage"

const Page: FC = async () => {
  const res = await getShops()

  if (res instanceof Error) {
    return <ErrorPage message={res.message} />
  }

  return (
    <>
      <title>HOME</title>
      {
        res.shopsDTO.length ? <ShopsSection shops={res.shopsDTO} />
          : <ErrorPage message="ショップが存在しません" />
      }
      {
        res.itemsDTO.length ? <ItemsSection items={res.itemsDTO} />
          : <ErrorPage message="商品が存在しません" />
      }
    </>
  )
}

export default Page
