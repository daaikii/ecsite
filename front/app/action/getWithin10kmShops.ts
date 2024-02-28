import { Item, Shop } from "@prisma/client"
import prisma from "@/app/lib/prismadb"
import useCalcDistance from "@/app/hooks/useCalcDistance"

async function getShop() {
  let userLocation = { lat2: 32.674552059110674, lng2: 130.28795159509326 }
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
      throw new Error("Failed fetch shops")
    }

    let within10kmShops: ({ items: Item[] } & Shop)[] = []
    shops.map((shop) => {
      const distance = useCalcDistance({ lat1: shop.latitude, lng1: shop.longitude }, userLocation)
      if (distance <= 10) {
        within10kmShops = [...within10kmShops, shop]
      }
    })

    if (!within10kmShops.length) {
      return null
    }

    return within10kmShops

  }
  catch (error) {
    console.log(error)
    return []
  }
}

export default getShop


