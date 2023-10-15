'use client';
import { useAppDispatch } from '@/hooks';
import { initialUser, setLogin } from '@/reducers/userSlice';
import { Button, Form, Input, notification } from 'antd';
import { title } from 'process';
import React from 'react';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export default function Login({ onFinish }: { onFinish: () => void }) {
  const dispatch = useAppDispatch();
  return (
    <div>
      <p className="my-[30px] text-3xl font-normal block text-center">
        Đăng nhập
      </p>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button
            onClick={() => {
              dispatch(setLogin({ logged: true, user: initialUser }));
              onFinish();
              notification.success({
                message: 'Thông báo',
                description: 'Xin chào simpraidenei',
              });
            }}
            className="mt-[30px] bg-[#1677ff]"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
// export const  getServerSideProps =async () => {
// }
