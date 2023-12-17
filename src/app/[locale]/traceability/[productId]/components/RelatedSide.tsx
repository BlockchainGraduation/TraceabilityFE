import staticVariables from '@/static';
import { Avatar, Image } from 'antd';
import React, { ReactNode } from 'react';
import TagItem from './TagItem';
import { SearchOutlined } from '@ant-design/icons';

export default function RelatedSide({
  leftItem,
  rightItem,
  data,
}: {
  leftItem?: ReactNode;
  rightItem?: ReactNode;
  data?: ProductType;
}) {
  return (
    <div className="w-full flex p-[10px] gap-x-3 justify-between">
      <div className="w-1/2 flex flex-col">
        <p className="w-full font-bold my-[10px] max-sm:text-[12px] m-auto text-center bg-gray-100 border border-gray-500 rounded-lg">
          Sản phẩm
        </p>
        <div className="w-full mx-auto">
          <Image
            width={'100%'}
            height={'100%'}
            alt=""
            preview={false}
            className="object-cover border rounded-2xl"
            src={data?.avatar || staticVariables.noImage.src}
          />
        </div>
        <div className="w-full mt-[20px]">{leftItem}</div>
      </div>
      <div className="w-1/2">
        <p className="m-auto font-bold my-[10px] max-sm:text-[12px] text-center bg-gray-100 border border-gray-500 rounded-lg">
          Cửa hàng
        </p>
        <div className="w-2/3 block mx-auto">
          <Avatar
            alt=""
            size={70}
            src={data?.create_by?.avatar || staticVariables.noImage.src}
          />
        </div>
        <div className="w-full mt-[20px]">{rightItem}</div>
      </div>
    </div>
  );
}
