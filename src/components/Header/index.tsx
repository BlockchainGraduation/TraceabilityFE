'use client';
import staticVariables from '@/static';
import { ConfigProvider, Image, Modal, Select } from 'antd';
import Link from 'next/link';
import React, { ChangeEvent, memo, useEffect, useState } from 'react';
import Login from './Login';
import Register from './Register';
import { usePathname as pathLanguage, useRouter } from 'next-intl/client';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export default memo(function Header() {
  const [user, setUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentForm, setCurrentForm] = useState<
    'LOGIN' | 'REGISTER' | 'FORGET'
  >('LOGIN');
  const [dataHeader, setDataHeader] = useState({});
  const [dataRoute, setDataRoute] = useState({});

  const router = useRouter();
  const t = useTranslations('header');
  const pathname = pathLanguage();
  const path = usePathname();
  const locale = useLocale();
  function handleChangeLanguage() {
    router.replace(pathname, { locale: locale === 'vi' ? 'en' : 'vi' });
  }
  const isHomePage = path === '/' + (locale === 'vi' ? '' : locale);
  useEffect(() => {
    // Sử dụng hàm async IIFE để lấy dữ liệu từ tệp dịch vụ (JSON)
    const fetchData = async () => {
      try {
        const messages = (await import(`../../../messages/${locale}.json`))
          .default;
        setDataHeader(messages.header);
        setDataRoute(messages.header.route); // Lưu trữ dữ liệu vào state
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        setDataHeader({}); // Xử lý lỗi nếu cần thiết
        setDataRoute({});
      }
    };

    fetchData();
  }, [locale]);
  return (
    <div
      className={`w-full ${
        isHomePage && 'text-white'
      } fixed z-10 flex items-center justify-between backdrop-blur-[50px] pl-5 pr-10 height-fit bg-transparent`}
    >
      <Link href={'/'}>
        <Image
          width={50}
          height={50}
          preview={false}
          className={`object-cover`}
          src={staticVariables.logoRaiden.src}
          alt=""
        />
      </Link>
      <div className={`flex`}>
        {Object.keys(dataRoute).map((key, index) => (
          <Link
            key={index}
            className={`py-3 px-10 hover:scale-125 hover:border-b-[1px]`}
            href={`/${key}`}
          >
            <p className={`text-inherit`}>{t(`route.${key}`)}</p>
          </Link>
        ))}
        {/* <Link
          className={`py-3 px-10 hover:scale-125 hover:border-b-[1px]`}
          href={'/'}
        >
          <p className={`text-inherit`}>Trang chủ</p>
        </Link>
        <Link
          className={`py-3 px-10 hover:scale-125 hover:border-b-[1px]`}
          href={'/home'}
        >
          <p className={`text-inherit`}>Nhật kí</p>
        </Link>
        <Link
          className={`py-3 px-10 hover:scale-125 hover:border-b-[1px]`}
          href={'/hitory'}
        >
          <p className={`text-inherit`}>Sản phẩm</p>
        </Link>
        <Link
          className={`py-3 px-10 hover:scale-125 hover:border-b-[1px]`}
          href={'/hitory'}
        >
          <p className={`text-inherit`}>Hỗ trợ</p>
        </Link> */}
      </div>
      <div className="flex items-center">
        <ConfigProvider
          theme={{
            token: {
              colorText: `${isHomePage && 'white'}`,
              colorBgElevated: `${isHomePage && '#262626DB'}`,
            },
            components: {
              Select: { controlItemBgActive: `${isHomePage && '#111126CE'}` },
            },
          }}
        >
          <Select
            defaultValue={locale}
            style={{ width: 120 }}
            onChange={handleChangeLanguage}
            bordered={false}
            className="select-language text-inherit"
            options={[
              { value: 'vi', label: 'Việt Nam' },
              { value: 'en', label: 'English' },
            ]}
          />
        </ConfigProvider>
        {user ? (
          <div>User</div>
        ) : (
          <div
            className={`text-inherit'} cursor-pointer`}
            onClick={() => setShowModal(true)}
          >
            Đăng nhập
          </div>
        )}
      </div>
      <Modal
        open={showModal}
        width={currentForm === 'REGISTER' ? 1000 : 520}
        className={``}
        centered
        onCancel={() => setShowModal(false)}
        footer={[]}
      >
        {currentForm === 'LOGIN' && <Login />}
        {currentForm === 'REGISTER' && <Register />}
        <div className="flex justify-around	">
          <p>Forget?</p>
          <p
            onClick={() =>
              currentForm === 'LOGIN'
                ? setCurrentForm('REGISTER')
                : setCurrentForm('LOGIN')
            }
          >
            {currentForm === 'LOGIN' ? 'Register' : 'Login'}
          </p>
        </div>
      </Modal>
    </div>
  );
});
