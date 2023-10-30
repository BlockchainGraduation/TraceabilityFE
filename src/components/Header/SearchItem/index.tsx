'use client';
import staticVariables from '@/static';
import { Avatar } from 'antd';
import Link from 'next/link';
import React, { HTMLAttributes } from 'react';

export default function SearchItem({
  parent = {},
  productName,
  owner,
  quantity,
  productImage,
  price,
}: {
  parent?: HTMLAttributes<HTMLDivElement>;
  productName?: string;
  productImage?: string;
  owner?: string;
  quantity?: number;
  price?: number;
}) {
  return (
    <Link
      href={'/product/1'}
      className="flex justify-between w-[500px] items-center gap-x-5 py-[10px] pr-[30px] border-t-[1px]"
    >
      <div
        {...parent}
        className={`flex gap-x-5 items-center ${parent.className}`}
      >
        <Avatar size={50} src={productImage} />
        <div>
          <p className="text-lg font-medium">{productName}</p>
          <div className="flex gap-x-2">
            <p className="font-light">Sản phẩm của</p>
            <p className="font-medium">{owner}</p>
          </div>
        </div>
        <div className="self-end">Còn {quantity}</div>
      </div>
      <div className="">{price?.toLocaleString()} VND</div>
    </Link>
  );
}
