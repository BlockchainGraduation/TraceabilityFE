import instanceAxios from '@/api/instanceAxios';
import { useAppSelector } from '@/hooks';
import { faL } from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  ConfigProvider,
  Form,
  FormProps,
  Input,
  InputNumber,
  Typography,
  notification,
} from 'antd';
import { CompoundedComponent } from 'antd/es/float-button/interface';
import { ReactNode, useEffect, useState } from 'react';
import { useEffectOnce } from 'usehooks-ts';

export const CheckoutForm = ({
  form = {},
  producId,
  price,
  quantity,
  buyQuantity = 0,
  cartId,
  onSuccess,
}: {
  form?: FormProps;
  producId: string;
  cartId?: string;
  buyQuantity: number;
  price: number;
  quantity: number;
  onSuccess?: () => void;
}) => {
  const [priceTotal, setPriceTotal] = useState(buyQuantity * price);
  const [valueQuantity, setValueQuantity] = useState(buyQuantity);
  const [loading, setLoading] = useState(false);
  // const [orderType, setOrderType] = useState<'CART' | 'BUY'>('BUY');
  const currentUser = useAppSelector((state) => state.user.user);
  const [useForm] = Form.useForm();
  useEffect(() => {
    setPriceTotal(buyQuantity * price);
    setValueQuantity(buyQuantity);
  }, [buyQuantity, price]);

  const onFinish = async (e: any) => {
    setLoading(true);
    // console.log(e);
    await instanceAxios
      .put(
        `product/${producId}/purchase?price=${priceTotal}&quantity=${valueQuantity}${
          cartId ? `&cart_id=${cartId}` : ``
        }`
      )
      .then((res) => {
        notification.success({
          message: 'Mua hàng thành công',
          description: 'Bạn có thể xem lại đơn hàng ở trang thông tin',
        });
        onSuccess?.();
        useForm.resetFields();
      })
      .catch((err) => {
        notification.error({
          message: 'Mua hàng thất bại',
          description: 'Bạn có thể vui lòng xem lại thông tin',
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Form
      form={useForm}
      className="mt-[20px]"
      labelCol={{ span: 10 }}
      // wrapperCol={{ span: 14 }}
      onFinish={onFinish}
      {...form}
    >
      <Typography.Title className="text-center" level={3}>
        Mua hàng
      </Typography.Title>
      <Form.Item initialValue={valueQuantity} label="Số lượng bán">
        <InputNumber
          addonBefore={'Số lượng'}
          onChange={(e) => {
            setPriceTotal((e || 0) * price);
            setValueQuantity(e || 0);
          }}
          value={valueQuantity}
          min={0}
          max={quantity}
          // formatter={(value) =>
          //   `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          // }
          // disabled
        />
      </Form.Item>
      <Form.Item initialValue={priceTotal} label="Tổng giá trị">
        <ConfigProvider
          theme={{
            components: {
              Input: {},
            },
            token: {
              colorBgContainerDisabled: '#ffffff',
              colorTextDisabled: '#5d5d5d',
            },
          }}
        >
          <InputNumber
            value={priceTotal}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            addonAfter={'USD'}
            disabled
          />
        </ConfigProvider>
      </Form.Item>
      <Form.Item
        label="Tên người nhận"
        name={'username'}
        initialValue={currentUser.username}
        rules={[
          {
            required: true,
            message: 'Please choose your name',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Số điện thoại"
        name={'phone'}
        initialValue={currentUser.phone}
        rules={[
          {
            required: true,
            message: 'Please input your phone number',
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
            message: 'Please input your address',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item className="w-full">
        <div className="w-full flex justify-around items-center">
          {/* <button
            type="submit"
            onClick={() => setOrderType('CART')}
            className="rounded-lg transition relative w-36 h-10 overflow-hidden cursor-pointer flex items-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500"
          >
            <span className="text-white font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300">
              Add Cart
            </span>
            <span className="absolute right-0 h-full w-10 rounded-lg bg-green-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
              <svg
                className="svg w-8 text-white"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="12" x2="12" y1="5" y2="19"></line>
                <line x1="5" x2="19" y1="12" y2="12"></line>
              </svg>
            </span>
          </button> */}
          <button
            // onClick={() => setOrderType('BUY')}
            className="rounded-lg font-semibold transition relative text-white w-36 h-10 overflow-hidden cursor-pointer text-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500"
            disabled={!!!quantity || loading}
            type="submit"
            // loading={loading}
            // htmlType="submit"
          >
            Xác nhận
          </button>
        </div>
      </Form.Item>
    </Form>
  );
};
