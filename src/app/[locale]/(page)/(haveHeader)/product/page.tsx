import staticVariables from '@/static';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Carousel, Image } from 'antd';
import React, { useState } from 'react';

export default function ProductPage() {
  // const [currentSlide,setCurrentSlide] = useState(1)
  return (
    <div className="w-full pt-[100px]">
      <div className="w-full">
        <Carousel
          waitForAnimate
          className="w-full h-[450px] bg-[#f5f5f5]"
          autoplay
        >
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-[450px] px-[200px]">
              <div className="w-full h-full flex">
                <div
                  data-aos="fade-right"
                  data-aos-duration="1000"
                  data-aos-anchor-placement="center-center"
                  data-aos-mirror="true"
                  className="w-1/2 my-auto flex flex-col font-sans"
                >
                  <p className="text-[48px] font-semibold ">Fresh Vegetable</p>
                  <p className="text-[36px] font-light">Fresh Vegetable</p>
                  <p className="text-[16px] ">
                    The XX không chỉ là điểm đến về dịch vụ ăn uống, khi đến với
                    The XX các bạn sẽ được trải nghiệm thêm về nghệ thuật từ
                    không gian trang trí...
                  </p>
                </div>
                <div className="w-1/2">
                  <Image
                    className="object-cover"
                    width={'100%'}
                    height={'100%'}
                    alt=""
                    preview={false}
                    src={staticVariables.shrimp1.src}
                  />
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="w-full flex px-[150px] my-[50px] gap-x-5 justify-around">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="w-1/6 flex items-center space-x-5">
            <FontAwesomeIcon
              size={'2x'}
              icon={faTruckFast}
              style={{ color: '#3f76d5' }}
            />
            <div className="font-sans">
              <p className="text-[16px]">FAST SHIPPNG</p>
              <p className="text-[13px]">
                Free shipping on all US order or order above $200
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-col">
        <p className="m-auto text-[32px] font-extralight">Trendding Products</p>
        <div className="flex m-auto gap-x-5 my-[10px]">
          <p className="px-[20px] py-[5px] rounded-xl border-[1px]">SEED</p>
          <p className="px-[20px] py-[5px] rounded-xl border-[1px]">FARMER</p>
          <p className="px-[20px] py-[5px] rounded-xl border-[1px]">FACTORY</p>
        </div>
      </div>
    </div>
  );
}
