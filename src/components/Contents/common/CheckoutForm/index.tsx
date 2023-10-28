import instanceAxios from '@/api/instanceAxios';
import { useAppSelector } from '@/hooks';
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
import { ReactNode, useState } from 'react';

export const CheckoutForm = ({
  form = {},
  producId,
  price,
  quantity,
  onSuccess,
}: {
  form?: FormProps;
  producId: string;
  price: number;
  quantity: number;
  onSuccess?: () => void;
}) => {
  const [priceTotal, setPriceTotal] = useState(price);
  const currentUser = useAppSelector((state) => state.user.user);
  const [useForm] = Form.useForm();

  const onFinish = async (e: any) => {
    await instanceAxios
      .put(
        `product/${producId}/purchase?price=${priceTotal}&quantity=${e.quantity}`
      )
      .then((res) => {
        notification.success({
          message: 'Mua hàng thành công',
          description: 'Bạn có thể xem lại đơn hàng ở trang thông tin',
        });
        onSuccess?.();
        useForm.resetFields();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Form
      form={useForm}
      className="mt-[20px]"
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 14 }}
      onFinish={onFinish}
      {...form}
    >
      <Typography.Title className="text-center" level={3}>
        Mua hàng
      </Typography.Title>
      <Form.Item
        label="Số lượng bạn muốn mua"
        name={'quantity'}
        initialValue={1}
        rules={[
          {
            required: true,
            message: 'Please choose your product quantity',
          },
        ]}
      >
        <InputNumber
          addonBefore={'Số lượng'}
          onChange={(e) => setPriceTotal(Number(e) * price)}
          // addonAfter={<div onClick={(e) => alert('OK')}>Max</div>}
          min={1}
          max={quantity}
        />
      </Form.Item>
      <Form.Item label="Tổng giá trị" name={'price'}>
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
      <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
        <Button htmlType="submit">Xác nhận</Button>
      </Form.Item>
    </Form>
  );
};
