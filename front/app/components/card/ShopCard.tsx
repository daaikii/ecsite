import { FC } from "react"

import { Shop, Item } from "@prisma/client"

type ShopCardProps = { shop: { items: Item[] } & Shop, onClick: () => void }

const ShopCard: FC<ShopCardProps> = ({ shop }) => {
  return (
    <>
      <img src={shop.imageURL} />
      <ul>
        <li key="item0">{shop.items[0]?.name}</li>
        <li key="item1">{shop.items[1]?.name}</li>
        <li key="item2">{shop.items[2]?.name}</li>
      </ul>
    </>
  )
}

export default ShopCard