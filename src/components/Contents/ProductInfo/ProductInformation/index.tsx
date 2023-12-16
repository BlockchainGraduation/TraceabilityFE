import staticVariables from '@/static';
import { Col, Image, Row } from 'antd';
import Link from 'next/link';
import React from 'react';

export default function ProductInformation({ data }: { data?: ProductType }) {
  const listInfomation = [
    {
      label: 'Tên sản phẩm',
      content: data?.name,
    },
    {
      label: 'Giá bán mỗi đơn vị',
      content: data?.price,
    },
    {
      label: 'Số lượng bán',
      content: data?.quantity,
    },
    {
      label: 'Loại sản phẩm',
      content: data?.product_type,
    },
    {
      label: 'Chủ sản phẩm',
      content: data?.create_by?.fullname,
    },
    {
      label: 'Email',
      content: data?.create_by?.email,
    },
    {
      label: 'Số điện thoại',
      content: data?.create_by?.phone,
    },
    {
      label: 'Địa chỉ ví',
      content: data?.create_by?.wallet_address,
    },
  ];
  return (
    <div className="w-full m-auto font-sans">
      <div className="w-full flex">
        <div className="w-3/4">
          {listInfomation.map((item, index) => (
            <Row key={index} className=" border-b-[1px]">
              <Col span={8} className="border-r-[1px] px-[20px] py-[5px]">
                <p className="font-semibold">{item.label}</p>
              </Col>
              <Col span={16} className="px-[20px] py-[5px]">
                <p>{item?.content}</p>
              </Col>
            </Row>
          ))}
        </div>
        <div className="w-1/4 p-[10px]">
          <Image
            width={'100%'}
            alt=""
            preview={false}
            src={staticVariables.blochain.src}
            className="object-cover"
          />
          <Link
            href={`${process.env.NEXT_PUBLIC_BLOCKCHAIN_URL}${data?.tx_hash}`}
            className="bg-gray-100 w-fit block m-auto border border-gray-300 text-gray-700 px-[20px] py-[5px] rounded-lg"
          >
            Xem block
          </Link>
        </div>
      </div>
      <p className="my-[30px] tracking-wider p-[20px] rounded-xl bg-[#f6f6f6]">
        {data?.description}
      </p>
    </div>
  );
}
