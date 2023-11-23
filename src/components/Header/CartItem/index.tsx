import instanceAxios from '@/api/instanceAxios';
import { useAppSelector } from '@/hooks';
import currency from '@/services/currency';
import unit from '@/services/unit';
import staticVariables from '@/static';
import {
  DeleteTwoTone,
  MinusSquareTwoTone,
  PlusSquareTwoTone,
} from '@ant-design/icons';
import { Avatar, Image, Input, InputNumber, message } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

export default function CartItem({
  active = false,
  data,
  onDeleteSuccess,
  onChangeBuyQuantity,
}: {
  active?: boolean;
  data: CartItemType;
  onDeleteSuccess?: () => void;
  onChangeBuyQuantity?: (value?: any, index?: number) => void;
}) {
  const [isHover, setIsHover] = useState(false);
  const [buyQuantity, setBuyQuantity] = useState(
    data.product_id?.quantity ? 1 : 0
  );

  useEffect(() => {
    onChangeBuyQuantity?.(buyQuantity);
  }, [buyQuantity]);

  const fetchDeleteCart = async () => {
    await instanceAxios
      .delete(`cart/${data.id}/delete`)
      .then((res) => {
        message.success('Đã xóa cart');
        onDeleteSuccess?.();
      })
      .catch((err) => {
        message.error('Xoá cart thất bại');
      });
  };
  return (
    <div
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`flex w-full group select-none items-center transition space-x-5 rounded-xl p-[10px] bg-[#f6f6f6] hover:bg-[#ebebeb] ${
        active ? 'bg-[#dedede]' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <Image
          width={70}
          height={70}
          preview={false}
          className="rounded-xl  object-cover"
          alt=""
          src={data.product_id?.avatar || staticVariables.noImage.src}
        />
      </div>
      <div className="w-full relative flex items-center justify-between">
        <div className="w-1/2 flex items-center">
          <div className="flex w-2/3 flex-col">
            <p className=" font-semibold text-[16px] truncate">
              {data.product_id?.name}
            </p>
            <p className="font-normal text-[13px] py-[5px] truncate">
              {data.product_id?.create_by?.fullname}
            </p>
            <p className=" text-[10px] text-gray-600">
              {`Đã thêm vào ${moment(data.product_id?.create_at).format(
                'lll'
              )}`}
            </p>
          </div>
          <div className="w-1/3 text-[20px] font-semibold">
            <p>
              {data.product_id?.price || ''} {currency}
            </p>
          </div>
        </div>
        <div className="w-2/6 flex flex-col items-center">
          <div className="w-full space-x-3 flex justify-center">
            <MinusSquareTwoTone
              onClick={() =>
                setBuyQuantity(buyQuantity ? buyQuantity - 1 : buyQuantity)
              }
              className="text-[20px]"
            />
            <InputNumber
              min={0}
              max={data.product_id?.quantity}
              onChange={(e) => {
                setBuyQuantity(e || 0);
              }}
              value={buyQuantity}
            />
            <PlusSquareTwoTone
              onClick={() =>
                setBuyQuantity(
                  buyQuantity >= data.product_id?.quantity
                    ? buyQuantity
                    : buyQuantity + 1
                )
              }
              className="text-[20px]"
            />
          </div>
          <div className="text-center">
            Sản phẩm hiện còn {data.product_id?.quantity} {unit}
          </div>
        </div>
        <div className="w-1/6 font-bold relative pr-[30px]">
          <p className="truncate">
            Tổng : {`${data.product_id?.price * buyQuantity || 0} ${currency}`}
          </p>
          {/* {isHover && ( */}
          <DeleteTwoTone
            className="absolute top-1/2 right-0 -translate-y-1/2 z-500 invisible opacity-0 transition-all duration-500  group-hover:opacity-100 group-hover:right-7 group-hover:visible"
            onClick={fetchDeleteCart}
          />
          {/* )} */}
        </div>
      </div>
    </div>
  );
}
