import instanceAxios from '@/api/instanceAxios';
import { useAppSelector } from '@/hooks';
import currency from '@/services/currency';
import unit from '@/services/unit';
import staticVariables from '@/static';
import { faL } from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  ConfigProvider,
  Form,
  FormProps,
  Image,
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
  data,
  buyQuantity = 0,
  cartId,
  onSuccess,
}: {
  form?: FormProps;
  producId?: number;
  cartId?: string;
  buyQuantity: number;
  price?: number;
  quantity?: number;
  data?: ProductType;
  onSuccess?: () => void;
}) => {
  const [priceTotal, setPriceTotal] = useState(buyQuantity * data?.price);
  const [valueQuantity, setValueQuantity] = useState(buyQuantity);
  const [loading, setLoading] = useState(false);
  // const [orderType, setOrderType] = useState<'CART' | 'BUY'>('BUY');
  const currentUser = useAppSelector((state) => state.user.user);
  const [loadingBuy, setLoadingBuy] = useState(false);

  const [useForm] = Form.useForm();
  useEffect(() => {
    setPriceTotal(buyQuantity * data?.price);
    setValueQuantity(buyQuantity);
  }, [buyQuantity, data?.price]);

  const onFinish = async (e: any) => {
    if (valueQuantity === 0) {
      notification.error({
        message: 'Thông báo',
        description: 'Vui lòng chọn số lượng',
      });
    } else {
      setLoadingBuy(true);
      await instanceAxios
        .post('transaction', {
          quantity: valueQuantity,
          price: buyQuantity * data?.price,
          product_id: data?.id,
        })
        .then((res) => {
          notification.success({
            message: 'Thông báo',
            description: 'Mua hàng thành công',
          });
          setValueQuantity(0);
          setPriceTotal(0);
          onSuccess?.();
        })
        .catch((err) =>
          notification.error({
            message: 'Thông báo',
            description: 'Mua hàng thất bại',
          })
        )
        .finally(() => setLoadingBuy(false));
    }
  };

  return (
    <div className="w-full flex gap-x-10 p-[10px]">
      <div className="w-1/2 flex flex-col gap-y-5">
        <div className="w-full h-1/2 rounded-xl p-[20px] bg-[#f6f6f6]">
          <Image
            className="object-cover rounded-xl"
            width={'100%'}
            height={'100%'}
            preview={false}
            alt=""
            src={data?.avatar || staticVariables.noImage.src}
          />
        </div>
        <div className="w-full rounded-xl p-[20px]  bg-[#f6f6f6]">
          <p className="text-[24px] py-[20px] font-semibold">{data?.name}</p>
          <div className="w-full flex items-center border-b-2 justify-between">
            <p className="text-[18px]">Giá bán hiện tại</p>
            <div className="flex gap-x-5">
              <div className="flex gap-x-2">
                <p className="text-[12px] font-semibold text-current-color">
                  {currency}
                </p>
                <div className="flex gap-x-2">
                  <p className="text-[30px] font-semibold text-[#4b4b4b]">
                    {data?.price}
                  </p>
                  <p className="text-[30px] font-extralight ">/ {unit}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-between">
            <p className="text-[18px]">Số lượng hiện còn</p>
            <div className="flex gap-x-5">
              <div className="flex gap-x-2">
                <p className="text-[30px] font-semibold text-[#4b4b4b]">
                  {data?.quantity}
                </p>
                <p className="text-[30px] font-extralight">{unit}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 rounded-xl bg-[#f6f6f6] p-[30px] ">
        <p className="text-center text-[30px] font-semibold">Mua hàng</p>
        <Form
          form={useForm}
          layout={'vertical'}
          className="mt-[20px]  "
          // labelCol={{ span: 10 }}
          // wrapperCol={{ span: 14 }}
          onFinish={onFinish}
          {...form}
        >
          <Form.Item initialValue={valueQuantity} label="Số lượng bán">
            <InputNumber
              addonBefore={'Số lượng'}
              onChange={(e) => {
                setPriceTotal((e || 0) * data?.price);
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
                  `${currency} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                addonAfter={currency}
                disabled
              />
            </ConfigProvider>
          </Form.Item>
          <Form.Item
            label="Tên người nhận"
            name={'username'}
            initialValue={currentUser.fullname}
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
            initialValue={currentUser.geographical_address}
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
              <Button
                // onClick={() => setOrderType('BUY')}
                className="rounded-lg font-semibold transition relative text-white w-36 h-10 overflow-hidden cursor-pointer text-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500"
                disabled={!!!data?.quantity || loading}
                // type="submit"
                loading={loadingBuy}
                htmlType="submit"
              >
                Xác nhận
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
