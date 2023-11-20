import instanceAxios from '@/api/instanceAxios';
import { useAppDispatch } from '@/hooks';
import { setLogin } from '@/reducers/userSlice';
import { Button, Form, Input, notification } from 'antd';
import { setCookie } from 'cookies-next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type FormType = {};
export default function ConfirmOTP({
  nextStep,
  email,
}: {
  nextStep: () => void;
  email: string;
}) {
  const [loading, setLoading] = useState(false);
  const tNotification = useTranslations('notification');
  const tField = useTranslations('fields');
  const dispatch = useAppDispatch();
  const route = useRouter();

  const fethRegister = async (data: FormType) => {
    setLoading(true);
    await instanceAxios
      .post(`confirmOTP`, {
        email,
        ...data,
      })
      .then((res) => {
        dispatch(setLogin({ logged: true, user: res.data.user as UserType }));
        setCookie('access', res.data.token.access);
        setCookie('refresh', res.data.token.refresh);
        instanceAxios.defaults.headers.common.Authorization = `Bearer ${res.data.token.access}`;
        notification.success({
          message: tNotification('WELCOME'),
          description: `${tNotification('WELCOME')} ${res.data.user.username}`,
        });
        // notification.success({
        //   message: tNotification('SUCCESS'),
        //   description: tNotification('SUCCESS_REGISTER'),
        // });
        route.replace('/home');
      })
      .catch((err) => {
        notification.error({
          message: tNotification('FAILED'),
          description: tNotification('FAILED_REGISTER'),
        });
      })
      .finally(() => setLoading(false));
  };
  return (
    <div>
      <Form
        className="m-auto"
        name="basic"
        // labelCol={{ span: 6 }}
        // wrapperCol={{ span: 16 }}
        style={{ maxWidth: 400 }}
        initialValues={{ remember: true }}
        onFinish={fethRegister}
        onFinishFailed={() => console.log('OK')}
        autoComplete="off"
      >
        <Form.Item<FormType>
          label={tField('OTP_FIELD')}
          name="otp"
          rules={[
            { required: true, message: tNotification('REQUIRED_OTP') },
            {
              min: 6,
              max: 6,
              message: `${tNotification('FIXED_LENGTH')} 6 ${tNotification(
                'TEXT_FINAL'
              )}`,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FormType>
          label={tField('PASSWORD_FIELD')}
          name="password"
          rules={[
            { required: true, message: tNotification('REQUIRED_FIELD') },
            {
              min: 6,
              max: 15,
              message: `${tNotification('FIXED_LENGTH')} 6-15 ${tNotification(
                'TEXT_FINAL'
              )}`,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<FormType>
          label={tField('RE_PASSWORD_FIELD')}
          name="re_password"
          rules={[
            { required: true, message: tNotification('REQUIRED_FIELD') },
            // {
            //   min: 6,
            //   max: 15,
            //   message: `${tNotification('FIXED_LENGTH')} 6-15 ${tNotification(
            //     'TEXT_FINAL'
            //   )}`,
            // },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(tNotification('RE_PASSWORD_NOT_SAME'))
                );
              },
            }),
          ]}
        >
          <Input.Password autoComplete="on" />
        </Form.Item>

        <Form.Item>
          <button
            disabled={loading}
            className="overflow-hidden w-fit px-[20px] h-12 block m-auto mt-[20px] bg-green-500 text-white border-none rounded-xl text-lg font-bold cursor-pointer relative z-10 group"
            type="submit"
          >
            Xác nhận
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"></span>
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-300 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"></span>
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"></span>
            <p className="text-white group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              Xác nhận
            </p>
          </button>
        </Form.Item>
      </Form>
    </div>
  );
}
