import currency from '@/services/currency';
import staticVariables from '@/static';
import { Avatar, Col, Image, Row } from 'antd';
import React from 'react';
interface Props {
  listTopSelling: TopSellingType[];
  skip?: number;
}
export default function LeaderBoard(props: Props) {
  return (
    <div className="w-full">
      <Row className="text-[14px] border-b-2 py-[20px]">
        <Col span={2}>Rank</Col>
        <Col span={14}>Sản phẩm</Col>
        <Col span={4}>Transaction</Col>
        <Col span={4}>
          <p className="float-right">Doanh thu</p>
        </Col>
      </Row>
      {props.listTopSelling.map((item, index) => (
        <Row
          key={index}
          className="py-[20px] text-[16px] text-[#121212] font-semibold transition ease-in-out  hover:-translate-y-1 hover:scale-105 duration-300 "
          align={'middle'}
        >
          <Col span={2}>
            <p className="text-[16px]">{(props.skip || 0) + index + 1}</p>
          </Col>
          <Col span={14}>
            <div className="flex items-center gap-x-5">
              <div className="w-fit">
                <Image
                  preview={false}
                  className="object-cover rounded-xl border-[1px]"
                  alt=""
                  width={70}
                  height={70}
                  src={staticVariables.qc4.src}
                />
              </div>
              <p className="text-[16px] leading-6 pr-[50px] truncate">
                {item.Product?.name}
              </p>
            </div>
          </Col>
          <Col span={4}>
            <p className="text-[16px] text-[#121212] truncate">
              {`${item.total_quantity} GD`}
            </p>
          </Col>
          <Col span={4}>
            <p className="text-[16px] text-right pl-[20px] truncate">{`${item.total_sales} ${currency}`}</p>
          </Col>
        </Row>
      ))}
    </div>
  );
}
