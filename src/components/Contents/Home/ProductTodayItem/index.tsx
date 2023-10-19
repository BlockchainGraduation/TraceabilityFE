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

export default function ProductTodayItem({
  props,
  button,
}: {
  props?: HTMLAttributes<HTMLDivElement>;
  button?: HTMLAttributes<HTMLButtonElement>;
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
    <div {...props} className="flex p-[20px] h-fit justify-between w-[600px]">
      <Image
        className="object-cover rounded"
        alt=""
        width={200}
        height={200}
        src={staticVariables.logoRaiden.src}
      />
      <div className="w-3/5 py-[10px]">
        <Typography.Title level={3}>Bad private</Typography.Title>
        <div className="flex mb-[10px] gap-x-3 font-thin text-base">
          Sản phẩm của<p className="text-[#313064] font-medium">SimpRaiden</p>
        </div>
        <div className="flex justify-between pr-[50px]">
          <Statistic title="Sold " value={112893} />
          <Statistic title="Transaction" value={112893} />
        </div>
        <div className="flex items-center mt-[10px]">
          <Button
            onClick={() => {
              login(() => setShowModalPay(true));
              // logged
              //   ? setShowModalPay(true)
              //   : login(() => setShowModalPay(true));
            }}
            className="w-full block "
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
            className="flex items-center"
          >
            <ShoppingCartOutlined />
          </Button>
        </div>
        <Modal
          open={showModalPay}
          onCancel={() => setShowModalPay(false)}
          footer={[]}
        >
          <div className="flex flex-col">
            <Typography.Title className="text-center" level={3}>
              Mua hàng
            </Typography.Title>
            <Typography.Title className="text-center" level={5}>
              Sầu riêng tokuda
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
            <Form
              className="mt-[20px]"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
              onFinish={handleSubmit}
            >
              <Form.Item
                label="Số lượng bạn muốn mua"
                name={'quatity'}
                rules={[
                  {
                    required: true,
                    message: 'Please choose your product quantity',
                  },
                ]}
              >
                <InputNumber
                  addonBefore={'Số lượng'}
                  addonAfter={<div onClick={() => alert('OK')}>Max</div>}
                  max={12}
                />
              </Form.Item>
              <Form.Item
                label="Tên người nhận"
                name={'username'}
                initialValue={'Nguyen van A'}
                rules={[
                  {
                    required: true,
                    message: 'Please choose your address',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name={'phone'}
                initialValue={'12312312312312'}
                rules={[
                  {
                    required: true,
                    message: 'Please choose your address',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Địa chỉ nhận hàng"
                name={'address'}
                rules={[
                  {
                    required: true,
                    message: 'Please choose your address',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                <Button htmlType="submit">Submit</Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    </div>
  );
}
