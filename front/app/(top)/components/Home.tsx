"use client"
import { FC, useMemo } from "react"
import Link from "next/link"
import { SwiperSlide } from "swiper/react"

import { ShopWithItems } from "@/app/types/prisma"
import ShopCard from "@/app/components/card/ShopCard"
import ItemCard from "@/app/components/card/ItemCard"
import Slider from "@/app/components/ui/Slider"
import { Item } from "@prisma/client"

type ShopsProps = {
  shops: ShopWithItems[]
  items: Item[]
}


const Home: FC<ShopsProps> = ({ shops, items }) => {

  const itemSlideSettings = useMemo(() => (
    {
      0: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 1,
      },
      1280: {
        slidesPerView: 5,
        spaceBetween: 1,
      },
      1536: {
        slidesPerView: 10,
        spaceBetween: 1,
      }
    }
  ), [])

  const shopSlideSettings = useMemo(() => (
    {
      0: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 1,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 1,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 1,
      },
      1536: {
        slidesPerView: 7,
        spaceBetween: 1,
      }
    }
  ), [])

  return (
    <>
      <section className="py-8  px-[40px] md:px-[120px]">
        <h2 className="mb-6 text-category">近くの商品一覧</h2>
        <ul className="flex">
          <Slider slideSettings={itemSlideSettings}>
            {
              items.map((item, index) => {
                return (
                  <SwiperSlide key={index} >
                    <ItemCard item={item} />
                  </SwiperSlide>
                )
              })
            }
          </Slider>
        </ul>
        <Link
          className="text-link "
          href="/shop/item/itemList/within10kmItems/1"
        >
          詳しく見る
        </Link>
      </section >


      <section className="
        py-8  px-[40px]
        bg-custom-gray_light
        md:px-[120px]"
      >
        <h2 className="mb-6 text-category">近くの店舗一覧</h2>
        <ul className="
        flex
        max-sm:[&>li:nth-child(n+3)]:hidden  
        sm:max-md:[&>li:nth-child(n+4)]:hidden
        "
        >
          <Slider slideSettings={shopSlideSettings}>
            {
              shops?.map((shop, index) => {
                return (
                  index < 7 &&
                  <SwiperSlide key={index}>
                    <ShopCard shop={shop} />
                  </SwiperSlide>
                )
              })
            }
          </Slider>
        </ul>
        <Link
          className="text-link"
          href="/shop/within10kmShops/1">詳しく見る</Link>
      </section>
    </>
  )
}

export default Home
