'use client';
import staticVariables from '@/static';
import { Avatar } from 'antd';
import Link from 'next/link';
import React, { HTMLAttributes } from 'react';

export default function SearchItem(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <Link
      href={'/product/1'}
      className="flex justify-between w-[500px] items-center gap-x-5 py-[10px] pr-[30px] border-b-[1px]"
    >
      <div
        {...props}
        className={`flex gap-x-5 items-center ${props.className}`}
      >
        <Avatar size={50} src={staticVariables.logoRaiden.src} />
        <div>
          <p className="text-lg font-medium">Sầu riêng thái</p>
          <div className="flex gap-x-2">
            <p className="font-light">Sản phẩm của</p>
            <p className="font-medium">SimpRaiden</p>
          </div>
        </div>
        <div className="self-end">Còn 50</div>
      </div>
      <div className="">500.000 VND</div>
    </Link>
  );
}
