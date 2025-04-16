'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

interface ProductSliderProps {
  mainImage: string;
  additionalImages: string[];
  productName: string;
}

export default function ProductSlider({ mainImage, additionalImages, productName }: ProductSliderProps) {
  const allImages = [mainImage, ...additionalImages];

  return (
    <div className="product-slider">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        className="product-slider__swiper"
      >
        {allImages.map((imageUrl, index) => (
          <SwiperSlide key={index} className="product-slider__slide">
            <div className="product-slider__image-container">
              <Image
                src={imageUrl}
                alt={`${productName} - תמונה ${index + 1}`}
                fill
                className="product-slider__image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
} 