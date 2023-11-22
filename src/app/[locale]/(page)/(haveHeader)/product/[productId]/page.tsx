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
  QRCode,
  Result,
  Tooltip as TooltipAntd,
  Row,
  Segmented,
  Table,
  Tag,
  Timeline,
  Typography,
  Upload,
  UploadFile,
  message,
  notification,
  Space,
  InputNumber,
} from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import React, {
  ReactNode,
  use,
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
import { ColumnsType } from 'antd/es/table';
import { CheckoutForm } from '@/components/Contents/common/CheckoutForm';
import instanceAxios from '@/api/instanceAxios';
import GrowUpForm from '@/components/Contents/ProductInfo/GrowUpForm';
import TextAreaCustom from '@/components/Contents/common/InputCustom/TextAreaCustom';
import InputCustom from '@/components/Contents/common/InputCustom/InputCustom';
import { useAppSelector } from '@/hooks';
import { useEffectOnce } from 'usehooks-ts';
import moment from 'moment';
import { useTranslations } from 'next-intl';
import CreateDescriptionForm from '@/components/Contents/ProductInfo/CreateDescriptionForm';
import { UploadChangeParam } from 'antd/es/upload';
import InputNumberCustom from '@/components/Contents/common/InputCustom/InputNumberCustom';
import { Chart } from '@/components/CMS/Statistical/Chart';
import { Line } from 'react-chartjs-2';
import Link from 'next/link';
import Owner from '../../market/[marketId]/components/Owner';
import ProductOrigin from '../../market/[marketId]/components/PoductOrigin';
import { useRouter } from 'next/navigation';
import Description from '@/components/Contents/ProductInfo/Description';
import useSWR, { useSWRConfig } from 'swr';
import { getCookie } from 'cookies-next';
import currency from '@/services/currency';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { LeftArrow, RightArrow } from '@/app/[locale]/home/components/Category';
import ProductInformation from '@/components/Contents/ProductInfo/ProductInformation';
import CommentItem from '@/components/Contents/ProductInfo/CommentItem';
import CommentInput from '@/components/Contents/common/CommentInput';
import ProductItem from '@/components/Contents/Home/ProductItem';

export default function ProductInfoPage({
  params,
}: {
  params: { productId: string };
}) {
  const [openListImageModal, setOpenListImageModal] = useState(false);
  const [openCreateDescriptionModal, setOpenCreateDescriptionModal] =
    useState(false);
  const [openGrowUpModal, setOpenGrowUpModal] = useState(false);
  const [dataProduct, setDataProduct] = useState<ProductType>({});
  const [listRelatedProduct, setListRelatedProduct] = useState<ProductType[]>(
    []
  );
  const [dataChart, setDataChart] = useState({});
  const [loadingPage, setLoadingPage] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState(0);
  const [buyQuantity, setBuyQuantity] = useState(0);
  const [currentTab, setCurrentTab] = useState<
    'DESCRIPTION' | 'INFORMATION' | 'COMMENT'
  >('DESCRIPTION');
  const [commentList, setCommentList] = useState<CommentItemType[]>([]);
  const [showModalPay, setShowModalPay] = useState(false);
  const { mutate } = useSWRConfig();
  const [loadingBuy, setLoadingBuy] = useState(false);
  const currentUser = useAppSelector((state) => state.user.user);

  const fethProduct = async () => {
    await instanceAxios
      .get(`product/${params.productId}/`)
      .then(async (res) => {
        setDataProduct(res.data || {});
        await instanceAxios
          .get(`filter-product/?create_by=${res.data.create_by.id}`)
          .then(async (res) => {
            setListRelatedProduct(res.data.results || []);
          })
          .catch((err) => setCommentList([]));
      })
      .catch((err) => console.log('asdadasd'))
      .finally(() => setLoadingPage(false));
    await fethComments();
  };

  const fethComments = async () => {
    await instanceAxios
      .get(`comment/filter-comment?product_id=${params.productId}`)
      .then(async (res) => {
        setCommentList(res.data.results || []);
      })
      .catch((err) => setCommentList([]));
  };

  useEffectOnce(() => {
    fethProduct();
  });
  useSWR(`product/${params.productId}`, fethProduct);
  useSWR(`fethComments`, fethComments);

  const fetchBuyProduct = async () => {
    if (buyQuantity === 0) {
      notification.error({
        message: 'Thông báo',
        description: 'Vui lòng chọn số lượng',
      });
    } else {
      setLoadingBuy(true);
      await instanceAxios
        .post('transaction', {
          quantity: buyQuantity,
          price: buyQuantity * dataProduct.price,
          product_id: params.productId,
        })
        .then((res) =>
          notification.success({
            message: 'Thông báo',
            description: 'Mua hàng thành công',
          })
        )
        .catch((err) =>
          notification.error({
            message: 'Thông báo',
            description: 'Mua hàng thất bại',
          })
        )
        .finally(() => setLoadingBuy(false));
    }
  };

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
    !loadingPage && (
      <div className="w-full h-fit m-auto pt-[100px] pb-[50px]">
        {/* {dataProduct.create_by?.id === currentUser.id ? ( */}
        <div className="w-full h-fit flex flex-col">
          <div className="w-4/5 h-fit flex m-auto">
            <div className="w-1/2 ">
              <Image
                className="object-cover rounded-xl"
                width={'100%'}
                height={400}
                preview={false}
                src={dataProduct.avatar}
                alt=""
              />
              <div className="w-full">
                {dataProduct.banner?.length && (
                  <ScrollMenu
                    Footer={[]}
                    noPolyfill
                    wrapperClassName="max-w-full w-fit px-[10px] mb-[30px] "
                    scrollContainerClassName="mx-[20px]"
                    itemClassName="mx-[20px]"
                    LeftArrow={LeftArrow}
                    RightArrow={RightArrow}
                  >
                    {dataProduct.banner?.map((item, index) => (
                      <Image
                        className="object-cover rounded-xl"
                        key={index}
                        width={100}
                        height={100}
                        preview={false}
                        src={item.image}
                        alt=""
                      />
                    ))}
                  </ScrollMenu>
                )}
              </div>
            </div>
            <div className="w-1/2 flex flex-col px-[30px] font-sans">
              <p className="text-[22px] font-normal">{dataProduct.name}</p>
              <Space>
                Create by:
                <Link href={`/user/${dataProduct.create_by?.id}`}>
                  <p className="text-current-color">
                    {dataProduct.create_by?.fullname}
                  </p>
                </Link>
                {/* <p>{moment(dataProduct.create_at).fromNow()}</p> */}
              </Space>
              <Space className="text-current-color font-semibold my-[10px]">
                <p className="text-[#2d2d2d]">Price:</p>
                <p className="text-[12px]">{currency} </p>
                <p className="text-[23px]">{dataProduct.price} </p>
              </Space>
              <p className="text-[14px] tracking-wide  text-[#343434]">
                {dataProduct.description}
              </p>
              <Space className="my-[10px]">
                <p>Category:</p>
                <Tag color={'green'}>{dataProduct.product_type}</Tag>
              </Space>
              <Tag></Tag>
              <Space className="text-current-color font-semibold my-[20px]">
                <p className="text-[#2d2d2d]">Avaialble:</p>
                <p className="text-[12px]">Kg </p>
                <p className="text-[23px]">{dataProduct.quantity} </p>
              </Space>
              <div className="flex items-center gap-x-4 my-[10px]">
                <p>Quantity</p>
                <InputNumber
                  onChange={(e) => setBuyQuantity(e)}
                  defaultValue={0}
                  min={0}
                  max={dataProduct.quantity}
                />
                <button className="bg-current-color text-white font-semibold px-[20px] py-[10px] rounded-xl">
                  Add to cart
                </button>
              </div>
              <div className="w-1/2 mx-auto my-[30px] ">
                <Button
                  onClick={fetchBuyProduct}
                  loading={loadingBuy}
                  disabled={currentUser.id === dataProduct.create_by?.id}
                  className="w-full h-fit rounded-xl font-semibold text-white text-[30px] bg-current-color"
                >
                  Buy now
                </Button>
              </div>
            </div>
          </div>
          <div className="w-4/5 m-auto border-[1px] bg-[#f7f7f7] rounded-xl overflow-hidden">
            <div className="flex w-full text-[20px] text-[#555555] border-b-[1px]">
              <p
                onClick={() => setCurrentTab('DESCRIPTION')}
                className="px-[50px] py-[20px]"
              >
                Description
              </p>
              <p
                onClick={() => setCurrentTab('INFORMATION')}
                className="px-[50px] py-[20px] "
              >
                Infomation
              </p>
              <p
                onClick={() => setCurrentTab('COMMENT')}
                className="px-[50px] py-[20px] "
              >{`Reviews (1)`}</p>
            </div>
            <div className="w-full flex my-[20px]">
              {currentTab === 'DESCRIPTION' && (
                <div className="w-full px-[100px]">
                  {dataProduct.detail_decriptions?.length && (
                    <Carousel>
                      <div>
                        <Description
                          showEdit={false}
                          id={
                            dataProduct.detail_decriptions[selectedDescription]
                              ?.id
                          }
                          title={
                            dataProduct.detail_decriptions[selectedDescription]
                              ?.title
                          }
                          description={
                            dataProduct.detail_decriptions[selectedDescription]
                              ?.description
                          }
                          image={
                            dataProduct.detail_decriptions[selectedDescription]
                              ?.image
                          }
                          product_id={
                            dataProduct.detail_decriptions[selectedDescription]
                              ?.product_id
                          }
                        />
                      </div>
                    </Carousel>
                  )}
                </div>
              )}
              {currentTab === 'INFORMATION' && (
                <div className="m-auto px-[100px]">
                  <ProductInformation data={dataProduct} />
                </div>
              )}
              {currentTab === 'COMMENT' && (
                <div className="w-2/3 m-auto">
                  <p className="mt-[20px] mb-[20px] font-medium text-[18px] text-[#1a1a1a]">
                    {commentList.length} comments for {dataProduct.name}
                  </p>
                  <div>
                    {commentList.map((item, index) => (
                      <CommentItem
                        key={index}
                        isOwner={item.user_id?.id === dataProduct.create_by?.id}
                        {...item}
                      />
                    ))}
                  </div>
                  <CommentInput productId={params.productId} />
                </div>
              )}
            </div>
          </div>
          <div className="w-full px-[30px]">
            <div className="text-center my-[30px] text-[32px] text-[#222222]">
              Related Products
            </div>
            {listRelatedProduct.length && (
              <ScrollMenu
                Footer={[]}
                noPolyfill
                wrapperClassName="max-w-full w-fit px-[10px] mb-[30px] "
                scrollContainerClassName="mx-[20px]"
                itemClassName="m-[20px]"
                LeftArrow={LeftArrow}
                RightArrow={RightArrow}
              >
                {listRelatedProduct.map((item, index) => (
                  <ProductItem key={index} style={'detail'} data={item} />
                ))}
              </ScrollMenu>
            )}
          </div>
        </div>
        {/* ) : (
          <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={
              <Button type={'link'} href="/home">
                Back Home
              </Button>
            }
          />
        )} */}
      </div>
    )
  );
}
