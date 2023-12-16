'use client';
import staticVariables from '@/static';
import {
  faSkype,
  faSquareFacebook,
  faSquareInstagram,
  faTelegram,
} from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Drawer, Input, Tag } from 'antd';
import Meta from 'antd/es/card/Meta';
import Link from 'next/link';
import { memo, useState } from 'react';

export default memo(function Footer() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const informationList = [
    {
      icon: (
        <FontAwesomeIcon
          size={'2xl'}
          icon={faPhone}
          style={{ color: '#5e5e5e' }}
        />
      ),
      label: 'Số điện thoại',
      value: '01231231',
    },
    {
      icon: (
        <FontAwesomeIcon
          size={'2xl'}
          icon={faEnvelope}
          style={{ color: '#5e5e5e' }}
        />
      ),
      label: 'Email',
      value: 'duongtrungqb12@gmail.com',
    },
    {
      icon: (
        <FontAwesomeIcon
          size={'2xl'}
          icon={faLocationDot}
          style={{ color: '#5e5e5e' }}
        />
      ),
      label: 'Địa chỉ văn phòng',
      value: '14 Doãn Uẩn - Khuê Mỹ - Ngũ Hành Sơn - Đà Nẵng',
    },
  ];
  return (
    <div
      // data-aos="fade-left"
      // data-aos-offset="200"
      // data-aos-delay="50"
      // data-aos-duration="1500"
      // data-aos-easing="ease-in-out"
      className="w-full overflow-x-hidden p-[50px] px-[100px] "
    >
      <div className="mx-auto flex items-center justify-between border-b-2 py-[20px]">
        <div className="w-1/5 flex flex-col ">
          <p className="font-semibold text-[20px]">Liên hệ với tôi</p>
          <p>Vui lòng liên hệ từ 8:00 - 16:00</p>
        </div>
        {informationList.map((item, index) => (
          <div key={index} className="flex items-center gap-x-3">
            <div>{item.icon}</div>
            <div className="flex flex-col ">
              <p className=" text-[14px]">{item.label}</p>
              <p className="font-semibold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between py-[20px]">
        <p className="text-black">@ Design by SimpRaidenEi</p>
        <div className="flex items-center gap-x-3">
          <FontAwesomeIcon
            size="2x"
            icon={faSquareFacebook}
            style={{ color: '#5e5e5e' }}
          />
          <FontAwesomeIcon
            size="2x"
            icon={faTelegram}
            style={{ color: '#5e5e5e' }}
          />
          <FontAwesomeIcon
            size="2x"
            icon={faSkype}
            style={{ color: '#5e5e5e' }}
          />
          <FontAwesomeIcon
            size="2x"
            icon={faSquareInstagram}
            style={{ color: '#5e5e5e' }}
          />
        </div>
        <div className="flex gap-x-3 text-black">
          <Link href={'/home'}>Trang chủ</Link>
          <Link href={'/product'}>Sản phẩm</Link>
        </div>
      </div>
    </div>
  );
});
