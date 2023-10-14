import { Button, Form, Input, Typography } from 'antd';
import React from 'react';

type FieldType = {
  old_password?: string;
  new_password?: string;
  re_new_password?: string;
};
export default function ChangPassword({ className }: { className?: string }) {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={className}>
      <Typography.Title className="w-fit m-auto" level={3}>
        Thay đổi mật khẩu
      </Typography.Title>
      <Form
        name="basic"
        className="mt-[50px]"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
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
          <Input />
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

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className="blovk m-auto" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
