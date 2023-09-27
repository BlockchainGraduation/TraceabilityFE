'use client'
import { Button, Form, Input } from 'antd';
import React from 'react';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export default function Login() {
  return (
    <div>
      <p className='my-[30px] text-3xl font-normal block text-center'>Đăng nhập</p>
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

        <Form.Item  wrapperCol={{ offset: 10, span: 16 }}>
          <Button className='mt-[30px] bg-[#1677ff]' type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      
    </div>
  );
}
// export const  getServerSideProps =async () => {
// }