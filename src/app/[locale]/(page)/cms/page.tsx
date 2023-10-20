'use client';
import React, { useEffect, useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import GeneralInformation from '@/components/CMS/GeneralInformation';
import ChangPassword from '@/components/CMS/ChangePassword';
import ProductCMS from '@/components/CMS/Product';
import TransactionCMS from '@/components/CMS/Transaction';
import { useAppSelector } from '@/hooks';
import { useRouter } from 'next/navigation';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Thống kê', '0', <PieChartOutlined />),
  // getItem('Option 2', '2', <DesktopOutlined />),
  getItem('Thông tin của bạn', 'sub1', <UserOutlined />, [
    getItem('Thông tin chung', '1'),
    getItem('Đổi mật khẩu', '2'),
    getItem('Liên kết', '3'),
  ]),
  getItem('Sản phẩm', 'sub2', <TeamOutlined />, [
    getItem('Quản lí sản phâm', '4'),
    getItem('Lịch sử giao dịch', '5'),
  ]),
  getItem('Files', '6', <FileOutlined />),
];
const contents = [
  <div key={1}>Content1</div>,
  <GeneralInformation key={2} />,
  <ChangPassword className="w-2/5 m-auto" key={3} />,
  <></>,
  <ProductCMS key={4} />,
  <TransactionCMS key={5} />,
];

export default function CMSPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('0');
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const currentUser = useAppSelector((state) => state.user);
  const route = useRouter();
  useEffect(() => {
    if (!currentUser.logged) {
      route.push('/home');
    }
  }, [currentUser.logged, route]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme={'light'}
          defaultSelectedKeys={[currentPage]}
          mode="inline"
          items={items}
          onSelect={(e) => setCurrentPage(e.key.toString())}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            style={{
              padding: 24,
              minHeight: 500,
              background: colorBgContainer,
            }}
          >
            {contents[Number(currentPage)]}
            Bill is a cat.
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
}
