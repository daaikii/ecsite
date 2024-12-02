import { FC } from "react"

import getShops from "@/lib/data/getShopsWithItems"
import ErrorPage from "@/app/components/ErrorPage"
import ShopsSection from "@/app/home/components/ShopsSection"
import ItemsSection from "@/app/home/components/ItemsSection"
// import ErrorPage from "../components/ErrorPage"

const Page: FC = async () => {
  const res = await getShops()

  if (res instanceof Error) {
    return <ErrorPage message={res.message} />
  }

  return (
    <>
      {process.env.AWS_ACCESS_KEY_ID}
      {process.env.AWS_SECRET_ACCESS_KEY}
      {process.env.AWS_REGION}
      {process.env.AWS_S3BUCKET_NAME}

      {process.env.NEXT_PUBLIC_GOOGLE_MAP_MAPID}
      {process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
      {process.env.NEXTAUTH_SECRET}

      {process.env.DATABASE_URL}
      {process.env.DIRECT_URL}
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
