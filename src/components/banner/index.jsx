import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './BannerCarousel.scss';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useDispatch } from 'react-redux';
import { displayBanner } from '../../services/bannerService';

export default function BannerCarousel() {
    const [banner,setBanner] = useState(null)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(displayBanner()).then((res)=>{
            console.log(res.payload.content);
            setBanner(res.payload.content);
        })
    },[])
  return (
    <>
    <div className="banner-carousel-container ">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >{
        banner ? 
        banner.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="banner-slide ">
              <img
                src={item.image}
                alt={item.title}
              />
            </div>
          </SwiperSlide>
        ))
        : <SwiperSlide>
          <div className="banner-slide">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBbLftkyGy9jB8KlDUqt3lhXKh20jUSU9QtniS1sCkQUm2ziii-sDlX9zDFRQLMZ1zmLk&usqp=CAU"
              alt="Slide 1"
            />
          </div>
        </SwiperSlide>
      }
       
      </Swiper>
    </div>
   
    </>
  );
}
