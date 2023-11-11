import staticVariables from '@/static';
import { Avatar, Image } from 'antd';
import React from 'react';

export default function CartItem({ active = false }: { active?: boolean }) {
  return (
    <div
      className={`flex items-center space-x-5 rounded-xl p-[10px] hover:bg-[#f6f6f6] ${
        active ? 'bg-[#e9e8e8]' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <Image
          width={70}
          height={70}
          preview={false}
          className="rounded-xl  object-cover"
          alt=""
          src={staticVariables.qc5.src}
        />
      </div>
      <div className="w-5/6 flex items-center justify-between">
        <div className="w-1/2 flex flex-col">
          <p className=" w-full block font-semibold text-[16px] truncate">
            Sau rasssssssssssssssssssssssssssassssssssssinn A
          </p>
          <p className="w-full font-normal text-[14px] truncate">
            Sana aasddddddddddddddddddddddddddddddd
          </p>
          <p className="text-[12px] text-gray-600">Ngay them</p>
        </div>
        <p className="font-bold inline-block pr-[30px]">12.12</p>
      </div>
    </div>
  );
}
