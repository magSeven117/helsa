'use client'
import { Button } from "@/libs/shadcn-ui/components/button";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import { useState } from "react";
import 'swiper/css/bundle';
import 'swiper/css/navigation';
export default function Page() {
  const [swiper, setSwiper] = useState(null)
  
  return (
    <div>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => setSwiper(swiper)}
        className="w-full max-w-md mx-auto bg-gray-200 rounded-lg overflow-hidden"
        pagination={{ clickable: true }}
        loop={false}
      >
        <SwiperSlide className="p-6 flex flex-col items-center justify-center">
          <h3 className="text-2xl font-bold mb-4">Bienvenido a nuestra aplicación</h3>
          <p className="text-center text-gray-600 mb-6">Estamos emocionados de tenerte aquí. Vamos a configurar tu cuenta en unos sencillos pasos.</p>
          <img src="/images/banner2-removebg.png" alt="Bienvenida" className="w-[300px]" />
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
      <Button onClick={() => swiper.slideNext()}>Next</Button>
    </div>
  )
}