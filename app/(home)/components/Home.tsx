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
        slidesPerView: items.length < 1 ? 0 : 1,
        spaceBetween: 0,
      },
      640: {
        slidesPerView: items.length < 3 ? items.length : 3,
        spaceBetween: 0,
      },
      1024: {
        slidesPerView: items.length < 4 ? items.length : 4,
        spaceBetween: 1,
      },
      1280: {
        slidesPerView: items.length < 5 ? items.length : 5,
        spaceBetween: 1,
      },
      1536: {
        slidesPerView: items.length < 10 ? items.length : 10,
        spaceBetween: 1,
      }
    }
  ), [])

  const shopSlideSettings = useMemo(() => (
    {
      0: {
        slidesPerView: shops.length < 1 ? 0 : 1,
        spaceBetween: 0,
      },
      640: {
        slidesPerView: shops.length < 3 ? shops.length : 3,
        spaceBetween: 1,
      },
      1024: {
        slidesPerView: shops.length < 3 ? shops.length : 3,
        spaceBetween: 1,
      },
      1280: {
        slidesPerView: shops.length < 4 ? shops.length : 4,
        spaceBetween: 1,
      },
      1536: {
        slidesPerView: shops.length < 7 ? shops.length : 7,
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
          href="/item/itemList/within1kmItems/1"
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
          href="/shop/within1kmShops/1">詳しく見る</Link>
      </section>
    </>
  )
}

export default Home
