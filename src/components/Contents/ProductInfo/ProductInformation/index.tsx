import { Col, Row } from 'antd';
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
      <p className="my-[30px] tracking-wider">{data?.description}</p>
    </div>
  );
}
