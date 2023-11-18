import {
  EditOutlined,
  EllipsisOutlined,
  HeartOutlined,
  LikeOutlined,
  MessageOutlined,
  SearchOutlined,
  SettingOutlined,
  ShareAltOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Card,
  ConfigProvider,
  Empty,
  Image,
  Modal,
  Space,
  Statistic,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import useLogin from '@/services/requireLogin';
import CommentItem from '../../ProductInfo/CommentItem';
import CommentInput from '../../common/CommentInput';
import instanceAxios from '@/api/instanceAxios';
import useSWR from 'swr';
import currency from '@/services/currency';
import staticVariables from '@/static';

const { Meta } = Card;

export default function ProductItem({
  style = 'default',
  data,
}: {
  style?: 'default' | 'detail';
  data: ProductType;
}) {
  return (
    <div data-aos="flip-right" className="w-[250px] group font-sans">
      <div className="w-full relative bg-[#f8f8f8]">
        <Image
          className="object-cover"
          preview={false}
          width={'100%'}
          height={200}
          alt=""
          src={data.avatar}
        />
        {style === 'detail' && (
          <div className="absolute flex items-center justify-center rounded-xl bg-[#40a944] top-0 w-2/5 left-1/2 -translate-x-1/2 border-2 invisible  px-[10px] py-[5px] group-hover:transition-all group-hover:opacity-100 opacity-0	 group-hover:duration-500 group-hover:translate-y-1/2 group-hover:visible duration-500  ">
            <p className="text-center text-white">{data.product_type}</p>
          </div>
        )}
        <div className="absolute rounded-xl bg-white bottom-0 w-3/5 left-1/2 -translate-x-1/2 border-2 invisible flex justify-between px-[10px] py-[5px] group-hover:transition-all group-hover:opacity-100 opacity-0	 group-hover:duration-500 group-hover:-translate-y-1/2 group-hover:visible duration-500  ">
          <Tooltip title={'Add cart'}>
            <ShoppingCartOutlined className="rounded-full hover:bg-green-500 p-[5px]" />
          </Tooltip>
          <Tooltip title={'Visit'}>
            <SearchOutlined className="rounded-full hover:bg-green-500 p-[5px]" />
          </Tooltip>
          <Tooltip title={'Favourite'}>
            <HeartOutlined className="rounded-full hover:bg-green-500 p-[5px]" />
          </Tooltip>
          <Tooltip title={'Share'}>
            <ShareAltOutlined className="rounded-full hover:bg-green-500 p-[5px]" />
          </Tooltip>
        </div>
      </div>
      <div className="w-full">
        <p className="text-center truncate p-[10px] pb-0">{data.name}</p>
        <div className="w-full flex items-center p-[10px] ">
          <div className="w-1/2 flex space-x-1 text-current-color ">
            <p className="font-semibold text-[10px]">{currency}</p>
            <p className="truncate">{data.price}/Kg</p>
          </div>
          <div className="w-1/2 flex space-x-1 text-current-color ">
            <p className="font-semibold text-[10px]">Kg</p>
            <p className="truncate">{data.quantity}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 ">
          <div>
            <Avatar src={data.create_by?.avatar} />
          </div>
          <p className="text-[12px]">{data.create_by?.fullname}</p>
        </div>
      </div>
    </div>
  );
}
