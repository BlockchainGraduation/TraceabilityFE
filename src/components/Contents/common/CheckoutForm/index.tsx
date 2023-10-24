import { useAppSelector } from '@/hooks';
import { Button, Form, FormProps, Input, InputNumber, Typography } from 'antd';
import { CompoundedComponent } from 'antd/es/float-button/interface';
import { ReactNode } from 'react';

export const CheckoutForm = ({ form = {} }: { form?: FormProps }) => {
  const currentUser = useAppSelector((state) => state.user.user);
  return (
    <Form
      className="mt-[20px]"
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 14 }}
      {...form}
    >
      <Typography.Title className="text-center" level={3}>
        Đặt hàng
      </Typography.Title>
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
          min={0}
          max={12}
        />
      </Form.Item>
      <Form.Item
        label="Tên người nhận"
        name={'username'}
        initialValue={currentUser.username}
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
        initialValue={currentUser.phone}
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
  );
};
