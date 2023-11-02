'use client';
import staticVariables from '@/static';
import {
  DeleteTwoTone,
  EditTwoTone,
  EyeOutlined,
  FieldTimeOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusCircleTwoTone,
  PlusOutlined,
  SearchOutlined,
  SendOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Carousel,
  Col,
  ConfigProvider,
  DatePicker,
  Empty,
  Form,
  Image,
  Input,
  List,
  Modal,
  Popconfirm,
  Popover,
  Row,
  Segmented,
  Table,
  Tag,
  Timeline,
  Typography,
  Upload,
  UploadFile,
} from 'antd';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowTrendUp,
  faEnvelope,
  faMobileScreenButton,
} from '@fortawesome/free-solid-svg-icons';
import GrowUpItem from '@/components/Contents/ProductInfo/GrowUpItem';
import Paragraph from 'antd/es/typography/Paragraph';
import CommentItem from '@/components/Contents/ProductInfo/CommentItem';
import { ColumnsType } from 'antd/es/table';
import { CheckoutForm } from '@/components/Contents/common/CheckoutForm';
import instanceAxios from '@/api/instanceAxios';
import GrowUpForm from '@/components/Contents/ProductInfo/GrowUpForm';
import TextAreaCustom from '@/components/Contents/common/InputCustom/TextAreaCustom';
import InputCustom from '@/components/Contents/common/InputCustom/InputCustom';
import { useAppSelector } from '@/hooks';
import { useEffectOnce } from 'usehooks-ts';
import CommentInput from '@/components/Contents/common/CommentInput';
import moment from 'moment';
import { useTranslations } from 'next-intl';
import CreateDescriptionForm from '@/components/Contents/ProductInfo/CreateDescriptionForm';
import { UploadChangeParam } from 'antd/es/upload';
import useSWR from 'swr';
import SeedOrigin from './components/PoductOrigin';

interface DataType {
  key: React.Key;
  buyer: ReactNode;
  quantity: number;
  price: number;
  time: string;
  status: ReactNode;
}
interface HistoryType {
  id?: string;
  product_id?: string;
  transaction_sf_id?: string;
  product?: {
    id?: string;
    product_type?: string;
    product_status?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    banner?: string;
    created_by?: string;
    created_at?: string;
    user?: {
      id?: string;
      avatar?: string;
      username?: string;
      email?: string;
    };
  };
  transactions_fm?: {
    id?: string;
    product_id?: string;
    user_id?: string;
    price?: number;
    quantity?: number;
    created_at?: string;
    updated_at?: string;
    product?: {
      id?: string;
      product_type?: string;
      product_status?: string;
      name?: string;
      description?: string;
      price?: number;
      quantity?: number;
      banner?: number;
      created_by?: number;
      created_at?: number;
      user?: {
        id?: string;
        avatar?: string;
        username?: string;
        email?: string;
      };
    };
  };
  transactions_sf?: {
    id?: string;
    product_id?: string;
    user_id?: string;
    price?: number;
    quantity?: number;
    created_at?: string;
    updated_at?: string;
    product?: {
      id?: string;
      product_type?: string;
      product_status?: string;
      name?: string;
      description?: string;
      price?: number;
      quantity?: number;
      banner?: number;
      created_by?: number;
      created_at?: number;
      user?: {
        id?: string;
        avatar?: string;
        username?: string;
        email?: string;
      };
    };
  };
}
interface TopSellingType {
  Product?: {
    name?: string;
    number_of_sales?: number;
    banner?: string;
    created_by?: string;
    description?: string;
    created_at?: string;
    price?: number;
    updated_at?: string;
    quantity?: number;
    hashed_data?: string;
    id?: string;
    product_status?: string;
    product_type?: string;
  };
  total_quantity?: number;
  total_sales?: number;
}
interface ProductType {
  id?: string;
  name?: string;
  number_of_sales?: number;
  banner?: string;
  created_by?: string;
  description?: string;
  created_at?: string;
  price?: number;
  updated_at?: string;
  quantity?: number;
  hashed_data?: string;
  product_status?: string;
  product_type?: string;
  user?: {
    id?: string;
    avatar?: string;
    username?: string;
    email?: string;
    phone?: string;
  };
}
interface GrowUpType {
  id?: string;
  product_farmer_id?: string;
  description?: string;
  image?: string;
  video?: string;
  hashed_data?: string;
  created_at?: string;
  product_farmer?: {
    id?: string;
    product_id?: string;
    transaction_sf_id?: string;
    product?: {
      id?: string;
      product_type?: string;
      product_status?: string;
      name?: string;
      description?: string;
      price?: number;
      quantity?: number;
      banner?: string;
      created_by?: string;
      created_at?: string;
      user?: {
        id?: string;
        avatar?: string;
        username?: string;
        email?: string;
        phone?: string;
      };
    };
  };
}

