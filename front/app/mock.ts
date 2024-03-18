import { Item } from "@prisma/client"

export const item = {
  id: "cltp8af460000eqq7j5wi44h2",
  name: "じゃがいも1kg",
  price: "400",
  expirationDate: "1日",
  stock: "4",
  detail: "ｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘｘ",
  imageURL: "/potato.jpg",
  shopId: "cltnqqwfa0000szjcts33bmjd",
  userId: "",
}

export const items: Item[] = [
  item,
  item,
  item,
  item,
  item,
  item,
  item,
  item,
  item,
  item,
  item,
  item,
  item,
]

export const shop = {
  id: "cltnqqwfa0000szjcts33bmjd",
  email: "xxx@email.com",
  name: "スーパー○○",
  hashedPassword: "$2b$10$Bk9Y5LVYfGifmj0PObyPSOW.P8cY4VSinw7M6IFy1bWFQmK.gqqmG",
  imageURL: "/shop.jpg",
  address: "XXX市XXX町XXX-XXXX",
  latitude: 35.65678432875279,
  longitude: 139.2981066638532,
  items
}

export const shops = [
  shop,
  shop,
  shop,
  shop,
  shop,
  shop,
  shop,
  shop,
  shop,
  shop,
  shop,
  shop,
  shop,
  shop,
  shop,
  shop,
  shop,
  shop,
  shop,
  shop,
]