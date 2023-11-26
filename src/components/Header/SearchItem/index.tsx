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
      href={`/market/${data.id}`}
      className="flex justify-between w-[500px] rounded px-[10px] items-center gap-x-5 py-[10px] pr-[30px] border-t-[1px] bg-[#1212120A] hover:bg-[#ececec] hover:text-inherit"
    >
      <div
        {...parent}
        className={`flex gap-x-5 items-center ${parent.className} `}
      >
        <Avatar size={50} src={data.avatar} />
        <div>
          <p className="text-lg font-medium">{data.name}</p>
          <div className="flex gap-x-2">
            <p className="font-light">Sản phẩm của</p>
            <p className="font-medium">{data.create_by?.fullname}</p>
          </div>
        </div>
        <div className="self-end">Còn {data.quantity}</div>
      </div>
      <div className="">
        {data.price?.toLocaleString()} {currency}
      </div>
    </Link>
  );
}