export default function MarketInfo({
  params,
}: {
  params: { marketId: string };
}) {
  const [openListImageModal, setOpenListImageModal] = useState(false);
  const [openCreateDescriptionModal, setOpenCreateDescriptionModal] =
    useState(false);
  const [openGrowUpModal, setOpenGrowUpModal] = useState(false);
  const [dataMarket, setDataMarket] = useState<any>({});
  const [dataOwner, setDataOwner] = useState({});
  const [dataProduct, setDataProduct] = useState<ProductType>({});
  const [dataHistory, setDataHistory] = useState<HistoryType>({});
  const [dataGrowUp, setDataGrowUp] = useState<GrowUpType[]>([]);
  const [changePageRight, setChangePageRight] = useState('COMMENT');
  const [isOwner, setIsOwner] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [showModalPay, setShowModalPay] = useState(false);
  const currentUser = useAppSelector((state) => state.user.user);

  const fethMarket = async () => {
    await instanceAxios
      .get(`marketplace/${params.marketId}`)
      .then(async (res) => {
        setDataMarket(res.data.data);
        await instanceAxios
          .get(`product/${res.data.data.order_id}`)
          .then((res) => {
            setDataProduct(res.data.data);
          })
          .catch((err) => console.log('asdadasd'));
        await instanceAxios
          .get(`product/${res.data.data.order_id}/grow_up?skip=0&limit=100`)
          .then((res) => {
            setDataGrowUp(res.data.data.list_grow_up);
          })
          .catch((err) => console.log('asdadasd'));
        await instanceAxios
          .get(`product/${res.data.data.order_id}/history`)
          .then((res) => {
            setDataHistory(res.data.data);
          })
          .catch((err) => console.log('asdadasd'));
        fetchDataComment();
        // await instanceAxios
        //   .get(`user/${res.data.data.order_by}`)
        //   .then((res) => setDataOwner(res.data.data))
        //   .catch((err) => console.log('asdadasd'));
      })
      .catch((err) => console.log(err));
  };
  useEffectOnce(() => {
    fethMarket();
  });
  const fetchDataComment = async () => {
    await instanceAxios
      .get(
        `comments/list?marketplace_id=${
          params.marketId
        }&skip=${0}&limit=${1000}`
      )
      .then((res) => {
        setCommentList(res.data.data.list_comment);
      })
      .catch((err) => {
        setCommentList([]);
        console.log(err);
      });
  };
  useSWR(`comments/list?marketplace_id=${params.marketId}`, fetchDataComment);
  const listInformation = [
    {
      label: 'Tên sản phẩm',
      value: dataProduct.name,
    },
    {
      label: 'Giá đơn vị',
      value: dataProduct.price,
    },
    {
      label: 'Ngày đăng bán',
      value: moment(dataProduct.created_at).format('DD/MM/YYYY'),
    },
    {
      label: 'Loại sản phẩm',
      value: dataProduct.product_type,
    },
    {
      label: 'Trạng thái sản phẩm',
      value: dataProduct.product_status,
    },
    {
      label: 'Sở hửu bởi',
      value: dataProduct.user?.username,
    },
    {
      label: 'Email liên hệ',
      value: dataProduct.user?.email,
    },
  ];
  // setOwner();
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '300px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    borderRadius: '10px',
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Buyer',
      dataIndex: 'buyer',
      width: 200,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Time',
      dataIndex: 'time',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];
  const data: DataType[] = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      key: i,
      buyer: `Edward King ${i}`,
      quantity: 32,
      price: 1231313 + i,
      time: `2${i}/12/1212`,
      status: i,
    });
  }

  const onUpload = (e: UploadChangeParam<UploadFile<any>>) => {
    console.log(e);
  };

  return (
    <div className="w-full m-auto">
      <div className="px-[50px]">
        <div className="relative flex justify-between gap-x-10">
          <Image
            className="object-cover rounded drop-shadow-[0_10px_10px_rgba(0,0,0,0.25)]"
            alt=""
            width={800}
            height={500}
            src={dataProduct.banner}
          />
          <div className="w-1/2 top-4/12 left-[98%] rounded">
            <p className="text-[30px] text-[#222222] font-[Work Sans]">
              {dataProduct.name}
            </p>
            <div className="flex gap-x-2 tetx-[16px] text-[#7B7B7B] font-light">
              Sản phẩm của
              <p className="text-[#313064] font-bold">
                {dataProduct.user?.username}
              </p>
            </div>
            <InputCustom
              classNameLabel="text-[27px] text-[#2DB457] font-[Work Sans] font-[600]"
              name={''}
              initialValue={` ${dataProduct.price?.toLocaleString()}`}
              APIurl={''}
              queryType={'user'}
            />
            <p className="text-[27px] text-[#2DB457] font-[Work Sans] font-[600]">
              $ {dataProduct.price?.toLocaleString()}
            </p>
            <div className="text-[16px] leading-10 font-[Nunito] text-[#707070] text-justify">
              Ivy gourd protects the nervous system, provides more energy and a
              healthy metabolism! Ivy gourd is rich in beta-carotene that
              ensures the optimal functioning of the heart and prevents heart
              ailments. Ivy gourd can be stored safely in a cool, dry room.
            </div>
            <div className="flex gap-x-4 my-[20px]">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="w-fit items-center py-[10px] px-[20px] bg-lime-50 rounded border-[1px] border-[#1f5145]"
                >
                  <EyeOutlined className="mr-[5px]" />
                  12313
                </div>
              ))}
            </div>
            <div className="rounded p-[20px]">
              {/* <div className="flex pb-[10px] mb-[10px] border-b-[1px]">
                <FieldTimeOutlined className="px-[10px] text-2xl" />
                <p>
                  Sell day -
                  {moment(dataProduct.created_at).format('DD/MM/YYYY')}
                </p>
              </div>
              <div>
                The current price of durian fruit is $
                {dataProduct.price?.toLocaleString()} per fruit
              </div>
              <div className="w-fit flex items-center text-xs m-auto my-[20px]">
                Price
                <p className="text-3xl skew-y-3">
                  {dataProduct.price?.toLocaleString()}$
                </p>
              </div> */}
              <div className="flex items-center mt-[10px]">
                <Button
                  disabled={dataProduct.created_by === currentUser.id}
                  onClick={() => setShowModalPay(true)}
                  className="w-full  shadow-[0px_12px_10px_-8px_rgba(72,184,159,0.8784313725)]"
                >
                  <p className="text-4xl text-[#1f5145]">Buy now</p>
                </Button>
                <Button
                  disabled={
                    dataProduct.created_by === currentUser.id ||
                    dataProduct.quantity === 0
                  }
                  onClick={() => {
                    // setBuyOrCart('CART');
                    setShowModalPay(true);
                  }}
                  className="flex items-center"
                >
                  <ShoppingCartOutlined />
                </Button>
              </div>
              <Modal
                onCancel={() => setShowModalPay(false)}
                open={showModalPay}
                footer={[]}
              >
                <CheckoutForm
                  producId={dataProduct?.id || ''}
                  price={dataProduct.price || 0}
                  quantity={dataProduct.quantity || 0}
                  onSuccess={() => setShowModalPay(false)}
                />
              </Modal>
            </div>
          </div>
        </div>
        <div className="w-full flex mt-[50px]">
          <div className="w-2/5 ">
            <p className="py-[10px] border-2 text-white bg-[#42bb67] rounded text-center ">
              Thông tin về sản phẩm
            </p>
            <div className="flex flex-col w-2/3 m-auto px-[20px] py-[15px] border-[1px] border-[#42bb67] rounded">
              {listInformation.map((item, index) => (
                <div
                  key={index}
                  className="w-full flex justify-between items-center py-[5px]"
                >
                  <p>{item.label}</p>
                  <Paragraph copyable>{item.value}</Paragraph>
                </div>
              ))}
            </div>
            {/* Giới thiệu sản  phẩm */}
            <div className="mt-[50px] rounded border-[1px] border-current-color">
              <div className="py-[20px] text-center text-white font-bold border-b-[1px] border-current-color bg-current-color">
                Giới thiệu về sản phẩm
              </div>
              <TextAreaCustom
                queryType="product"
                APIurl={`product/update/${dataMarket.order_id}`}
                className="p-[20px]"
                name={'description'}
                initialValue={`ANOMALY A.I. is a contemporary art collection comprising 888 distinct pieces of AI and machine learning-generated art by the artist Star Im. Each artwork seamlessly melds elements from significant works in the realm of Web 3.0, designs from generative code art, AI art, and digital art. The intention behind this collection is to offer a unified visual art experience, showcasing variations or derivative versions that radiate uniqueness and originality, affectionately referred to as "anomalies" within the studio.
                The creation of ANOMALY A.I. involved harnessing a diverse array of exceptional tools, including RunwayML, Stable Diffusion, Stability AI, Dalle, Midjourney, Pika, as well as Adobe software (Firefly, Illustrator, and Photoshop), along with various 3D programs. Each individual work in this collection is assigned a unique number and comes in 10 editions, ranging from #1 to #10, culminating in a total of 8,880 editions. The artist's signature is on the bottom right corner of every piece within this collection.
                This endeavor represents the initial stage of a multifaceted art journey on the web. It is worth noting that participation in this exploration of machine learning, along with its accompanying artist's journey, is entirely cost-free.`}
              />
            </div>
            {/* Giới thiệu chủ sử hữu */}
            <div className="mt-[50px] rounded border-[1px] border-current-color">
              <div className="py-[20px] text-center text-white font-bold border-b-[1px] border-current-color bg-current-color">
                Chủ sở hữu
              </div>
              <div className="p-[20px] flex justify-around">
                <div className="flex items-center flex-col">
                  <Avatar size={100} src={dataProduct.user?.avatar} />
                  <p className="text-2xl font-bold text-[#222222]">
                    {dataProduct.user?.username}
                  </p>
                </div>
                <div className="flex w-1/2 h-fit flex-col rounded ">
                  <p className="text-center text-white bg-current-color p-[5px] rounded-tl rounded-tr">
                    Liên hệ
                  </p>
                  <Paragraph
                    className=" border-current-color border-[1px] border-t-0 p-[5px]"
                    copyable
                  >
                    {dataProduct.user?.email}
                  </Paragraph>
                  {dataProduct.user?.phone && (
                    <Paragraph
                      className="border-current-color border-[1px] border-t-0 p-[5px]"
                      copyable
                    >
                      {dataProduct.user?.phone}
                    </Paragraph>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-3/5 pl-[20px] rounded overflow-hidden">
            <Carousel
              className="drop-shadow-[0_20px_20px_rgba(0,0,0,0.25)]"
              waitForAnimate={true}
              effect="fade"
              autoplay
            >
              <div>
                <h3 style={contentStyle}>1</h3>
              </div>
              <div>
                <h3 style={contentStyle}>2</h3>
              </div>
              <div>
                <h3 style={contentStyle}>3</h3>
              </div>
              <div>
                <h3 style={contentStyle}>4</h3>
              </div>
            </Carousel>
            <div className="w-full mt-[50px] pl-[50px]">
              <Segmented
                size={'large'}
                options={[
                  { label: 'Bình luận', value: 'COMMENT' },
                  { label: 'Lịch sử giao dịch', value: 'HISTORY' },
                ]}
                onChange={(e) => setChangePageRight(e as string)}
              />
              <div className="w-full mt-[20px]">
                {changePageRight === 'COMMENT' && (
                  <div className="p-[20px] border-[1px] border-current-color rounded">
                    <div className="max-h-[500px] overflow-auto">
                      {commentList.length ? (
                        commentList.map((item: any, index) => (
                          <CommentItem
                            userRole={item.user.email}
                            userName={item.user.username}
                            userAvatar={item.user.avatar}
                            content={item.content}
                            key={index}
                          />
                        ))
                      ) : (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_DEFAULT}
                          description={'Chưa có bình luận nào'}
                        />
                      )}
                    </div>
                    <CommentInput marketId={params.marketId} />
                  </div>
                )}
                {changePageRight === 'HISTORY' && (
                  <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    scroll={{ y: 340 }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {((dataMarket.order_type !== 'SEEDLING_COMPANY' &&
          dataHistory.transactions_sf) ||
          dataHistory.transactions_fm) && (
          <SeedOrigin
            originType={'seed'}
            transactions={
              dataHistory.transactions_sf || dataHistory.transactions_fm
            }
            {...dataHistory}
          />
        )}
        {dataMarket.order_type === 'FARMER' && (
          <div
            //  relative before:content-[''] before:left-[15px] before:absolute before:w-[1px] before:h-full before:bg-black
            className={`border-l-2 border-[#42bb67] block w-2/3 m-auto mt-[150px]`}
          >
            <div className="relative w-fit flex items-center p-[20px] border-[1px] border-[#42bb67] border-l-0">
              <FontAwesomeIcon
                icon={faArrowTrendUp}
                size={'2xl'}
                style={{ color: '#29c214' }}
              />
              <p className="pl-[20px]">Quá trình phát triển </p>
              {dataProduct.created_by === currentUser.id && (
                <PlusCircleTwoTone
                  onClick={() => setOpenGrowUpModal(true)}
                  className="text-2xl absolute right-0 top-1/2 translate-y-[-50%] translate-x-[50%]"
                />
              )}
            </div>
            <div className="ml-[-111px]  max-h-[700px] border-b-[1px] overflow-auto mb-[200px] pl-[100px]">
              {dataGrowUp.length ? (
                dataGrowUp.map((item, index) => (
                  <GrowUpItem {...item} key={index} />
                ))
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_DEFAULT}
                  description={'Chưa có dữ liệu!!'}
                />
              )}
            </div>
            <Modal
              open={openGrowUpModal}
              onCancel={() => setOpenGrowUpModal(false)}
              footer={[]}
            >
              <Typography.Title level={3}>
                Thêm qua trinh phat trien
              </Typography.Title>
              <p className="text-rose-600">
                * Lưu ý: Bạn không thể chỉnh sửa được nội dung khi đã đăng tải
                quá trình phát triển
              </p>
              <GrowUpForm
                onSuccess={() => setOpenGrowUpModal(false)}
                productId={dataMarket.order_id}
              />
            </Modal>
          </div>
        )}
      </div>
      <div className="max-h-[800px] text-white pt-[50px] bg-[#42bb67]">
        <div className="text-5xl mb-[50px] pl-[100px]">
          Giới thiệu chi tiết về sản phẩm
          {dataProduct.created_by === currentUser.id && (
            <Popover title="Tạo thêm mô tả về sản phẩm">
              <PlusCircleTwoTone
                onClick={() => setOpenCreateDescriptionModal(true)}
                className="ml-[50px] text-2xl"
              />
            </Popover>
          )}
          <Modal
            centered
            open={openCreateDescriptionModal}
            onCancel={() => setOpenCreateDescriptionModal(false)}
            footer={[]}
          >
            <CreateDescriptionForm productId={'123'} />
          </Modal>
        </div>
        <div className="max-h-[600px] snap-y bg-white rounded text-[#373737] px-[50px] w-fit flex flex-col gap-y-10 overflow-auto pt-[50px]">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`relative flex ${
                index % 2 && 'flex-row-reverse'
              } items-center scroll-ml-6 justify-between rounded w-full pr-[50px]`}
            >
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      colorPrimaryHover: '#2db457',
                      primaryColor: '#e62929',
                    },
                  },
                  token: {
                    colorBgContainer: '#7f84d4',
                  },
                }}
              >
                {dataProduct.created_by === currentUser.id && (
                  <Popconfirm
                    title={'Xác nhận xóa mô tả này'}
                    onConfirm={() => alert('OK')}
                  >
                    <DeleteTwoTone className="absolute top-1/2 right-0 text-2xl" />
                  </Popconfirm>
                )}
              </ConfigProvider>
              <div className="relative">
                <Image
                  className="object-cover w-1/2 "
                  width={550}
                  height={650}
                  style={{ borderRadius: '10px' }}
                  alt=""
                  src={staticVariables.qc1.src}
                />
                {dataProduct.created_by === currentUser.id && (
                  <Upload
                    showUploadList={false}
                    multiple={false}
                    onChange={onUpload}
                  >
                    <EditTwoTone className="absolute top-0 right-0 translate-x-full translate-y-[-100%] text-2xl" />
                  </Upload>
                )}
              </div>
              <div className="w-1/2 px-[50px]">
                <InputCustom
                  className="text-4xl mb-[20px]"
                  name={''}
                  initialValue={'Nay chị Sốt nên lên bài hơi trễMưa'}
                  APIurl={''}
                  showEdit={dataProduct.created_by === currentUser.id}
                  queryType={'user'}
                  input={{ maxLength: 30 }}
                />
                <TextAreaCustom
                  name={''}
                  showEdit={dataProduct.created_by === currentUser.id}
                  initialValue={`Nay chị Sốt nên lên bài hơi trễMưa quá nên ăn utng hộ c hết
                  sớm nghĩ sớm nhaaa Có quá nhiều đơn trong 1 lúc mà chị chỉ có
                  2 tay + trời mưa to đường trơn mà nhà c cũng không gần KTX lắm
                  nên việc Sót đơn hoặc để các em chờ hơi lâu là một thiết sót
                  lớn với chịCác em bao dung sự bất tiện này nhé LÊN ĐƠN KÈM SỐ
                  PHÒNG DÙM CHỊ BÉ NHÓShip chừ tới #12h đêm giờ nào cũng có các
                  em yên tâm nhaaaChị bé ship cả ngoài kí túc xá nên cứ mạnh dạn
                  lên đơn Đồ ăn chị có : -SET KIMPAD ĐÙI GÀ #30k -ĐUI GÀ CHIÊN
                  XÙ #20k -KIMPAD TRUYỀN THỐNG #15_20k -GỎI CUỐN TÔM THỊT KÈM
                  MẮM #5k -CHÂN GÀ NHỎ-LỚN #20-35k -CÁ VIÊN CHIÊN CHẤM TƯƠNG ỚT
                  #15_20k -CÁ VIÊN CHIÊN MẮM #20k`}
                  APIurl={''}
                  queryType={'product'}
                  input={{ maxLength: 1000 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
