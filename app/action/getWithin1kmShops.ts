import prisma from "@/app/lib/prismadb"
import { NextResponse } from "next/server"

import useCalcDistance from "@/app/utils/useCalcDistance"
import { ShopWithItems } from "../types/prisma"

export default async function getWithin1kmShop() {
  let userLocation = { userLat: 35.65062086741866, userLng: 139.29318212818947 }
  try {
    // userの位置情報を取得
    // navigator.geolocation.getCurrentPosition((position) => {
    //   if (!position.coords.latitude && !position.coords.longitude) {
    //     return new NextResponse("",{status:400})
    //   }
    //   userLocation = { lat2: position.coords.latitude, lng2: position.coords.longitude }
    // })

    const shops = await prisma.shop.findMany({
      include: {
        items: true
      }
    })

    if (!shops) {
      return new NextResponse("shop not found", { status: 404 })
    }

    let within1kmShops: ShopWithItems[] = []

    shops.map((shop) => {
      const shopLocation = {
        shopLat: shop.latitude,
        shopLng: shop.longitude
      }
      const distance = useCalcDistance(shopLocation, userLocation)
      if (distance <= 1) {
        within1kmShops = [...within1kmShops, shop]
      }
    })

    if (!within1kmShops.length) {
      return null
    }
    return within1kmShops
  }
  catch (error) {
    console.error("failed to get shops", error)
    return new NextResponse("internal server error", { status: 500 })
  }
}
