"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, A11y, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "./slide.css";
import "./responsive.css";

const Slide = () => {
  return (
    <div className="slide row">
      <div className="col l-12 m-12 s-12 slide__left">
        <Swiper
          modules={[Navigation, A11y, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <div className="slide__img">
              <Image
                priority={true}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 320px) 100vw"
                alt="slide"
                src="https://cdn0.fahasa.com/media/magentothem/banner7/20_11_mainbanner_Slide_840x320.jpg"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide__img">
              <Image
                priority={true}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 320px) 100vw"
                alt="slide"
                src="https://cdn0.fahasa.com/media/magentothem/banner7/NCCMcBooksT1123_BannerSlide_840x320.jpg"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide__img">
              <Image
                priority={true}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 320px) 100vw"
                alt="slide"
                src="https://cdn0.fahasa.com/media/magentothem/banner7/NCCMcBooksT1123_BannerSlide_840x320.jpg"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide__img">
              <Image
                priority={true}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 320px) 100vw"
                alt="slide"
                src="https://cdn0.fahasa.com/media/magentothem/banner7/FahasaSaleThu3T1123_W1_Banner_840x320.jpg"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      {/* <div className="col l-4 m-0 s-0 slide__right">
        <div className="slide__right--img">
          <Image
            priority={true}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 320px) 100vw"
            alt="slide"
            src="https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2023/ZaloPay11_392x156_1.jpg "
          />
        </div>
        <div className="slide__right--img">
          <Image
            priority={true}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 320px) 100vw"
            alt="slide"
            src="https://cdn0.fahasa.com/media/wysiwyg/Thang-10-2023/VNPAYFHS20_392x156_1.jpg "
          />
        </div>
      </div> */}
    </div>
  );
};

export default Slide;
