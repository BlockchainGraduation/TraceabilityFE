'use client';
import instanceAxios from '@/api/instanceAxios';
import ProductItem from '@/components/Contents/Home/ProductItem';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import staticVariables from '@/static';
import {
  PlayCircleFilled,
  RightCircleFilled,
  RightCircleTwoTone,
} from '@ant-design/icons';
import {
  faHandSparkles,
  faShieldHeart,
  faShuffle,
  faSoap,
  faTruckFast,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Carousel, Image } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import useSWR from 'swr';
import { LeftArrow, RightArrow } from './components/Category';
import { useAppSelector } from '@/hooks';

export default function HomePage() {
  const [currentListType, setCurrentListType] = useState<
    'DISTRIBUTER' | 'FACTORY' | 'RETAILER'
  >('FACTORY');
  const [listProduct, setListProduct] = useState<ProductType[]>([]);
  const [loadingPage, setLoadingPage] = useState(true);
  const currentUser = useAppSelector((state) => state.user.user);
  const ref = useRef();
  // const fetchListProduct = useCallback(async () => {
  //   await instanceAxios
  //     .get(`product/`)
  //     .then((res) => setListProduct(res.data.results || []))
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  const fetchFilterProduct = useCallback(async () => {
    await instanceAxios
      .get(`filter-product/?product_type=${currentListType}`)
      .then((res) => setListProduct(res.data.results || []))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoadingPage(false));
  }, [currentListType]);
  useEffect(() => {
    fetchFilterProduct();
  }, [fetchFilterProduct]);
  // useSWR(`fetchLisProduct`, fetchListProduct);

  const listIntroduct = [
    {
      icon: (
        <FontAwesomeIcon
          size={'2x'}
          icon={faTruckFast}
          style={{ color: '#3f76d5' }}
        />
      ),
      label: 'HỆ THỐNG TOÀN QUỐC',
      content: 'Ai ai cũng có thể sử dụng dịch vụ của chúng tôi trên toàn quốc',
    },
    {
      icon: (
        <FontAwesomeIcon
          size={'2x'}
          icon={faShieldHeart}
          style={{ color: '#3f76d5' }}
        />
      ),
      label: 'AN TOÀN',
      content: 'Chất lượng sản phẩm được đảm bảo hơn khi áp dụng blockchain',
    },
    {
      icon: (
        <FontAwesomeIcon
          size={'2x'}
          icon={faSoap}
          style={{ color: '#3f76d5' }}
        />
      ),
      label: 'MINH BẠCH',
      content: 'Thông tin minh bạch hơn với việc lưu trữ trên blockchain',
    },
    {
      icon: (
        <FontAwesomeIcon
          size={'2x'}
          icon={faHandSparkles}
          style={{ color: '#3f76d5' }}
        />
      ),
      label: 'DỄ DÀNG',
      content: 'Mọi thao tác mua bán trên hệ thống đều rất dễ dàng',
    },
    {
      icon: (
        <FontAwesomeIcon
          size={'2x'}
          icon={faShuffle}
          style={{ color: '#3f76d5' }}
        />
      ),
      label: 'NGUỒN GỐC RÕ RÀNG',
      content: 'Dễ dàng truy xuất được nguồn gốc khi sản phẩm có vấn đề',
    },
  ];
  const listSlide = [
    {
      img: staticVariables.shrimp3.src,
      title: 'FACTORY',
      label: 'Nhà máy chế biến',
      content: `Vai trò của nhà máy chế biến là chuyển đổi nguyên liệu đầu vào thành sản phẩm thành phẩm thông qua quá trình chế biến...`,
    },
    {
      img: staticVariables.shrimp2.src,
      title: 'DISTRIBUTER',
      label: 'Nhà phân phối',
      content: `Nhà phân phối đóng vai trò quan trọng trong quá trình cung ứng và phân phối sản phẩm từ nhà sản xuất đến người tiêu dùng cuối cùng....`,
    },
    {
      img: staticVariables.shrimp1.src,
      title: 'RETAILER',
      label: 'Nhà bán lẻ',
      content: ` Nhà bán lẻ (Retailer) đóng một vai trò quan trọng trong chuỗi cung ứng và phân phối sản phẩm từ nhà sản xuất đến người tiêu dùng...`,
    },
  ];
  return (
    !loadingPage && (
      <div className="w-full">
        <Header />
        <div className="w-full pt-[100px]">
          <Carousel
            swipe
            swipeToSlide={true}
            waitForAnimate
            className="w-full h-[450px] bg-[#f5f5f5]"
            autoplay
          >
            {listSlide.map((item, index) => (
              <div
                key={index}
                className="h-[450px] select-none cursor-pointer px-[200px]"
              >
                <div className="w-full h-full flex">
                  <div
                    // data-aos="fade-right"
                    // data-aos-duration="1000"
                    // data-aos-anchor-placement="center-center"
                    // data-aos-mirror="true"
                    className="w-1/2 my-auto flex flex-col font-sans"
                  >
                    <p
                      data-aos="fade-right"
                      data-aos-duration="1000"
                      data-aos-delay="200"
                      data-aos-mirror="true"
                      className="text-[48px] font-semibold "
                    >
                      {item.title}
                    </p>
                    <p
                      data-aos="fade-right"
                      data-aos-duration="1000"
                      data-aos-delay="400"
                      data-aos-mirror="true"
                      className="text-[36px] font-light"
                    >
                      {item.label}
                    </p>
                    <p
                      data-aos="fade-right"
                      data-aos-duration="1000"
                      data-aos-delay="600"
                      data-aos-mirror="true"
                      className="text-[16px] "
                    >
                      {item.content}
                    </p>
                  </div>
                  <div className="w-1/2 my-auto">
                    <Image
                      className="object-cover"
                      width={'100%'}
                      // height={'100%'}
                      alt=""
                      preview={false}
                      src={item.img || staticVariables.noImage.src}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        <div className="w-full flex flex-wrap px-[200px] my-[50px] gap-5 justify-around">
          {listIntroduct.map((item, index) => (
            <div key={index} className="w-3/12 flex items-center space-x-5">
              {item.icon}
              <div className="font-sans">
                <p className="text-[16px]">{item.label}</p>
                <p className="text-[13px]">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col">
          <p className="m-auto text-[32px] font-extralight">
            Sản phẩm đang bán chạy
          </p>
          <div className="flex m-auto gap-x-5 cursor-pointer my-[10px]">
            <p
              onClick={() => setCurrentListType('FACTORY')}
              className={`px-[20px] py-[5px] ${
                currentListType === 'FACTORY' && 'bg-current-color text-white'
              }  rounded-xl border-[1px]`}
            >
              NHÀ MÁY CHẾ BIẾN
            </p>
            <p
              onClick={() => setCurrentListType('DISTRIBUTER')}
              className={`px-[20px] py-[5px] ${
                currentListType === 'DISTRIBUTER' &&
                'bg-current-color text-white'
              }  rounded-xl border-[1px]`}
            >
              NHÀ PHÂN PHỐI
            </p>
            <p
              onClick={() => setCurrentListType('RETAILER')}
              className={`px-[20px] py-[5px] ${
                currentListType === 'RETAILER' && 'bg-current-color text-white'
              }  rounded-xl border-[1px]`}
            >
              NHÀ BÁN LẺ
            </p>
          </div>
        </div>
        <div className="w-4/5 m-auto my-[50px]">
          {listProduct.length ? (
            <ScrollMenu
              Footer={[]}
              noPolyfill
              wrapperClassName="w-full w-fit px-[10px] mb-[30px] "
              scrollContainerClassName="mx-[20px]"
              itemClassName="m-[20px]"
              LeftArrow={LeftArrow}
              RightArrow={RightArrow}
            >
              {listProduct.map((item, index) => (
                <ProductItem key={index} data={item} />
              ))}
            </ScrollMenu>
          ) : (
            ''
          )}
        </div>
        <div className="w-4/5 m-auto flex space-x-5">
          <div className="w-1/2 flex bg-[#f5f5f5] p-[20px]">
            <div className="w-1/2 flex flex-col items-center justify-center">
              <p className="text-[20px] font-semibold">Nhà máy chế biến</p>
              <div className="flex space-x-3 items-center">
                <p>TÌM KIẾM NGAY </p>
                <PlayCircleFilled />
              </div>
            </div>
            <div className="w-1/2 my-auto">
              <Image
                className="object-cover my-auto"
                width={'100%'}
                // height={'100%'}
                alt=""
                preview={false}
                src={staticVariables.shrimp2.src}
              />
            </div>
          </div>
          <div className="w-1/2 flex  bg-[#f5f5f5] p-[20px]">
            <div className="w-1/2 flex flex-col items-center justify-center">
              <p className="text-[20px] font-semibold">Nhà phân phối</p>
              <div className="flex space-x-3 items-center">
                <p>TÌM KIẾM NGAY</p>
                <PlayCircleFilled />
              </div>
            </div>
            <div className="w-1/2">
              <Image
                className="object-fill"
                width={'100%'}
                height={'100%'}
                alt=""
                preview={false}
                src={staticVariables.shrimp3.src}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col mt-[50px]">
          <p className="m-auto text-[32px] font-extralight">
            Bán chạy tháng nay
          </p>
        </div>
        <div className="w-4/5 flex flex-wrap justify-center gap-10 m-auto my-[50px]">
          {listProduct.map((item, index) => (
            <ProductItem
              style="detail"
              isOwner={currentUser.id === item.create_by?.id}
              className="bg-[#f5f5f5]"
              key={index}
              data={item}
            />
          ))}
        </div>
        <div className="w-full items-center flex h-[400px] bg-[#f5f5f5] px-[150px] font-sans">
          <div className="w-1/2 flex flex-col">
            <p className="text-[20px] text-current-color">
              BEST SALE PRODUCT!!
            </p>
            <p className="text-[46px] font-semibold">TOP SALE PRODUCT</p>
            <p className="text-[28px] text-[#222222]">ALL VEGETABLE PRODUCTS</p>
            <button className="flex w-1/2  m-auto my-[50px] items-center justify-center space-x-3 py-[10px] px-[15px] rounded-xl bg-current-color text-white">
              <p>VISIT NOW </p>
              <RightCircleFilled />
            </button>
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
        <div></div>
        <Footer />
      </div>
    )
  );
}
