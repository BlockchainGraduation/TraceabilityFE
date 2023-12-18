'use client';
import instanceAxios from '@/api/instanceAxios';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setshowFormLogin } from '@/reducers/showFormSlice';
import { logOut, setLogin } from '@/reducers/userSlice';
import currency from '@/services/currency';
import staticVariables from '@/static';
import {
  FieldTimeOutlined,
  GroupOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import {
  faArrowRightFromBracket,
  faBell,
  faCartShopping,
  faMagnifyingGlass,
  faUser,
  faUserGear,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  Badge,
  Checkbox,
  ConfigProvider,
  Dropdown,
  Empty,
  MenuProps,
  Modal,
  Popover,
  message,
} from 'antd';
import { deleteCookie } from 'cookies-next';
import moment from 'moment';
import 'moment/locale/vi';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname as pathLanguage, useRouter } from 'next-intl/client';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { useDebounce, useEffectOnce, useOnClickOutside } from 'usehooks-ts';
import CartItem from '../CartItem';
import { CheckoutForm } from '../Contents/common/CheckoutForm';
import ForgetForm from '../ForgetForm';
import Login from '../Login';
import SearchItem from '../SearchItem';
import NotificationItem from './NotificationItem';
import Register from './Register';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

const inter = Inter({ subsets: ['latin'] });

interface CheckboxItemType {
  index?: number;
  quantity?: number;
}

