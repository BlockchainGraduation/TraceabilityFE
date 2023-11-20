'use client';
import React, { memo, useEffect, useState } from 'react';
import {
  BookOutlined,
  DesktopOutlined,
  FileOutlined,
  HistoryOutlined,
  HomeOutlined,
  LeftCircleTwoTone,
  LinkOutlined,
  LockOutlined,
  LoginOutlined,
  PieChartOutlined,
  RightCircleTwoTone,
  TeamOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import ChangPassword from '@/components/CMS/ChangePassword';
import ProductCMS from '@/components/CMS/Product';
import TransactionCMS from '@/components/CMS/Transaction';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useRouter } from 'next/navigation';
import ManageUser from '@/components/CMS/Admin/ManageUser';
import ManageProduct from '@/components/CMS/Admin/ManageProduct';
import Statistical from '@/components/CMS/Statistical';
import { useEffectOnce } from 'usehooks-ts';
import { Footer as FooterAntd } from 'antd/es/layout/layout';
import Footer from '@/components/Footer';
import GeneralInformation from '@/components/CMS/GeneralInformation';
import instanceAxios from '@/api/instanceAxios';
import { logOut } from '@/reducers/userSlice';
import { deleteCookie } from 'cookies-next';

const { Header, Content, Sider } = Layout;

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

export default memo(function CMSPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const route = useRouter();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const currentUser = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    setCurrentPage(Number(localStorage.getItem('page')));
  });
  const handleLogout = async () => {
    delete instanceAxios.defaults.headers.common.Authorization;
    dispatch(logOut());
    deleteCookie('access');
    deleteCookie('refresh');
    // router.push('/');
    // setShowModal(true);
    // mutate('user/me');
  };

  ////Render taskbar
  const items: MenuItem[] = [
    getItem(
      <p onClick={() => route.push('/home')}>Home</p>,
      '1',
      <HomeOutlined />
    ),
    getItem(<p>Thống kê</p>, '2', <PieChartOutlined />),
    getItem('Thông tin của bạn', 'sub1', <UserOutlined />, [
      getItem(<p>Thông tin chung</p>, '3', <WalletOutlined />),
      getItem(<p>Đổi mật khẩu</p>, '4', <LockOutlined />),
      getItem(<p>Liên kết</p>, '5', <LinkOutlined />),
    ]),
    !currentUser.user.is_superuser
      ? getItem('Sản phẩm', 'sub2', <TeamOutlined />, [
          getItem(<p>Quản lí sản phâm</p>, '6', <BookOutlined />),
          getItem(<p>Lịch sử giao dịch</p>, '7', <HistoryOutlined />),
        ])
      : null,

    // getItem('Files'

    currentUser.user.is_superuser
      ? getItem('Admin', 'sub3', <TeamOutlined />, [
          // getItem('Thống kê hệ thống', '6'),
          getItem(<p>Quản lí user</p>, '8'),
          // getItem('Quản lí sản phẩm', '8'),
        ])
      : null,
    getItem(<p onClick={handleLogout}>Đăng xuất</p>, '9', <LoginOutlined />),
  ];
  const contents = [
    <></>,
    <Statistical key={1} />,
    <GeneralInformation key={2} />,
    <ChangPassword className="w-2/5 m-auto" key={3} />,
    <></>,
    <ProductCMS key={4} />,
    <TransactionCMS key={5} />,
    currentUser.user.is_superuser
      ? [
          // <div key={6}>asa</div>,
          <ManageUser key={6} />,
          // <ManageProduct key={8} />,
        ]
      : null,
    <></>,
  ];

  return (
    currentUser.logged && (
      <div className="w-full">
        <Layout className="w-full">
          <Sider
            theme="light"
            className="relative h-full"
            // collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <Menu
              theme={'light'}
              defaultSelectedKeys={[currentPage.toString()]}
              mode="inline"
              items={items}
              onSelect={(e) => {
                setCurrentPage(Number(e.key));
                localStorage.setItem('page', e.key);
              }}
            />
            <div
              className="absolute top-0 right-0 translate-x-1/2 py-2 text-[20px]"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <RightCircleTwoTone /> : <LeftCircleTwoTone />}
            </div>
          </Sider>
          <Layout>
            {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
            <Content
            //  style={{ margin: '0 16px' }}
            >
              {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
              <div
                style={{
                  padding: 24,
                  paddingBottom: 50,
                  minHeight: 500,
                  background: colorBgContainer,
                }}
              >
                {contents[currentPage - 1]}
              </div>
            </Content>
            <FooterAntd style={{ textAlign: 'center' }}>
              Tracebility ©2023 Created by SimpRaidenEi
            </FooterAntd>
          </Layout>
        </Layout>
        <Footer />
      </div>
    )
  );
});
