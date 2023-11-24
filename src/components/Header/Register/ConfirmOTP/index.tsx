import instanceAxios from '@/api/instanceAxios';
import { useAppDispatch } from '@/hooks';
import { setLogin } from '@/reducers/userSlice';
import { Button, Form, Input, Spin, notification } from 'antd';
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

        nextStep?.();
        // notification.success({
        //   message: tNotification('SUCCESS'),
        //   description: tNotification('SUCCESS_REGISTER'),
        // });
        // route.replace('/home');
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
          <Spin className="m-auto block" spinning={loading} />
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer rounded-xl block m-auto mt-[20px] text-green-500 font-semibold overflow-hidden relative z-100 border disabled:bg-gray-300 disabled:border-gray-500  border-green-500 group px-8 py-2"
          >
            <span
              className={`relative z-10 ${
                loading ? 'text-gray-500' : 'text-green-500'
              } group-hover:text-white text-xl duration-500`}
            >
              Đăng ký !
            </span>
            <span className="absolute w-full h-full bg-green-500 -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
            <span className="absolute w-full h-full bg-green-500 -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
          </button>
        </Form.Item>
      </Form>
    </div>
  );
}