export default memo(function Header() {
  // const [user, setUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [valueRadioCart, setValueRadioCart] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showSearchItems, setShowSearchItems] = useState(false);
  const [loadingBuy, setLoadingBuy] = useState(false);
  const [showModalSearch, setShowModalSearch] = useState(false);

  const [currentForm, setCurrentForm] = useState<
    'LOGIN' | 'REGISTER' | 'FORGET'
  >('LOGIN');
  const [dataHeader, setDataHeader] = useState({});
  const [valueSearch, setValueSearch] = useState('');
  const [resultSearch, setResultSearch] = useState<ProductType[]>([]);
  const [buyQuantityIndex, setBuyQuantityIndex] = useState<CheckboxItemType[]>(
    []
  );
  const [listCart, setListCart] = useState<
    (CartItemType & { buyQuantity?: number })[]
  >([]);
  const [checkedItems, setCheckedItems] = useState<CheckboxValueType[]>([]);
  const [unread, setUnread] = useState(0);
  const [listNotifications, setListNotifications] = useState<
    NotificationItemType[]
  >([]);
  // const [listUnreadNotifications, setListUnreadNotifications] = useState(0);
  // const [totalNotifications, setTotalNotifications] = useState(0);
  const debouncedValue = useDebounce<string>(valueSearch, 300);
  const { mutate } = useSWRConfig();

  const router = useRouter();
  const t = useTranslations('header');
  const tNotification = useTranslations('notification');
  const pathname = pathLanguage();
  const path = usePathname();
  const locale = useLocale();
  const logged = useAppSelector((state) => state.user.logged);
  const currentUser = useAppSelector((state) => state.user.user);
  const showFormLogin = useAppSelector((state) => state.showForm.showFormLogin);
  const dispatch = useAppDispatch();
  moment.locale(locale);

  // const onChange = (e: RadioChangeEvent) => {
  //   // console.log('radio checked', e.target.value);
  //   setValueRadioCart(e.target.value);
  // };

  useEffect(() => {
    setTotalPrice(
      listCart
        .filter(
          (item) =>
            checkedItems.includes(item.id || 0) && item.buyQuantity !== 0
        )
        .reduce(
          (item, currentValue) =>
            item +
            (currentValue.buyQuantity || 0) *
              (currentValue.product_id?.price || 0),
          0
        )
    );
    console.log('listCart', listCart);
    setBuyQuantityIndex(
      listCart
        .filter(
          (item) =>
            checkedItems.includes(item.id || 0) && item.buyQuantity !== 0
        )
        .map((item) => ({ index: item.id, quantity: item.buyQuantity }))
    );
  }, [checkedItems, listCart]);

  const onChangeBuyQuantity = (value?: any, index?: number) => {
    const newList = [...listCart];

    newList.find((item) => {
      if (item.id === index) return (item.buyQuantity = value);
    });
    // console.log(newList);
    setListCart(newList);

    // console.log('Number', buyQuantityIndex);
    // console.log('Value ', { value, index });
  };
  const onChange = (checkedValues: CheckboxValueType[]) => {
    setCheckedItems(checkedValues);
  };

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

  const fethGetUser = useCallback(async () => {
    await instanceAxios
      .get('user/me')
      .then((res) => {
        dispatch(setLogin({ logged: true, user: { ...res.data.user } }));
      })
      .catch((err) => console.log(err));
  }, [dispatch]);
  useEffectOnce(() => {
    fethGetUser();
  });

  const fethMarketSearch = useCallback(async () => {
    await instanceAxios
      .get(`search-product/?name=${debouncedValue}`)
      .then((res) => {
        console.log(res.data);
        setResultSearch(res.data.results);
      })
      .catch((err) => console.log(err));
  }, [debouncedValue]);

  const fetchBuyCart = async () => {
    // setLoadingBuy(true);
    const listBuyCart = listCart
      .filter(
        (item) => checkedItems.includes(item.id || 0) && item.buyQuantity !== 0
      )
      .map((item, index) => ({
        cart_id: item.id,
        product_id: item.product_id?.id,
        quantity: item.buyQuantity,
        price: (item.buyQuantity || 0) * (item.product_id?.price || 0),
      }));

    // if (listBuyCart.length)
    //   await instanceAxios
    //     .post(`create-multi-transaction`, { list_transactions: listBuyCart })
    //     .then((res) => {
    //       mutate('cart-me');
    //       message.success(
    //         'Mua hàng thành công, vui lòng chờ cửa hàng xác nhận!!!'
    //       );
    //     })
    //     .catch((err) => message.error(tNotification(err.response.data.detail)))
    //     .finally(() => setLoadingBuy(false));
    console.log(checkedItems);
    console.log(listBuyCart);
  };

  const indexCartDeleted = (index: number) => {
    setCheckedItems(checkedItems.filter((item) => item !== index));
    setBuyQuantityIndex(
      buyQuantityIndex.filter((item) => item.index !== index)
    );
  };

  const fetchCartMe = async () => {
    await instanceAxios
      .get(`cart-me`)
      .then((res) => {
        if (buyQuantityIndex.length) {
          const newList = [...res.data];
          newList.forEach((item) => {
            const indexInfo = buyQuantityIndex.find(
              (indexItem) => indexItem.index === item.id
            );

            if (indexInfo) {
              item.buyQuantity = indexInfo.quantity;
            }
          });
          setListCart(newList);
        } else {
          setListCart(res.data);
        }
        // setListCart(
        //   [...res.data].map(
        //     (item: CartItemType & { buyQuantity?: number }, index) => ({
        //       ...item,
        //       buyQuantity: (item.product_id?.quantity || 0) > 0 ? 1 : 0,
        //     })
        //   )
        // );

        // setBuyQuantityIndex([...res.data].map(() => 1));
      })
      .catch((err) => console.log(err));
  };
  const fetchNotificationMe = async () => {
    await instanceAxios
      .get(`notification-me`)
      .then((res) => {
        setUnread(res.data.unread);
        setListNotifications(res.data.detail);
      })
      .catch((err) => console.log(err));
  };

  useSWR('notifiation-me', fetchNotificationMe);
  useSWR('cart-me', fetchCartMe);

  useEffect(() => {
    fetchNotificationMe();
  }, []);
  useEffectOnce(() => {
    fetchCartMe();
  });

  useEffect(() => {
    if (showFormLogin) {
      setCurrentForm('LOGIN');
      setShowModal(true);
    }
  }, [showFormLogin]);

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
    mutate('notifications/list');
    setShowModal(false);
  };
  const handleLogout = async () => {
    // const access = getCookie('access_token');
    delete instanceAxios.defaults.headers.common.Authorization;
    dispatch(logOut());
    deleteCookie('access');
    deleteCookie('refresh');
    // router.push('/');
    // setShowModal(true);
    setCurrentForm('LOGIN');
    mutate('user/me');
  };

  const ref = useRef(null);
  useOnClickOutside(ref, () => setShowSearchItems(false));
  const contentNotifications = (
    <div className="max-h-[500px] overflow-auto">
      {listNotifications.length ? (
        listNotifications.map((item, index) => (
          <NotificationItem key={index} {...item} />
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
          <div className=" min-w-[200px]  items-center flex py-[10px] font-medium text-[16px] space-x-3 px-[5px] rounded-xl">
            <div className="w-[30px]">
              <FontAwesomeIcon icon={faUser} style={{ color: '#376ecd' }} />
            </div>
            <p>Trang cá nhân</p>
          </div>
        </Link>
      ),
      key: '0',
    },

    {
      label: (
        <div className="min-w-[200px]  items-center flex py-[10px] font-medium text-[16px] space-x-3 px-[5px] rounded-xl">
          <div className="w-[30px]">
            <FontAwesomeIcon icon={faWallet} style={{ color: '#376ecd' }} />
          </div>
          <div className="flex gap-x-2">
            <form
              action={`${process.env.NEXT_PUBLIC_API_ORIGIN}user/checkout`}
              method="POST"
              className=""
            >
              <button>Nạp card</button>
            </form>
            {/* <p className="text 18px font-bold">{`${
              currentUser.account_balance || 0
            } `}</p>
            <p className="text-[12px] text-current-color">{currency}</p> */}
          </div>
        </div>
      ),
      key: '1',
    },
    {
      label: (
        <ConfigProvider
          theme={{
            token: {
              lineWidth: 3,
              paddingXS: 10,
            },
          }}
        >
          <div
            className="min-w-[200px] items-center flex py-[10px] font-medium text-[16px] space-x-3 px-[5px] rounded-xl"
            onClick={() => setShowCartModal(true)}
          >
            <div className="w-[30px]">
              <FontAwesomeIcon
                icon={faCartShopping}
                style={{ color: '#376ecd' }}
              />
            </div>
            <p>Giỏ hàng</p>
          </div>
        </ConfigProvider>
      ),
      key: '2',
    },
    {
      label: (
        <Link href={'/cms'}>
          <div className="min-w-[200px] items-center flex py-[10px] font-medium text-[16px] space-x-3 px-[5px] rounded-xl">
            <div className="w-[30px]">
              <FontAwesomeIcon icon={faUserGear} style={{ color: '#376ecd' }} />
            </div>
            <p>Quản lí</p>
          </div>
        </Link>
      ),
      key: '3',
    },
    {
      label:
        currentUser.confirm_status === 'NONE' ? (
          <Link
            // className="py-[10px] px-[5px] font-medium text-[16px] space-x-3 rounded-xl"
            href={'/register-rule'}
          >
            <div className="min-w-[200px] items-center flex py-[10px] font-medium text-[16px] space-x-3 px-[5px] rounded-xl">
              <div className="w-[30px]">
                <FontAwesomeIcon icon={faUser} style={{ color: '#376ecd' }} />
              </div>
              <p>Đăng kí thành viên</p>
            </div>
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
        <div
          className="min-w-[200px] items-center flex py-[10px] font-medium text-[16px] space-x-3 px-[5px] rounded-xl"
          onClick={handleLogout}
        >
          <div className="w-[30px]">
            <FontAwesomeIcon
              // className="mr-[10px]"
              icon={faArrowRightFromBracket}
            />
          </div>
          <p>Đăng xuất</p>
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
      } bg-white fixed top-0 z-50 flex lg:py-1.5 items-center justify-between backdrop-blur-[50px] pl-5 pr-10 height-fit
      ${inter.className} `}
    >
      <Link href={'/'}>
        <Avatar
          size={50}
          className={`object-cover scale-[1.8]`}
          src={staticVariables.logoShrimp.src}
          alt=""
        />
      </Link>
      <div className={`flex`}>
        {Object.keys((dataHeader as any).route || {}).map((key, index) => (
          <Link
            key={index}
            className={`py-[15px] px-6 flex hover:bg-[#ececec] text-[16px] items-center gap-x-2 rounded-xl hover:text-black transition duration-300 ease-in-out hover:-translate-y-1`}
            href={`/${key}`}
          >
            {/* {listIcon[index]} */}
            <p className={`text-inherit font-medium font-sans`}>
              {t(`route.${key}`)}
            </p>
          </Link>
        ))}
      </div>
      {/* <div className="relative w-1/4"> */}
      <Modal
        open={showModalSearch}
        onCancel={() => setShowModalSearch(false)}
        footer={[]}
      >
        <Popover
          getPopupContainer={(trigger) => trigger.parentNode as HTMLElement}
          title={
            <p className=" w-full truncate">
              {`Kết quả tìm kiếm: ${debouncedValue}`}
            </p>
          }
          className="w-full"
          content={
            <div ref={ref} className="w-full max-h-[400px] overflow-y-auto">
              {resultSearch.length ? (
                resultSearch.map((item, index) => (
                  <SearchItem
                    parent={{ onClick: () => setShowSearchItems(false) }}
                    key={index}
                    data={item}
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
          <div className="relative h-fit">
            <input
              maxLength={50}
              className="w-full mt-[20px]  hover:bg-[#ececec] border rounded-lg outline-0 px-[20px] pl-[50px] py-[10px] text-sm font-light font-sans text-gray-900 "
              placeholder="Tìm kiếm sản phẩm...(Max 50 char)"
              value={valueSearch}
              onChange={(e) => {
                setValueSearch(e.target.value);
                if (e.target.value.trim()) {
                  setShowSearchItems(true);
                } else {
                  setShowSearchItems(false);
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
            <FontAwesomeIcon
              className="absolute left-0 top-1/2 translate-x-full translate-y-1/3"
              icon={faMagnifyingGlass}
              style={{ color: '#2958c7' }}
            />
          </div>
        </Popover>
      </Modal>
      {/* </div> */}
      <div className="flex items-center ">
        <div className="p-[20px]" onClick={() => setShowModalSearch(true)}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ color: '#3b71ce' }}
          />
        </div>
        {/* <ConfigProvider
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
              getPopupContainer={(trigger) => trigger.parentNode as HTMLElement}
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
        </ConfigProvider> */}

        {logged ? (
          <div className="flex items-center space-x-5">
            <div className="min-w-[200px] items-center flex py-[10px] font-medium text-[16px] space-x-3 px-[5px] rounded-xl">
              <div className="w-[30px]">
                <FontAwesomeIcon icon={faWallet} style={{ color: '#376ecd' }} />
              </div>
              <div className="flex gap-x-2">
                <p className="">Ví của bạn:</p>
                <p className="text 18px font-bold">{`${
                  currentUser.account_balance || 0
                } `}</p>
                <p className="text-[12px] text-current-color">{currency}</p>
              </div>
            </div>
            <Popover
              getPopupContainer={(trigger) => trigger.parentNode as HTMLElement}
              title={
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon
                    icon={faBell}
                    size={'1x'}
                    style={{ color: '#0866ff' }}
                  />
                  <p>Thông báo của bạn</p>
                </div>
              }
              placement={'bottomLeft'}
              trigger={['click']}
              content={contentNotifications}
            >
              <div className=" hover:bg-[#ececec] px-[20px] py-[10px] rounded-lg">
                {unread ? (
                  <Badge count={unread} offset={[16, -8]} color="blue">
                    <FontAwesomeIcon
                      size={'1x'}
                      className=""
                      icon={faBell}
                      style={{ color: '#20249d' }}
                    />
                  </Badge>
                ) : (
                  <FontAwesomeIcon icon={faBell} style={{ color: '#20249d' }} />
                )}
              </div>
            </Popover>
            <ConfigProvider
              theme={{
                token: {
                  controlItemBgHover: 'rgb(230, 240, 238)',
                },
              }}
            >
              <Dropdown
                getPopupContainer={(trigger) =>
                  trigger.parentNode as HTMLElement
                }
                menu={{ items }}
                placement={'bottomLeft'}
              >
                {/* {listNotifications ? (
                <Badge count={10} offset={[5, 10]} color="blue">
                  <Avatar src={currentUser.avatar} size="large" />
                </Badge>
              ) : ( */}
                <div>
                  {/* <Avatar src={currentUser.avatar} size={20} /> */}
                  <Avatar
                    size={40}
                    src={currentUser.avatar || staticVariables.noImage.src}
                  />
                </div>
                {/* )} */}
              </Dropdown>
            </ConfigProvider>

            <Modal
              width={'80%'}
              // style={{ float: 'right', margin: '10px' }}
              onCancel={() => setShowCartModal(false)}
              centered
              title={
                <p className="text-[20px] py-[10px] font-semibold">
                  Giỏ hàng của bạn
                </p>
              }
              open={showCartModal}
              footer={[]}
            >
              <div className="flex flex-col pr-[10px] w-full">
                <div className="flex justify-between mb-[20px]">
                  <p className="text-[16px] font-semibold">
                    {listCart.length} items
                  </p>
                  {listCart.length ? (
                    <p className="text-[14px] font-semibold">
                      Xóa tất cả giỏ hàng
                    </p>
                  ) : (
                    ''
                  )}
                </div>
                <div className=" w-full max-h-[360px] overflow-y-auto  flex flex-col">
                  {/* <CartItem
                    onDeleteSuccess={() => mutate('cart/list')}
                    active={valueRadioCart === index}
                    key={index}
                    data={listCart[0]}
                  /> */}
                  {listCart.length ? (
                    <Checkbox.Group
                      value={checkedItems}
                      onChange={(e) => onChange(e)}
                      className="flex w-full flex-col gap-y-3"
                    >
                      {listCart.map((item, index) => (
                        <div
                          className="flex items-center gap-x-3"
                          key={item.id}
                        >
                          <Checkbox
                            // key={item.id}
                            disabled={item.buyQuantity === 0}
                            value={item.id}
                          />
                          <CartItem
                            onChangeBuyQuantity={(e) =>
                              onChangeBuyQuantity(e, item.id)
                            }
                            onDeleteSuccess={() => {
                              indexCartDeleted(item.id || 0);
                              mutate('cart-me');
                            }}
                            // active={valueRadioCart === index}
                            data={item}
                          />
                        </div>
                      ))}
                    </Checkbox.Group>
                  ) : (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_DEFAULT}
                      description="Không có sản phẩm nào trong giỏ hàng"
                    />
                  )}
                </div>
                <div className="w-full flex flex-col space-y-5 border-t-[1px] mt-10 pt-5">
                  <div className="flex justify-between ">
                    <p className="text-[16px] font-bold">Tổng thanh toán</p>
                    <div className="flex flex-col">
                      <p className="text-[16px] font-semibold">
                        {totalPrice}
                        {currency}
                      </p>
                      {/* <p className="text-[14px]">
                        {listCart[valueRadioCart]?.product_id?.price || 0}{' '}
                        {currency}
                      </p> */}
                    </div>
                  </div>
                  {/* Button Checkout */}
                  <div className="w-full">
                    <button
                      // disabled
                      onClick={fetchBuyCart}
                      // onClick={() => setShowCheckoutModal(true)}
                      className="relative disabled:bg-gray-100 disabled:text-gray-300 block m-auto py-2 px-8 text-black text-base font-bold bg-green-100 rounded-xl overflow-hidden transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0"
                    >
                      Mua ngay
                    </button>
                    <Modal
                      open={showCheckoutModal}
                      onCancel={() => setShowCheckoutModal(false)}
                      footer={[]}
                    >
                      <CheckoutForm
                        buyQuantity={
                          (listCart[valueRadioCart]?.product_id?.quantity ||
                            0) > 0
                            ? 1
                            : 0
                        }
                        producId={listCart[valueRadioCart]?.product_id?.id || 0}
                        price={listCart[valueRadioCart]?.product_id?.price || 0}
                        quantity={
                          listCart[valueRadioCart]?.product_id?.quantity || 0
                        }
                        cartId={listCart[valueRadioCart]?.id}
                        onSuccess={() => {
                          mutate(`marketplace/id`);
                        }}
                      />
                    </Modal>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        ) : (
          <Link href={'/login'}>
            <div
              className={`text-inherit'} cursor-pointer`}
              // onClick={() => setShowModal(true)}
            >
              Đăng nhập
            </div>
          </Link>
        )}
        <ConfigProvider
          theme={{
            token: {
              colorBgElevated: 'rgba(255, 255, 255, 0.75)',
            },
          }}
        >
          <Modal
            open={showModal}
            // width={currentForm === 'REGISTER' ? 1000 : 520}
            className="backdrop-blur-sm	"
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
            {currentForm === 'FORGET' && (
              <ForgetForm onFinishOTP={onFinishOTP} />
            )}
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
        </ConfigProvider>
      </div>
    </div>
  );
});
