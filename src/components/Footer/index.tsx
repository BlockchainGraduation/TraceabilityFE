'use client';
import staticVariables from '@/static';
import { CustomerServiceOutlined, MessageOutlined } from '@ant-design/icons';
import { Avatar, Drawer, FloatButton, Input } from 'antd';
import React, { useState } from 'react';

export default function Footer() {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <div>
      <FloatButton
        shape="square"
        type="primary"
        onClick={() => setOpenDrawer(true)}
        style={{ right: 24 }}
        icon={<MessageOutlined />}
      />
      <Drawer
        title="Messenger"
        placement="right"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <Input />
        <p>
          <Avatar src={staticVariables.logoRaiden.src} /> ong A
        </p>
        <p>
          <Avatar src={staticVariables.logoRaiden.src} /> ong B
        </p>
        <p>
          <Avatar src={staticVariables.logoRaiden.src} /> ong C
        </p>
      </Drawer>
    </div>
  );
}
