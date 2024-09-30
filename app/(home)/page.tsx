import { FC } from "react"

import getShops from "@/lib/data/getShopsWithItems"
import ErrorMessage from "../components/ui/ErrorMessage"
import ShopsSection from "./components/ShopsSection"
import ItemsSection from "./components/ItemsSection"
// import ErrorPage from "../components/ErrorPage"

const Page: FC = async () => {
  const res = await getShops()

  if (res instanceof Error) {
    return <ErrorMessage message={res.message} />
  }

  return (
    <>
      <title>HOME</title>
      {
        res.shopsDTO.length ? <ShopsSection shops={res.shopsDTO} />
          : <ErrorMessage message="ショップが存在しません" />
      }
      {
        res.itemsDTO.length ? <ItemsSection items={res.itemsDTO} />
          : <ErrorMessage message="アイテムが存在しません" />
      }
    </>
  )
}

export default Page
