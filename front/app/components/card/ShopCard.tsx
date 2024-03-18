// "use client"
// import { FC } from "react"

// import Image from "next/image"
// import { ShopWithItems } from "@/app/types/prisma"
// import { useRouter } from "next/navigation"

// type ShopProps = {
//   shop: ShopWithItems
// }

// const ShopCard: FC<ShopProps> = ({ shop }) => {
//   const router = useRouter()
//   return (
//     <li
//       key={shop.id}
//       className="
//         mb-8
//         w-[100%]
//         rounded-lg
//         xl:w-[20%]
//         "
//     >
//       <div
//         onClick={() => router.push(`/shop/item/itemList/${shop.id}/1`)}
//         className="
//         mx-auto
//         w-[100%]
//         shadow-md 
//         cursor-pointer
//         "
//       >
//         <div className="
//           relative mb-5 
//           h-[200px]
//           w-[100%]
//           xl:w-[200px] 
//           object-cover
//           rounded-t-lg 
//           overflow-hidden
//           "
//         >
//           <Image src={shop.imageURL} alt="shop icon" fill objectFit="cover" />
//         </div>
//         <ul className="
//         text-center 
//         flex 
//         justify-center 
//         xl:list-item
//         [&>li:nth-child(-n+2))]:mr-2 
//         xl:[&>li:nth-child(-n+2))]:mr-none 
//         "
//         >
//           <li key="item0" className="mb border-b">{shop.items[0]?.name}</li>
//           <li key="item1" className="mb border-b">{shop.items[1]?.name}</li>
//           <li key="item2" className="mb">{shop.items[2]?.name}</li>
//         </ul>
//       </div>
//     </li>

//   )
// }

// export default ShopCard
"use client"
import { FC } from "react"

import Image from "next/image"
import { ShopWithItems } from "@/app/types/prisma"
import { useRouter } from "next/navigation"

type ShopProps = {
  shop: ShopWithItems
}

const ShopCard: FC<ShopProps> = ({ shop }) => {
  const router = useRouter()
  return (
    <li
      key={shop.id}
      className="
        mb-8
        w-[100%]
        rounded-lg
        xl:w-[15%]
        "
    >
      <div
        onClick={() => router.push(`/shop/item/itemList/${shop.id}/1`)}
        className="
        mx-auto
        w-[100%]
        shadow-md 
        cursor-pointer
        xl:w-[200px]
        "
      >
        <div className="
          relative 
          h-[200px]
          w-[100%]
          xl:w-[200px] 
          rounded-t-lg 
          overflow-hidden
          "
        >
          <Image src={shop.imageURL} alt="shop icon" fill objectFit="cover" />
        </div>
        <ul className="
        lg:max-xl:flex 
        list-item
        lg:max-xl:justify-center 
        pt-5
        bg-custom-main
        text-white
        font-bold
        text-center 
        lg:max-xl:[&>li:nth-child(-n+2))]:mr-2 
        "
        >
          <li key="item0" className="mb border-b text-sm">{shop.items[0]?.name}</li>
          <li key="item1" className="mb border-b text-sm">{shop.items[1]?.name}</li>
          <li key="item2" className="mb text-sm">{shop.items[2]?.name}</li>
        </ul>
      </div>
    </li>

  )
}

export default ShopCard