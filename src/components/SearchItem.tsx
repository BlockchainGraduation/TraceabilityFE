'use client';
import currency from '@/services/currency';
import staticVariables from '@/static';
import { Avatar } from 'antd';
import Link from 'next/link';
import React, { HTMLAttributes } from 'react';

export default function SearchItem({
  parent = {},
  data,
}: {
  parent?: HTMLAttributes<HTMLDivElement>;
  data: ProductType;
}) {
  return (
    <Link
      href={`/product/${data.id}`}
      className="flex justify-between w-[600px] rounded px-[10px] items-center gap-x-5 py-[10px] pr-[30px] border-t-[1px] bg-[#1212120A] hover:bg-green-100 hover:border hover:border-green-600 hover:text-inherit"
    >
      <div
        {...parent}
        className={`flex w-full  items-center ${parent.className} `}
      >
        <div className="w-2/3 flex space-x-5 pr-[30px]">
          <div>
            <Avatar
              size={50}
              src={data.avatar || staticVariables.noImage.src}
            />
          </div>
          <div className="w-4/5">
            <p className="text-lg w-full font-medium truncate">{data.name}</p>
            <div className="flex w-full gap-x-2">
              <p className="font-light">Sản phẩm của</p>
              <p className="font-medium w-2/5 truncate">
                {data.create_by?.fullname}
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/3 flex justify-between">
          <div className="flex items-baseline gap-x-1 ">
            <p className="text-[12px] text-[#808080] font-medium">Còn</p>
            <p className="text-[20px] font-semibold text-[#272727]">
              {data.quantity}
            </p>
          </div>
          <div className="flex items-baseline gap-x-1 ">
            <p className="text-[12px] text-[#808080] font-medium">Giá</p>
            <p className="text-[20px] font-semibold text-[#272727]">
              {data.price?.toLocaleString()}
            </p>
            <p className="text-[12px] text-current-color font-medium">
              {currency}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
