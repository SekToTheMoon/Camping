"use client";
import { LandmarkCardProps } from "@/utils/types";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Autoplay, Pagination } from "swiper/modules";
import OtherInfo from "./OtherInfo";
import Image from "next/image";

const Hero = ({ landmarks }: { landmarks: LandmarkCardProps[] }) => {
  return (
    <div>
      <Swiper
        navigation={true}
        autoplay={{
          delay: 2000,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Autoplay, Pagination]}
        className="mySwiper"
      >
        {landmarks.map((landmark) => {
          return (
            <SwiperSlide key={landmark.image} className="group">
              <div className="relative h-[300px]  rounded-md overflow-hidden">
                <Image
                  sizes="100vw"
                  fill
                  alt={landmark.description}
                  className="object-cover
                  brightness-75 group-hover:brightness-50 
                  transition-all duration-300
                  "
                  src={landmark.image}
                />
                <div className="absolute bottom-0 left-0 z-50">
                  <div
                    className="px-5 md:mb-4 md:px-10
                  "
                  >
                    <OtherInfo landmark={landmark} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
export default Hero;
