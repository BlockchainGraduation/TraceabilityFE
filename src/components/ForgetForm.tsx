import instanceAxios from '@/api/instanceAxios';
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Typography,
  notification,
} from 'antd';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import ConfirmOTP from './ConfirmOTP';

type FieldType = {
  email?: string;
  password?: string;
  otp?: string;
  re_password?: string;
};

export default function ForgetForm({
  onFinishOTP,
}: {
  onFinishOTP: () => void;
}) {
  const [sentMail, setSentMail] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const tNotification = useTranslations('notification');
  const tField = useTranslations('fields');
  const fetchSendMail = async () => {
    setLoading(true);
    await instanceAxios
      .post(`forget`, {
        email,
      })
      .then((res) => setSentMail(true))
      .catch((err) => {
        notification.error({
          message: tNotification('FAILED'),
          description: tNotification(err.response.data.detail),
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="my-[30px]">
      <div className="mb-[50px]">
        <Typography.Title className="text-center" level={3}>
          Đổi mật khẩu
        </Typography.Title>
      </div>
      {!sentMail ? (
        <Form className="px-[20px]" onFinish={fetchSendMail}>
          <Form.Item<FieldType>
            name={'email'}
            label={tField('EMAIL_FIELD')}
            rules={[
              { required: true, message: tNotification('REQUIRED_FIELD') },
              { type: 'email', message: tNotification('EMAIL_INVALID') },
            ]}
          >
            <Input
              onChange={(e) => setEmail(e.target.value)}
              placeholder={tField('EMAIL_PLACEHOLDER_FIELD')}
              type="email"
            />
          </Form.Item>

          <Form.Item>
            <div className="flex items-center gap-x-6	 justify-center">
              <Button loading={loading} htmlType="submit">
                Xác nhận
              </Button>
            </div>
          </Form.Item>
        </Form>
      ) : (
        <ConfirmOTP
          nextStep={() => {
            onFinishOTP();
          }}
          email={email}
        />
      )}
    </div>
  );
}
