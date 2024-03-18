import prisma from "@/app/lib/prismadb"
import useCalcDistance from "@/app/utils/useCalcDistance"
import { ShopWithItems } from "../types/prisma"

export default async function getShop() {
  let userLocation = { lat2: 35.65062086741866, lng2: 139.29318212818947 }
  try {
    // userの位置情報を取得
    // navigator.geolocation.getCurrentPosition((position) => {
    //   if (!position.coords.latitude && !position.coords.longitude) {
    //     console.error("位置情報をONにして下さい")
    //     throw new Error("Failed get present location")
    //   }
    //   userLocation = { lat2: position.coords.latitude, lng2: position.coords.longitude }
    // })

    const shops = await prisma.shop.findMany({
      include: {
        items: true
      }
    })

    if (!shops) {
      return []
    }

    let within10kmShops: ShopWithItems[] = []
    shops.map((shop) => {
      const distance = useCalcDistance({ lat1: shop.latitude, lng1: shop.longitude }, userLocation)
      if (distance <= 10) {
        within10kmShops = [...within10kmShops, shop]
      }
    })

    if (!within10kmShops.length) {
      return []
    }

    return within10kmShops

  }
  catch {
    return []
  }
}
