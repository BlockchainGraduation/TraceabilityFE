import instanceAxios from '@/api/instanceAxios';
import { Button, Form, Input, Spin, notification } from 'antd';
import React, { useState } from 'react';

type FieldType = {
  first_name?: string;
  last_name?: string;
  phone?: string;
  username?: string;
  email?: string;
  password?: string;
  remember?: string;
};
export default function RegisterForm({
  nextStep,
}: {
  nextStep: (e?: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  const onFinish = async (data: FieldType) => {
    setLoading(true);
    delete instanceAxios.defaults.headers.common.Authorization;
    await instanceAxios
      .post('register', data)
      .then((res) => {
        nextStep(data.email);
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: 'Xác thực không thành công!!!!!',
        });
      })
      .finally(() => setLoading(false));
  };
  return (
    <div>
      <Form
        className="m-auto"
        name="basic"
        labelCol={{ span: 6 }}
        // wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Tên đăng nhập"
          name="username"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Spin className="m-auto block" spinning={loading} />
          {/* <button
            className="overflow-hidden w-fit px-[20px] h-12  mt-[20px] disabled:bg-gray-200 disabled:text-gray-400 bg-green-500 text-white border-none rounded-xl text-lg font-bold cursor-pointer relative z-10 group"
            type="submit"
          >
            Đăng ký
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"></span>
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-300 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"></span>
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"></span>
            <p className="text-white group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              Đăng ký
            </p>
          </button> */}
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer rounded-xl block m-auto mt-[20px] font-semibold overflow-hidden relative z-100 border border-green-500 group px-8 py-2"
          >
            <span className="relative z-10 text-green-500 group-hover:text-white text-xl duration-500">
              Đăng ký !
            </span>
            <span className="absolute w-full h-full bg-green-500 -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
            <span className="absolute w-full h-full bg-green-500 -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
          </button>
        </Form.Item>
      </Form>
      {/* <Button onClick={nextStep}>OK</Button> */}
    </div>
  );
}
