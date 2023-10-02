'use client';
import staticVariables from '@/static';
import { CustomerServiceOutlined, MessageOutlined } from '@ant-design/icons';
import { Avatar, Drawer, FloatButton, Input, Tag } from 'antd';
import Meta from 'antd/es/card/Meta';
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
        <div className="flex items-center">
          <Avatar src={staticVariables.logoRaiden.src} />
          <div className="pl-[10px]">
            <Meta title={'Ong A'} />
            <Tag>Fammer</Tag>
          </div>
        </div>
        <div className="flex items-center">
          <Avatar src={staticVariables.logoRaiden.src} />
          <div className="pl-[10px]">
            <Meta title={'Ong A'} />
            <Tag>Fammer</Tag>
          </div>
        </div>
        <div className="flex items-center">
          <Avatar src={staticVariables.logoRaiden.src} />
          <div className="pl-[10px]">
            <Meta title={'Ong A'} />
            <Tag>Fammer</Tag>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
