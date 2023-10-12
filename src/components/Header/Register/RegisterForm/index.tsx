import { Button, Form, Input } from 'antd';
import React from 'react';

export default function RegisterForm({ nextStep }: { nextStep: () => void }) {
  type FieldType = {
    first_name?: string;
    last_name?: string;
    phone?: string;
    username?: string;
    email?: string;
    password?: string;
    remember?: string;
  };
  return (
    <div>
      <p className="text-center text-3xl my-[50px]">Đăng ký</p>
      <Form
        className="m-auto"
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Họ"
          name="first_name"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Tên"
          name="last_name"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true, message: 'Please input your phone!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
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

        <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
          <Button
            className="mt-[30px] bg-[#1677ff]"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* <Button onClick={nextStep}>OK</Button> */}
    </div>
  );
}
