import prisma from "@/lib/utils/prismadb"
import useCalcDistance from "@/lib/utils/calcDistance"
import { ShopDTO, ItemDTO } from "../types/data"

export default async function shops() {
  // let userLocation = { userLat: 35.65062086741866, userLng: 139.29318212818947 }
  let userLocation = { userLat: 35.65462091752649, userLng: 139.2883457074043 }
  try {
    // userの位置情報を取得
    // navigator.geolocation.getCurrentPosition((position) => {
    //   if (!position.coords.latitude && !position.coords.longitude) {
    //     return new NextResponse("",{status:400})
    //   }
    //   userLocation = { lat2: position.coords.latitude, lng2: position.coords.longitude }
    // })



    const shops = await prisma.shop.findMany({ include: { items: true } })
    if (!shops.length) {
      return new Error("ショップ・商品が見つかりません")
    }

    //ショップ情報をshopDTOに変換する
    const { shopsDTO, itemsDTO } =
      shops.reduce<{ shopsDTO: ShopDTO[], itemsDTO: ItemDTO[] }>((acc, shop) => {
        //1kmを条件に絞る
        const shopLocation = {
          shopLat: shop.latitude,
          shopLng: shop.longitude
        }
        const distance = useCalcDistance(shopLocation, userLocation)
        if (distance > 1) return acc
        //itemをItemDTOに変換する
        const shopItems: ItemDTO[] = shop.items.map((item) => {
          return {
            id: item.id,
            name: item.name,
            price: item.price,
            expirationDate: item.expirationDate,
            stock: item.stock,
            imageURL: item.imageURL,
            detail: item.detail,
          }
        })
        //shopをshopDTOに変換
        const newShop: ShopDTO = {
          id: shop.id,
          name: shop.name,
          imageURL: shop.imageURL,
          address: shop.address,
          latitude: shop.latitude,
          longitude: shop.longitude,
          items: shopItems
        }
        return {
          shopsDTO: [...acc.shopsDTO, newShop],
          itemsDTO: [...acc.itemsDTO, ...shopItems]
        }
      }, { shopsDTO: [], itemsDTO: [] })


    return { shopsDTO, itemsDTO }
  }
  catch (error) {
    console.error("failed to get shops", error)
    return new Error("ショップ情報の取得に失敗しました")
  }
}
