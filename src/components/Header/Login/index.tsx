'use client';
import instanceAxios from '@/api/instanceAxios';
import { useAppDispatch } from '@/hooks';
import { User, initialUser, setLogin } from '@/reducers/userSlice';
import { Button, Form, Input, notification } from 'antd';
import { setCookie } from 'cookies-next';
import { title } from 'process';
import React from 'react';
import { useSWRConfig } from 'swr';

type FieldType = {
  email?: string;
  username?: string;
  password?: string;
  remember?: string;
};

export default function Login({ onFinish }: { onFinish: () => void }) {
  const dispatch = useAppDispatch();
  const { mutate } = useSWRConfig();

  const fethLogin = async (data: object) => {
    await instanceAxios
      .post('auth/login', data)
      .then((res) => {
        mutate('marketplace/list');
        dispatch(setLogin({ logged: true, user: res.data.data.user as User }));
        onFinish();
        setCookie('access_token', res.data.data.access_token);
        notification.success({
          message: 'Thông báo',
          description: `Xin chào ${res.data.data.user.username}`,
        });
      })
      .catch((err) => console.log(err));
  };
  // const fethGetUser = async () => {
  //   await instanceAxios
  //     .get('user/me', {
  //       headers: {
  //         Authorization: `Bearer ${access}`,
  //       },
  //     })
  //     .then((res) => {
  //       dispatch(setLogin({ logged: true, user: res.data }));
  //       onFinish();
  //       notification.success({
  //         message: 'Thông báo',
  //         description: 'Xin chào simpraidenei',
  //       });
  //       console.log(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // };
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
        onFinish={fethLogin}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="email"
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
            onClick={() => {}}
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
