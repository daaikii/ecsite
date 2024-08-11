import { FC } from "react"
import { Swiper } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "./Slider.module.css"

type SlideProps = {
  children: React.ReactNode,
  slideSettings: any
}

const Slider: FC<SlideProps> = ({ children, slideSettings }) => {
  return (
    <Swiper
      modules={[Autoplay]}
      breakpoints={slideSettings}
      slidesPerView={"auto"}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false
      }}
    >
      {children}
    </Swiper>
  )
}

export default Slider