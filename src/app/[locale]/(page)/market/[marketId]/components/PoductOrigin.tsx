import staticVariables from '@/static';
import { Avatar, Button, Image } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  originType: 'seed' | 'provider';
  id?: string;
  product_id?: string;
  transaction_sf_id?: string;
  product?: {
    id?: string;
    product_type?: string;
    product_status?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    banner?: string;
    created_by?: string;
    created_at?: string;
    user?: {
      id?: string;
      avatar?: string;
      username?: string;
      email?: string;
    };
  };
  transactions?: {
    id?: string;
    product_id?: string;
    user_id?: string;
    price?: number;
    quantity?: number;
    created_at?: string;
    updated_at?: string;
    product?: {
      id?: string;
      product_type?: string;
      product_status?: string;
      name?: string;
      description?: string;
      price?: number;
      quantity?: number;
      banner?: number;
      created_by?: number;
      created_at?: number;
      user?: {
        id?: string;
        avatar?: string;
        username?: string;
        email?: string;
      };
    };
  };
}

export default function ProductOrigin(props: Props) {
  const route = useRouter();
  return (
    <div className="w-full mt-[30px] border-[1px] border-current-color">
      <p className="text-center p-[20px] bg-current-color text-3xl text-white">
        {props.originType === 'seed'
          ? ' Nguồn gốc hạt giống'
          : 'Nguồn cung cấp'}
      </p>
      <div className="w-full flex">
        <div className="relative w-1/2">
          <Image
            className="object-cover"
            // width={400}
            // height={500}
            preview={false}
            alt=""
            src={props.product?.banner}
          />
          <p className="absolute top-0 translate-x-[-50%] left-1/2 w-fit bg-current-color text-xl text-white py-[10px] px-[30px] rounded-b">
            {props.originType === 'seed' ? ' Con giống' : 'Sản phẩm'}
          </p>
        </div>
        <div className="w-1/2 flex flex-col items-center">
          <p className="bg-current-color text-xl text-white py-[10px] px-[30px] rounded-b">
            Nguồn cung cấp
          </p>
          <Avatar size={200} src={props.transactions?.product?.user?.avatar} />
          <p className="text-xl text-[#262626] p-[10px]">
            {props.transactions?.product?.user?.username}
          </p>
          <p>
            Giao dịch được thực hiện vào ngày{' '}
            {moment(props.transactions?.created_at).format('DD/MM/YYYY')}
          </p>
          <div>
            <Button>Xem giao dịch</Button>
            <Button
              onClick={() =>
                route.push(`/market/${props.transactions?.product?.id}`)
              }
            >
              Ghé thăm gian hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
