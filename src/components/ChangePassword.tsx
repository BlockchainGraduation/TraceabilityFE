import instanceAxios from '@/api/instanceAxios';
import { useAppSelector } from '@/hooks';
import staticVariables from '@/static';
import { Avatar, Button, Form, Input, Typography, notification } from 'antd';
import React, { useState } from 'react';

type FieldType = {
  old_password?: string;
  new_password?: string;
  re_new_password?: string;
};
export default function ChangPassword({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false);
  const currentUser = useAppSelector((state) => state.user.user);
  const [form] = Form.useForm();
  const onFinish = async (data: FieldType) => {
    setLoading(true);
    await instanceAxios
      .post(`reset-password`, data)
      .then((res) => {
        notification.success({
          message: 'Thông báo',
          description: 'Đổi mật khẩu thành công',
        });
        form.resetFields();
      })
      .catch((err) =>
        notification.error({
          message: 'Thông báo',
          description: 'Đổi mật khẩu thất bại',
        })
      )
      .finally(() => setLoading(false));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={className}>
      <Typography.Title className="w-fit m-auto" level={3}>
        Thay đổi mật khẩu
      </Typography.Title>
      <div className="flex flex-col items-center">
        <Avatar
          size={100}
          src={currentUser.avatar || staticVariables.noImage.src}
        />
        <p className="font-medium text-[20px]">{currentUser.fullname}</p>
      </div>
      <Form
        form={form}
        name="basic"
        className="mt-[50px]"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Old Password"
          name="old_password"
          rules={[
            { required: true, message: 'Please input your Old Password!' },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="New Password"
          name="new_password"
          rules={[
            { required: true, message: 'Please input your New Password!' },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<FieldType>
          label="Pre New Password"
          name="re_new_password"
          rules={[
            { required: true, message: 'Please input your Pre New Password!' },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button loading={loading} className="block m-auto" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
