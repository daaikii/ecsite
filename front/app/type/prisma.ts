import { Item, Shop } from "@prisma/client"

export type ShopWithItems = { items: Item[] } & Shop