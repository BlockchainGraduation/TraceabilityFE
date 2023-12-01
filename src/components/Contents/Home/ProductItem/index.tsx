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
  message,
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import useLogin from '@/services/requireLogin';
import CommentItem from '../../ProductInfo/CommentItem';
import CommentInput from '../../common/CommentInput';
import instanceAxios from '@/api/instanceAxios';
import useSWR, { mutate } from 'swr';
import currency from '@/services/currency';
import staticVariables from '@/static';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/hooks';
import { useTranslations } from 'next-intl';

const { Meta } = Card;

export default function ProductItem({
  style = 'default',
  isOwner = false,
  data,
  className,
}: {
  isOwner?: boolean;
  style?: 'default' | 'detail';
  data: ProductType;
  className?: string;
}) {
  const route = useRouter();
  const currentUser = useAppSelector((state) => state.user.user);
  const tNotification = useTranslations('notification');

  const fetchAddCart = async () => {
    await instanceAxios
      .post(`cart/`, { product_id: data.id })
      .then((res) => {
        message.success('Đã thêm vào giỏ hàng');
        mutate('cart-me');
      })
      .catch((err) => {
        message.warning(tNotification(err.response.data.detail));
      });
  };

  return (
    <div
      data-aos="flip-right"
      className={`w-[250px] group bg-white  rounded-xl overflow-hidden font-sans ${className}`}
    >
      <div className="w-full relative">
        <Image
          className="object-cover"
          preview={false}
          width={'100%'}
          height={200}
          alt=""
          src={data.avatar || staticVariables.noImage.src}
        />
        {style === 'detail' && (
          <div className="absolute flex items-center justify-center rounded-xl bg-[#40a944] top-0 w-2/5 left-1/2 -translate-x-1/2 border-2 invisible  px-[10px] py-[5px] group-hover:transition-all group-hover:opacity-100 opacity-0	 group-hover:duration-500 group-hover:translate-y-1/2 group-hover:visible duration-500  ">
            <p className="text-center text-white">{data.product_type}</p>
          </div>
        )}
        {currentUser.id !== data.create_by?.id && (
          <div className="absolute rounded-xl bg-white bottom-0 w-3/5 left-1/2 -translate-x-1/2 border-2 invisible flex justify-between px-[10px] py-[5px] group-hover:transition-all group-hover:opacity-100 opacity-0	 group-hover:duration-500 group-hover:-translate-y-1/2 group-hover:visible duration-500  ">
            <Tooltip title={'Add cart'}>
              <ShoppingCartOutlined
                onClick={fetchAddCart}
                className="rounded-full hover:bg-green-500 p-[5px]"
              />
            </Tooltip>
            <Tooltip title={'Visit'}>
              <SearchOutlined
                onClick={() => route.push(`product/${data.id}`)}
                className="rounded-full hover:bg-green-500 p-[5px]"
              />
            </Tooltip>
            <Tooltip title={'Favourite'}>
              <HeartOutlined className="rounded-full hover:bg-green-500 p-[5px]" />
            </Tooltip>
            <Tooltip title={'Share'}>
              <ShareAltOutlined className="rounded-full hover:bg-green-500 p-[5px]" />
            </Tooltip>
          </div>
        )}
      </div>
      <div className="w-full ">
        <Link href={`/product/${data.id}`}>
          <p className="text-center font-semibold truncate p-[10px] pb-0">
            {data.name}
          </p>
          <div className="w-full flex items-center py-[10px] px-[20px]">
            <div className="w-1/2 flex space-x-1 text-current-color ">
              <p className="font-semibold text-[10px]">{currency}</p>
              <p className="truncate">{data.price}/Kg</p>
            </div>
            <div className="w-1/2 flex space-x-1 text-current-color ">
              <p className="font-semibold text-[10px]">Kg</p>
              <p className="truncate">{data.quantity}</p>
            </div>
          </div>
        </Link>
        {!isOwner && (
          <div className="flex items-center space-x-3 ">
            <div>
              <Avatar
                src={data.create_by?.avatar || staticVariables.noImage.src}
              />
            </div>
            <p className="text-[12px]">{data.create_by?.fullname}</p>
          </div>
        )}
      </div>
    </div>
  );
}
