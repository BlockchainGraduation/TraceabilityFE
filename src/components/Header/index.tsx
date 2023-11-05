'use client';
import staticVariables from '@/static';
import {
  Avatar,
  Badge,
  Col,
  ConfigProvider,
  Dropdown,
  Empty,
  Image,
  Input,
  InputNumber,
  MenuProps,
  Modal,
  Popover,
  Row,
  Select,
  Space,
  message,
} from 'antd';
import Link from 'next/link';
import { deleteCookie, getCookie } from 'cookies-next';
import React, {
  ChangeEvent,
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Login from './Login';
import Register from './Register';
import { useDebounce, useEffectOnce, useOnClickOutside } from 'usehooks-ts';
import { usePathname as pathLanguage, useRouter } from 'next-intl/client';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks';
import useSWR from 'swr';
import {
  FieldTimeOutlined,
  GroupOutlined,
  HomeOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightFromBracket,
  faCartShopping,
  faEarthAsia,
  faHouse,
  faUser,
  faUserGear,
} from '@fortawesome/free-solid-svg-icons';
import { logOut, setLogin } from '@/reducers/userSlice';
import SearchItem from './SearchItem';
import instanceAxios from '@/api/instanceAxios';
import { setshowFormLogin } from '@/reducers/showFormSlice';
import ForgetForm from './Register/ForgetForm';
import { Inter } from 'next/font/google';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import NotificationItem from './NotificationItem';
import moment from 'moment';
import 'moment/locale/vi';

const inter = Inter({ subsets: ['latin'] });

interface NotificationItemType {
  avatar?: string;
  message?: string;
  params?: {
    product_id?: string;
    product_name?: string;
    notification_type?: string;
  };
  data?: {
    created_at?: number;
    unread?: boolean;
    notification_id?: string;
  };
}
export default memo(function Header() {
  // const [user, setUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSearchItems, setShowSearchItems] = useState(false);
  const [currentForm, setCurrentForm] = useState<
    'LOGIN' | 'REGISTER' | 'FORGET'
  >('LOGIN');
  const [dataHeader, setDataHeader] = useState({});
  const [valueSearch, setValueSearch] = useState('');
  const [resultSearch, setResultSearch] = useState([]);
  const [listNotifications, setListNotifications] = useState<
    NotificationItemType[]
  >([]);
  const [listUnreadNotifications, setListUnreadNotifications] = useState(0);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const debouncedValue = useDebounce<string>(valueSearch, 500);

  const router = useRouter();
  const t = useTranslations('header');
  const pathname = pathLanguage();
  const path = usePathname();
  const locale = useLocale();
  const logged = useAppSelector((state) => state.user.logged);
  const currentUser = useAppSelector((state) => state.user.user);
  const showFormLogin = useAppSelector((state) => state.showForm.showFormLogin);
  const dispatch = useAppDispatch();
  moment.locale(locale);

  const listIcon = [
    <HomeOutlined key={1} />,
    <GroupOutlined key={2} />,
    <FieldTimeOutlined key={3} />,
    <QuestionCircleOutlined key={4} />,
  ];

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

  const fethGetUser = useCallback(async () => {
    await instanceAxios
      .get('user/me')
      .then((res) => {
        // console.log(res.data.data);
        dispatch(setLogin({ logged: true, user: { ...res.data.data } }));
      })
      .catch((err) => console.log(err));
  }, [dispatch]);
  // useEffectOnce(() => {
  //   fethGetUser();
  // });
  useSWR('user/me', fethGetUser);

  const fetchNotifications = async () => {
    await instanceAxios
      .get(`notifications/list`)
      .then((res) => {
        setListNotifications(res.data.data.data);
        setListUnreadNotifications(res.data.data.meta.unread_total);
        setTotalNotifications(res.data.data.meta.total);
      })
      .catch((err) => console.log(err));
  };
  useSWR('notifications/list', fetchNotifications);

  useEffectOnce(() => {
    fetchNotifications();
  });

  const fethMarketSearch = useCallback(async () => {
    await instanceAxios
      .get(`marketplace/list?name_product=${debouncedValue}&skip=0&limit=10`)
      .then((res) => {
        setResultSearch(res.data.data.list_marketplace);
        // console.log(res);
        // dispatch(setLogin({ logged: true, user: res.data.data }));
      })
      .catch((err) => console.log(err));
  }, [debouncedValue]);
  useEffect(() => {
    if (debouncedValue) {
      fethMarketSearch();
    }
  }, [debouncedValue, fethMarketSearch]);

  const handleChangeLanguage = () => {
    router.replace(pathname, { locale: locale === 'vi' ? 'en' : 'vi' });
  };
  const onFinishOTP = () => {
    setCurrentForm('LOGIN');
  };
  const handleShowModal = () => {
    setShowModal(false);
  };
  const handleLogout = async () => {
    // const access = getCookie('access_token');
    delete instanceAxios.defaults.headers.common.Authorization;
    dispatch(logOut());
    deleteCookie('access_token');
    router.push('/');
    setShowModal(true);
    setCurrentForm('LOGIN');
  };
  // useEffect(() => {
  //   setUser(logged);
  // }, [logged]);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setShowSearchItems(false));
  const contentNotifications = (
    <div className="max-h-[500px] overflow-auto">
      {listNotifications.length ? (
        listNotifications.map((item, index) => (
          <NotificationItem
            key={index}
            created_at={item.data?.created_at}
            content={item.message}
            unread={item.data?.unread}
            product_id={item.params?.product_id}
            product_name={item.params?.product_name}
            notification_type={item.params?.notification_type}
            notification_id={item.data?.notification_id}
          />
        ))
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={'Chưa có thông báo nào'}
        />
      )}
    </div>
  );
  const items: MenuProps['items'] = [
    {
      label: (
        <Link href={`/user/${currentUser.id}`}>
          <Row gutter={[16, 0]} wrap={false} justify={'start'}>
            <Col className="justify-center" span={6}>
              <FontAwesomeIcon icon={faUser} />
            </Col>
            <Col span={24}>Thong tin</Col>
          </Row>
        </Link>
      ),
      key: '0',
    },
    {
      label: (
        <Popover
          title="Thông báo của bạn"
          placement={'left'}
          content={contentNotifications}
        >
          <Row gutter={[16, 0]} wrap={false} justify={'start'}>
            <Col className="justify-center" span={6}>
              <FontAwesomeIcon icon={faBell} style={{ color: '#20249d' }} />
            </Col>
            <Col span={24}>
              {listUnreadNotifications ? (
                <Badge
                  count={listUnreadNotifications}
                  offset={[5, 8]}
                  color="blue"
                >
                  <p className="pr-[10px]">Thông báo</p>
                </Badge>
              ) : (
                <p className="pr-[10px]">Thông báo</p>
              )}
            </Col>
          </Row>
        </Popover>
      ),
      key: '1',
    },
    {
      label: (
        <Row gutter={[16, 0]} wrap={false} justify={'start'}>
          <Col className="justify-center" span={6}>
            <FontAwesomeIcon icon={faCartShopping} />
          </Col>
          <Col span={24}>Gio hang</Col>
        </Row>
      ),
      key: '2',
    },
    {
      label: (
        <Link href={'/cms'}>
          <Row gutter={[16, 0]} wrap={false} justify={'start'}>
            <Col className="justify-center" span={6}>
              <FontAwesomeIcon icon={faUserGear} style={{ color: '#376ecd' }} />
            </Col>
            <Col>Quản lí</Col>
          </Row>
        </Link>
      ),
      key: '3',
    },
    {
      label:
        currentUser.system_role === 'MEMBER' ? (
          <Link href={'/register-rule'}>
            <Row wrap={false} justify={'start'}>
              <Col className="justify-center" span={6}>
                <FontAwesomeIcon icon={faUser} />
              </Col>
              <Col span={24}>Đăng kí thành viên</Col>
            </Row>
          </Link>
        ) : (
          ''
        ),
      key: '4',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <div onClick={handleLogout}>
          <Row gutter={[16, 0]} wrap={false} justify={'start'}>
            <Col span={6}>
              <FontAwesomeIcon
                className="mr-[10px]"
                icon={faArrowRightFromBracket}
              />
            </Col>
            <Col span={24}>Logout</Col>
          </Row>
        </div>
      ),
      key: '5',
    },
  ];
  return (
    <div
      data-aos="fade-down"
      data-aos-duration="1500"
      className={`w-full	text-black ${
        isHomePage ? ' bg-transparent' : 'bg-[#2db457]'
      } bg-white fixed z-10 flex items-center justify-between backdrop-blur-[50px] pl-5 pr-10 height-fit
      ${inter.className} `}
    >
      <Link href={'/'}>
        <Avatar
          size={50}
          className={`object-cover`}
          src={staticVariables.qc3.src}
          alt=""
        />
      </Link>
      <div className={`flex`}>
        {Object.keys((dataHeader as any).route || {}).map((key, index) => (
          <Link
            key={index}
            className={`py-[15px] px-8 flex text-xl items-center gap-x-2 rounded hover:text-black transition duration-300 ease-in-out	 hover:-translate-y-1 hover:scale-110 duration-300`}
            href={`/${key}`}
          >
            {listIcon[index]}
            <p className={`text-inherit font-bold font-mono`}>
              {t(`route.${key}`)}
            </p>
          </Link>
        ))}
      </div>
      <div className="relative w-1/3">
        <Popover
          title={
            <p className=" w-full truncate">
              {`Kết quả tìm kiếm: ${debouncedValue}`}
            </p>
          }
          className="w-full"
          content={
            <div ref={ref} className="w-full max-h-[400px] overflow-y-auto">
              {resultSearch.length ? (
                resultSearch.map((item: any, index) => (
                  <SearchItem
                    parent={{ onClick: () => setShowSearchItems(false) }}
                    key={index}
                    productImage={item.product.banner}
                    productName={item.product.name}
                    owner={item.product.user.username}
                    quantity={item.product.quantity}
                    price={item.product.price}
                  />
                ))
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_DEFAULT}
                  description={'Ko tìm thấy kết quả'}
                />
              )}
            </div>
          }
          open={showSearchItems}
          // trigger={'focus'}
          placement={'bottom'}
        >
          <input
            // tabIndex={1}
            maxLength={50}
            className="border-0 bg-[#1212120A] hover:bg-[#ececec] rounded-lg outline-0 px-[20px] py-[10px] text-sm font-light font-sans text-gray-900 "
            placeholder="Search Product...(Max 50 char)"
            onChange={(e) => {
              if (e.target.value.trim()) {
                setValueSearch(e.target.value);
                setShowSearchItems(true);
              } else {
                setResultSearch([]);
                setShowSearchItems(false);
                return;
              }
            }}
            onFocus={(e) => {
              if (!e.target.value.trim()) {
                return;
              } else {
                setShowSearchItems(true);
                fethMarketSearch();
              }
            }}
          />
        </Popover>
      </div>
      <div className="flex items-center ">
        <ConfigProvider
          theme={{
            token: {
              // colorText: `${isHomePage && 'white'}`,
              // colorBgElevated: `${isHomePage && '#363636FF'}`,
            },
            components: {
              // Select: { controlItemBgActive: `${isHomePage && '#111126CE'}` },
            },
          }}
        >
          <Space className="w-fit bg-[#1212120A] hover:bg-[#ececec] px-[20px] py-[10px] rounded-lg mr-[20px]">
            <FontAwesomeIcon
              size="1x"
              icon={faEarthAsia}
              style={{ color: '#3748c8' }}
            />
            <Select
              defaultValue={locale}
              style={{ width: 100 }}
              onChange={handleChangeLanguage}
              bordered={false}
              // dropdownStyle={isHomePage ? { background: '#363636FF' } : {}}
              className={`text-inherit `}
              size={'small'}
              options={[
                { value: 'vi', label: 'Tiếng Việt' },
                { value: 'en', label: 'English' },
              ]}
            />
          </Space>
        </ConfigProvider>
        {logged ? (
          <Dropdown menu={{ items }}>
            {listUnreadNotifications ? (
              <Badge
                count={listUnreadNotifications}
                offset={[5, 10]}
                color="blue"
              >
                <Avatar src={currentUser.avatar} size="large" />
              </Badge>
            ) : (
              <Avatar src={currentUser.avatar} size="large" />
            )}
          </Dropdown>
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
          {currentForm === 'FORGET' && <ForgetForm onFinishOTP={onFinishOTP} />}
          <div className=" m-auto flex justify-around	max-w-[300px]">
            <p onClick={() => setCurrentForm('FORGET')}>Forget?</p>
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
