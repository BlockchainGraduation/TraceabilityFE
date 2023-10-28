import { useAppDispatch, useAppSelector } from '@/hooks';
import { nextEvent } from '@/reducers/nextEventSlice';
import { setshowFormLogin } from '@/reducers/showFormSlice';
import useLogin from '@/services/requireLogin';
import staticVariables from '@/static';
import { ShoppingCartOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Statistic,
  Tag,
  Typography,
} from 'antd';
import React, { HTMLAttributes, useState } from 'react';
import { CheckoutForm } from '../../common/CheckoutForm';
import instanceAxios from '@/api/instanceAxios';

export default function ProductTodayItem({
  divElement,
  button,
  productName,
  productAvatar,
  ownerId,
  ownerName,
  soldQuantity,
  transactionQuantity,
}: {
  divElement?: HTMLAttributes<HTMLDivElement>;
  button?: HTMLAttributes<HTMLButtonElement>;
  productName?: string;
  ownerName?: string;
  productAvatar?: string;
  ownerId?: string;
  soldQuantity?: number;
  transactionQuantity?: number;
}) {
  const dispatch = useAppDispatch();
  const logged = useAppSelector((state) => state.user.logged);
  const [showModalPay, setShowModalPay] = useState(false);
  const [buyOrCart, setBuyOrCart] = useState<'BUY' | 'CART'>('BUY');
  const { login } = useLogin();
  const handleSubmit = (e: any) => {
    buyOrCart === 'BUY' ? alert('Buy') : alert('CART');
  };
  const handleShowModalPay = () => {
    setBuyOrCart('CART');
    setShowModalPay(true);
  };

  return (
    <div
      {...divElement}
      className="flex p-[20px] h-fit justify-between w-[600px] "
    >
      <Image
        className="object-cover rounded"
        alt=""
        width={200}
        height={200}
        src={productAvatar}
      />
      <div className="w-3/5 py-[10px]">
        <Typography.Title className="text-center border-[1px]" level={3}>
          {productName}
        </Typography.Title>
        <div className="flex mb-[10px] gap-x-3 font-thin text-base">
          Sản phẩm của<p className="text-[#313064] font-medium">{ownerName}</p>
        </div>
        <div className="flex justify-between pl-[20px] pr-[50px]">
          <Statistic title="Sold" value={soldQuantity} />
          <Statistic title="Transaction" value={transactionQuantity} />
        </div>
        <div className="flex items-center mt-[10px]">
          <Button
            onClick={() => {
              login(() => setShowModalPay(true));
              // logged
              //   ? setShowModalPay(true)
              //   : login(() => setShowModalPay(true));
            }}
            className="w-full block shadow-[0px_12px_10px_-8px_rgba(133,189,215,0.8784313725)]"
          >
            Buy now
          </Button>
          <Button
            onClick={() => {
              login(handleShowModalPay);
              // logged ? setShowModalPay(true) : login(handleShowModalPay);
              // dispatch(
              //   nextEvent({
              //     requireLogin: handleShowModalPay,
              //   })
              // );
              // dispatch(setshowFormLogin({ showFormLogin: true }));
            }}
            className="flex items-center shadow-[0px_12px_10px_-8px_rgba(133,189,215,0.8784313725)]"
          >
            <ShoppingCartOutlined />
          </Button>
        </div>
        <Modal
          centered
          open={showModalPay}
          onCancel={() => setShowModalPay(false)}
          footer={[]}
        >
          <div className="flex flex-col">
            <Typography.Title className="text-center" level={3}>
              Đặt hàng
            </Typography.Title>
            <Typography.Title className="text-center" level={4}>
              Sầu riêng
            </Typography.Title>
            <div className="block m-auto">
              <Image
                width={300}
                height={250}
                className=" object-cover rounded "
                alt=""
                src={staticVariables.logoRaiden.src}
              />
            </div>
            <div className="w-2/3 mt-[20px] border-[1px] p-[20px] rounded">
              <div className="flex w-full justify-between items-center">
                <Typography.Text>Sản phẩm của</Typography.Text>
                <Typography.Text>ABC</Typography.Text>
              </div>
              <div className="flex w-full justify-between items-center">
                <Typography.Text>Đơn giá 123.000</Typography.Text>
                <Typography.Text>ABC</Typography.Text>
              </div>
              <div className="flex w-full justify-between items-center">
                <Typography.Text>Số lượng còn 123</Typography.Text>
                <Typography.Text>ABC</Typography.Text>
              </div>
            </div>
            <Typography.Title className="border-b-[1px] my-[20px]" level={4}>
              Thông tin đặt hàng
            </Typography.Title>
            <CheckoutForm producId={''} price={0} quantity={10} />
          </div>
        </Modal>
      </div>
    </div>
  );
}
