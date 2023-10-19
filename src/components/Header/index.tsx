'use client';
import staticVariables from '@/static';
import {
  Avatar,
  Badge,
  ConfigProvider,
  Dropdown,
  Image,
  Input,
  InputNumber,
  MenuProps,
  Modal,
  Popover,
  Select,
  message,
} from 'antd';
import Link from 'next/link';
import { deleteCookie, getCookie } from 'cookies-next';
import React, { ChangeEvent, memo, useEffect, useRef, useState } from 'react';
import Login from './Login';
import Register from './Register';
import { usePathname as pathLanguage, useRouter } from 'next-intl/client';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks';
import useSWR from 'swr';
import { LogoutOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightFromBracket,
  faCartShopping,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { logOut, setLogin } from '@/reducers/userSlice';
import SearchItem from './SearchItem';
import useOutsideAlerter from '@/services/eventOutside';
import instanceAxios from '@/api/instanceAxios';
import { setshowFormLogin } from '@/reducers/showFormSlice';

export default memo(function Header() {
  const [user, setUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSearchItems, setShowSearchItems] = useState(false);
  const [currentForm, setCurrentForm] = useState<
    'LOGIN' | 'REGISTER' | 'FORGET'
  >('LOGIN');
  const [dataHeader, setDataHeader] = useState({});

  const router = useRouter();
  const t = useTranslations('header');
  const pathname = pathLanguage();
  const path = usePathname();
  const locale = useLocale();
  const logged = useAppSelector((state) => state.user.logged);
  const currentUser = useAppSelector((state) => state.user.user);
  const showFormLogin = useAppSelector((state) => state.showForm.showFormLogin);
  const dispatch = useAppDispatch();

  const isHomePage = path === '/' + (locale === 'vi' ? '' : locale);
  useEffect(() => {
    // Sử dụng hàm async IIFE để lấy dữ liệu từ tệp dịch vụ (JSON)
    const fetchData = async () => {
      try {
        const messages = (await import(`../../../messages/${locale}.json`))
          .default;
        setDataHeader(messages.header);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        setDataHeader({}); // Xử lý lỗi nếu cần thiết
      }
    };

    fetchData();
  }, [locale]);
  useEffect(() => {
    if (showFormLogin) {
      setCurrentForm('LOGIN');
      setShowModal(true);
    }
  }, [showFormLogin]);

  useEffect(() => {
    const fethGetUser = async () => {
      await instanceAxios
        .get('user/me')
        .then((res) => {
          dispatch(setLogin({ logged: true, user: res.data.data }));
        })
        .catch((err) => console.log(err));
    };
    fethGetUser();
  }, [dispatch]);

  const handleChangeLanguage = () => {
    router.replace(pathname, { locale: locale === 'vi' ? 'en' : 'vi' });
  };
  const onFinishOTP = () => {
    setCurrentForm('LOGIN');
  };
  const handleShowModal = () => {
    setShowModal(false);
  };
  const handleLogout = () => {
    dispatch(logOut());
    deleteCookie('access_token');
    setShowModal(true);
    setCurrentForm('LOGIN');
    const access = getCookie('access_token');
    instanceAxios.defaults.headers.delete.Authorization = `Bearer ${access}`;
  };
  useEffect(() => {
    setUser(logged);
  }, [logged]);
  const ref = useRef(null);
  useOutsideAlerter(ref, () => setShowSearchItems(false));
  const items: MenuProps['items'] = [
    {
      label: (
        <Link href={'/user/1'}>
          <FontAwesomeIcon className="mr-[10px]" icon={faUser} />
          Thong tin
        </Link>
      ),
      key: '0',
    },
    {
      label: (
        <div>
          <FontAwesomeIcon className="mr-[10px]" icon={faCartShopping} />
          Gio hang
        </div>
      ),
      key: '1',
    },
    {
      label: (
        <Link href={'/cms'}>
          <FontAwesomeIcon className="mr-[10px]" icon={faUser} />
          Quản lí
        </Link>
      ),
      key: '2',
    },
    {
      label: currentUser.is_active ? (
        <Link href={'/cms'}>
          <FontAwesomeIcon className="mr-[10px]" icon={faUser} />
          Đăng kí thành viên
        </Link>
      ) : (
        ''
      ),
      key: '3',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <div onClick={handleLogout}>
          <FontAwesomeIcon
            className="mr-[10px]"
            icon={faArrowRightFromBracket}
          />
          Logout
        </div>
      ),
      key: '4',
    },
  ];
  return (
    <div
      className={`w-full ${
        isHomePage && 'text-white'
      } fixed z-10 flex items-center justify-between backdrop-blur-[50px] pl-5 pr-10 height-fit bg-transparent`}
    >
      <Link href={'/'}>
        <Image
          width={40}
          height={40}
          preview={false}
          className={`object-cover`}
          src={staticVariables.logoRaiden.src}
          alt=""
        />
      </Link>
      <div className={`flex`}>
        {Object.keys((dataHeader as any).route || {}).map((key, index) => (
          <Link
            key={index}
            className={`py-[15px] px-10 rounded hover:-translate-y-1 hover:scale-110 duration-300 hover:border-b-[1px] `}
            href={`/${key}`}
          >
            <p className={`text-inherit`}>{t(`route.${key}`)}</p>
          </Link>
        ))}
      </div>
      <div className="relative w-1/3">
        <Popover
          title="Danh sach tim kiem"
          className="w-full"
          content={
            <div ref={ref}>
              {[...Array(5)].map((_, index) => (
                <SearchItem
                  onClick={() => setShowSearchItems(false)}
                  key={index}
                />
              ))}
            </div>
          }
          open={showSearchItems}
          // trigger={'focus'}
          placement={'bottom'}
        >
          <input
            // tabIndex={1}
            className="border-[1px] rounded-lg outline-0 px-[10px] py-[5px] text-sm font-light font-sans text-gray-900"
            placeholder="Search Product..."
            onFocus={() => setShowSearchItems(true)}
            // onBlur={() => setShowSearchItems(false)}
          />
        </Popover>
      </div>
      <div className="flex items-center">
        <ConfigProvider
          theme={{
            token: {
              colorText: `${isHomePage && 'white'}`,
              // colorBgElevated: `${isHomePage && '#363636FF'}`,
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
            dropdownStyle={isHomePage ? { background: '#363636FF' } : {}}
            className={`text-inherit mr-[20px]`}
            size={'small'}
            options={[
              { value: 'vi', label: 'Tiếng Việt' },
              { value: 'en', label: 'English' },
            ]}
          />
        </ConfigProvider>
        {user ? (
          <div>
            <Dropdown menu={{ items }}>
              <Badge count={5} offset={[5, 10]} color="blue">
                <Avatar src={staticVariables.logoRaiden.src} size="large" />
              </Badge>
            </Dropdown>
          </div>
        ) : (
          <div
            className={`text-inherit'} cursor-pointer`}
            onClick={() => setShowModal(true)}
          >
            Đăng nhập
          </div>
        )}
        <Modal
          open={showModal}
          // width={currentForm === 'REGISTER' ? 1000 : 520}
          className={``}
          centered
          onCancel={() => {
            setShowModal(false);
            dispatch(setshowFormLogin({ showFormLogin: false }));
          }}
          footer={[]}
        >
          {currentForm === 'LOGIN' && <Login onFinish={handleShowModal} />}
          {currentForm === 'REGISTER' && (
            <Register onFinishOTP={onFinishOTP} onFinish={handleShowModal} />
          )}
          <div className="m-auto flex justify-around	max-w-[300px]">
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
    </div>
  );
});
