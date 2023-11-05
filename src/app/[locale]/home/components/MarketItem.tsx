import currency from '@/services/currency';
import { ConfigProvider, Image, Statistic } from 'antd';
import Link from 'next/link';
import React from 'react';

export default function MarketItem(props: ProductType) {
  return (
    <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ">
      <Link className="hover:text-inherit" href={`/market/${props.id}`}>
        <div className="relative w-[250px] flex flex-col mx-[20px] rounded-2xl overflow-hidden shadow-2xl">
          <Image
            width={250}
            height={150}
            preview={false}
            className="rounded object-cover"
            alt=""
            src={props.banner}
          />
          <p className="w-full text-center font-bold truncate px-[15px] p-[10px] text-[16px]">
            {props.name}
          </p>
          <div className="w-full flex justify-between px-[20px] pb-[10px]">
            <ConfigProvider
              theme={{
                components: {
                  Statistic: {
                    titleFontSize: 14,
                    contentFontSize: 16,
                  },
                },
              }}
            >
              <Statistic
                className="font-semibold"
                title="Số lượng"
                value={props.quantity}
              />
              <Statistic
                className="font-semibold"
                title="Giá"
                value={props.price}
                suffix={currency}
              />
            </ConfigProvider>
          </div>
        </div>
      </Link>
    </div>
  );
}
