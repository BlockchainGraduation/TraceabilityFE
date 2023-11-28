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
  RightCircleOutlined,
  RightCircleTwoTone,
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
  Spin,
  Pagination,
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
  useRef,
  useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowTrendUp,
  faDatabase,
  faEnvelope,
  faMobileScreenButton,
  faUser,
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
import { RcFile, UploadChangeParam, UploadProps } from 'antd/es/upload';
import InputNumberCustom from '@/components/Contents/common/InputCustom/InputNumberCustom';
import { Chart } from '@/components/CMS/Statistical/Chart';
import { Line } from 'react-chartjs-2';
import Link from 'next/link';
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
import useLogin from '@/services/requireLogin';
import unit from '@/services/unit';
import Percent from '@/components/CMS/Statistical/Percent';
import getRole from '@/services/getRole';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
export default function ProductInfoComponent({
  edit = false,
  productId,
}: {
  edit?: boolean;
  productId?: number;
}) {
  const [openListImageModal, setOpenListImageModal] = useState(false);
  const [openCreateDescriptionModal, setOpenCreateDescriptionModal] =
    useState(false);
  const [openGrowUpModal, setOpenGrowUpModal] = useState(false);
  const [dataProduct, setDataProduct] = useState<ProductType>({});
  const [listRelatedProduct, setListRelatedProduct] = useState<ProductType[]>(
    []
  );
  const [loadingPage, setLoadingPage] = useState(true);
  const [statisticalProduct, setStatisticalProduct] =
    useState<StatisticalProductType>({});
  const [currentAvatar, setCurrentAvatar] = useState('');
  const [buyQuantity, setBuyQuantity] = useState(0);
  const [currentTab, setCurrentTab] = useState<
    'DESCRIPTION' | 'INFORMATION' | 'COMMENT'
  >('DESCRIPTION');
  const [commentList, setCommentList] = useState<CommentItemType[]>([]);
  const [showModalPay, setShowModalPay] = useState(false);
  const { mutate } = useSWRConfig();
  const { login } = useLogin();
  const [loadingBuy, setLoadingBuy] = useState(false);
  const currentUser = useAppSelector((state) => state.user.user);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [showModalUpload, setShowModalUpload] = useState(false);
  const [showModalListTransaction, setShowModalListTransaction] =
    useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [historyData, setHistoryData] = useState<ProductType[]>([]);
  const [listTransaction, setListTransaction] = useState<TransactionType[]>([]);
  const [countTransaction, setCountTransaction] = useState(0);
  const [currentPageTransaction, setCurrentPageTransaction] = useState(1);
  const [showModalCreateDescription, setShowModalCreateDescription] =
    useState(false);
  const [loadingBanner, setLoadingBanner] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const tNotification = useTranslations('notification');

  // const ref = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   let newChild = ref.current?.lastElementChild?.cloneNode(true);
  // });

  const fethProduct = async () => {
    await instanceAxios
      .get(`product/${productId}/`)
      .then(async (res) => {
        setDataProduct(res.data || {});
        await instanceAxios
          .get(`filter-product/?create_by=${res.data.create_by.id}`)
          .then(async (res) => {
            setListRelatedProduct(res.data.results);
          })
          .catch((err) => setListRelatedProduct([]));
        await instanceAxios
          .get(`statistical-product/${productId}`)
          .then(async (res) => {
            setStatisticalProduct(res.data);
          })
          .catch((err) => setStatisticalProduct({}));
        await instanceAxios
          .get(`hitory-product/${productId}`)
          .then(async (res) => {
            setHistoryData(res.data.detail);
          })
          .catch((err) => setHistoryData([]));
      })
      .catch((err) => console.log('asdadasd'))
      .finally(() => setLoadingPage(false));
    await fethComments();
  };

  const fethComments = async () => {
    await instanceAxios
      .get(`comment/filter-comment?product_id=${productId}`)
      .then(async (res) => {
        {
          setCommentList(res.data.results || []);
        }
      })
      .catch((err) => setCommentList([]));
  };
  const fetchListTransaction = async () => {
    await instanceAxios
      .get(`filter-transaction?product_id=${productId}`)
      .then((res) => {
        setListTransaction(res.data.results);
        setCountTransaction(res.data.count);
      })
      .catch((err) => console.log(err));
  };
  useEffectOnce(() => {
    fethProduct();
  });
  useEffectOnce(() => {
    fetchListTransaction();
  });
  useSWR(`product/${productId}`, fethProduct);
  useSWR(`fethComments`, fethComments);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    );
  };
  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    // console.log(newFileList);
    info.file.status = 'done';
    setFileList(info.fileList);
  };
  const handleSubmitChangeBanner = async () => {
    setLoadingBanner(true);
    let formData = new FormData();
    fileList.map((item) =>
      formData.append('uploaded_images', item.originFileObj as Blob)
    );
    await instanceAxios
      .patch(`product/${productId}/`, formData)
      .then((res) => {
        mutate(`product/${productId}`);
        message.success('Thay đổi thành công');
        setFileList([]);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingBanner(false));
  };

  const fetchAddCart = async () => {
    await instanceAxios
      .post(`cart/`, { product_id: productId })
      .then((res) => {
        message.success('Đã thêm vào giỏ hàng');
        mutate('cart-me');
      })
      .catch((err) => message.warning(tNotification(err.response.data.detail)));
  };

  const getColor = (status: string) => {
    switch (status) {
      case 'PENDDING':
        return 'yellow';
      case 'REJECT':
        return 'red';
      case 'ACCEPT':
        return 'blue';
      case 'DONE':
        return 'green';
      default:
        return 'yellow';
    }
  };

  const onUpload = (e: UploadChangeParam<UploadFile<any>>) => {
    console.log(e);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    !loadingPage && (
      <div className="w-full h-fit flex flex-col">
        <div className="w-4/5 h-fit flex m-auto">
          <div className="w-1/2 ">
            <div className="rounded-xl relative overflow-hidden bg-[#f6f6f6] p-[30px]">
              <Image
                className="object-cover rounded-xl "
                width={'100%'}
                height={400}
                preview={false}
                src={
                  currentAvatar ||
                  dataProduct.avatar ||
                  staticVariables.noImage.src
                }
                alt=""
              />
              {edit && (
                <Upload
                  disabled={loadingAvatar}
                  accept="image/png, image/jpeg, image/jpg"
                  showUploadList={false}
                  method="PATCH"
                  name="avatar"
                  maxCount={1}
                  action={`${process.env.NEXT_PUBLIC_API_ORIGIN}product/${productId}/`}
                  headers={{
                    authorization: `Bearer ${getCookie('access')}`,
                  }}
                  // onChange={handleChangeProductAvatar}
                  onChange={(info) => {
                    setLoadingAvatar(true);
                    if (info.file.status !== 'uploading') {
                      // console.log(info.file, info.fileList);
                    }
                    if (info.file.status === 'done') {
                      // setLoadingAvatar(false);
                      mutate(`product/${productId}`);
                      message.success(`Upload thành công`);
                    } else if (info.file.status === 'error') {
                      message.error(`Upload thất bại`);
                    }
                    setLoadingAvatar(false);
                  }}
                >
                  {loadingAvatar ? (
                    <Spin className="absolute right-0 p-[10px]  top-1/2 shadow-xl -translate-x-1/3" />
                  ) : (
                    <EditTwoTone className="absolute right-0 p-[10px] text-[20px] bg-blue-100 top-1/2 shadow-xl -translate-x-1/3 rounded-full" />
                  )}
                </Upload>
              )}
            </div>
            <div className="w-full relative">
              {dataProduct.banner?.length && (
                <ScrollMenu
                  Footer={[]}
                  noPolyfill
                  wrapperClassName="max-w-full w-fit px-[10px] mb-[30px] "
                  scrollContainerClassName="m-[20px]"
                  itemClassName="mx-[5px]"
                  LeftArrow={LeftArrow}
                  RightArrow={RightArrow}
                >
                  {dataProduct.banner?.map((item, index) => (
                    <Image
                      onClick={() => setCurrentAvatar(item.image || '')}
                      className={`object-cover rounded-xl p-[10px] ${
                        currentAvatar === item.image
                          ? 'bg-current-color'
                          : 'bg-[#f6f6f6]'
                      }`}
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
              {edit && (
                <>
                  {loadingBanner ? (
                    <Spin className="absolute right-0 p-[10px]  top-1/2 shadow-xl -translate-x-1/3" />
                  ) : (
                    <EditTwoTone
                      onClick={() => setShowModalUpload(!showModalUpload)}
                      className="absolute right-0 p-[10px] text-[20px] bg-blue-100 top-1/2 shadow-xl -translate-y-1/2 -translate-x-1/3 rounded-full"
                    />
                  )}

                  <Modal
                    onCancel={() => setShowModalUpload(false)}
                    open={showModalUpload}
                    footer={[]}
                  >
                    <Typography.Title className="text-center" level={4}>
                      Thay đổi hình ảnh
                    </Typography.Title>
                    <Upload
                      // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                      accept="image/png, image/jpeg, image/jpg"
                      listType="picture-card"
                      multiple
                      maxCount={8}
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                    >
                      {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                    <Button
                      loading={loadingBanner}
                      onClick={handleSubmitChangeBanner}
                      className="block m-auto"
                    >
                      Done
                    </Button>
                    <Modal
                      open={previewOpen}
                      title={previewTitle}
                      footer={null}
                      onCancel={() => setPreviewOpen(false)}
                    >
                      <Image
                        alt="example"
                        style={{ width: '100%' }}
                        src={previewImage}
                      />
                    </Modal>
                  </Modal>
                </>
              )}
            </div>
          </div>
          <div className="w-1/2 flex flex-col px-[30px] font-sans ">
            <InputCustom
              showEdit={edit}
              className="text-[22px] font-normal"
              name={'name'}
              initialValue={dataProduct.name || 'Chưa có tên sản phẩm'}
              APIurl={`product/${productId}/`}
              queryType={'product'}
            />
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
              <InputNumberCustom
                showEdit={edit}
                className="text-[23px]"
                name={'price'}
                initialValue={dataProduct.price || 0}
                APIurl={`product/${productId}/`}
                queryType={'product'}
              />
            </Space>
            <TextAreaCustom
              showEdit={edit}
              className="text-[14px] tracking-wide my-[20px] text-[#343434]"
              name={'description'}
              APIurl={`product/${productId}/`}
              queryType={'product'}
              initialValue={
                dataProduct.description || 'Chủ sản phẩm chưa thêm mô tả gì'
              }
            />
            <Space className="my-[10px]">
              <p>Category:</p>
              <Tag color={'green'}>{dataProduct.product_type}</Tag>
            </Space>

            <Tag></Tag>
            <Space className="text-current-color font-semibold my-[20px]">
              <p className="text-[#2d2d2d]">Hiện có :</p>
              <p className="text-[12px]">{unit} </p>
              <InputNumberCustom
                showEdit={edit}
                className="text-[23px]"
                name={'quantity'}
                initialValue={dataProduct.quantity || 0}
                APIurl={`product/${productId}/`}
                queryType={'product'}
              />
            </Space>
            <div className="flex items-center gap-x-4 my-[10px]">
              <p>Số lượng hiện có : </p>
              <InputNumber
                onChange={(e) => setBuyQuantity(e || 0)}
                defaultValue={0}
                min={0}
                max={dataProduct.quantity}
              />
              <button
                disabled={edit}
                onClick={fetchAddCart}
                className="disabled:bg-[#f5f5f5] disabled:cursor-not-allowed bg-current-color text-white disabled:text-[#c7c7c7] font-semibold px-[20px] py-[10px] rounded-xl"
              >
                Thêm giỏ hàng
              </button>
            </div>
            {/* Buy product */}
            <div className="w-1/2 mx-auto my-[30px] ">
              <Modal
                width={'70%'}
                centered
                open={showModalPay}
                onCancel={() => setShowModalPay(false)}
                footer={[]}
              >
                <div className="px-[10px]">
                  <CheckoutForm
                    data={dataProduct}
                    // producId={productId}
                    buyQuantity={buyQuantity}
                    // price={dataProduct.price}
                    // quantity={dataProduct.quantity}
                    onSuccess={() => mutate(`product/${productId}`)}
                  />
                </div>
              </Modal>
              <Button
                onClick={() =>
                  login(() => {
                    buyQuantity
                      ? setShowModalPay(true)
                      : notification.error({
                          message: 'Vui lòng chọn số lượng',
                        });
                  })
                }
                // onClick={() => setShowModalPay(true)}
                // onClick={fetchBuyProduct}
                loading={loadingBuy}
                disabled={currentUser.id === dataProduct.create_by?.id}
                className="w-full h-fit rounded-xl font-semibold text-white text-[30px] bg-current-color"
              >
                Mua ngay
              </Button>
            </div>
          </div>
        </div>
        <div className="w-4/5 m-auto border-[1px]  rounded-xl overflow-hidden">
          <div className="flex w-full text-[20px] bg-[#f6f6f6] text-[#555555] border-b-[1px]">
            <div
              onClick={() => setCurrentTab('DESCRIPTION')}
              className={`px-[50px] flex space-x-5 py-[10px] ${
                currentTab === 'DESCRIPTION' &&
                'border-b-2 border-current-color'
              }`}
            >
              <p>Giới thiệu</p>
              {edit && (
                <PlusCircleTwoTone
                  onClick={() => setShowModalCreateDescription(true)}
                />
              )}
              <Modal
                width={'50%'}
                centered
                open={showModalCreateDescription}
                onCancel={() => setShowModalCreateDescription(false)}
                footer={[]}
              >
                <div className="px-[100px]">
                  <p className="text-[30px] font-semibold text-center py-[50px]">
                    Thêm mô tả cho sản phẩm
                  </p>
                  <CreateDescriptionForm
                    onSuccess={() => mutate(`product/${productId}`)}
                    productId={productId || 0}
                  />
                </div>
              </Modal>
            </div>
            <p
              onClick={() => setCurrentTab('INFORMATION')}
              className={`px-[50px] py-[10px] ${
                currentTab === 'INFORMATION' &&
                'border-b-2 border-current-color'
              }`}
            >
              Thông tin
            </p>
            <p
              onClick={() => setCurrentTab('COMMENT')}
              className={`px-[50px] py-[10px] ${
                currentTab === 'COMMENT' && 'border-b-2 border-current-color'
              }`}
            >{`Bình luận  ( ${commentList.length} )`}</p>
          </div>
          <div className="w-full flex p-[20px]">
            {currentTab === 'DESCRIPTION' && (
              <div className="w-full  px-[100px] ">
                {dataProduct.detail_decriptions?.length ? (
                  <Carousel
                    dots={{
                      className: 'after:bg-red-500',
                    }}
                    autoplay
                    className=" h-[400px] overflow-hidden"
                  >
                    {dataProduct.detail_decriptions.map((item, index) => (
                      <div className="h-[400px]" key={index}>
                        <Description
                          showEdit={edit}
                          id={dataProduct.detail_decriptions?.[index].id || 0}
                          title={dataProduct.detail_decriptions?.[index].title}
                          description={
                            dataProduct.detail_decriptions?.[index].description
                          }
                          image={dataProduct.detail_decriptions?.[index].image}
                          product_id={
                            dataProduct.detail_decriptions?.[index]
                              .product_id || 0
                          }
                        />
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_DEFAULT}
                    description="Chủ sản phẩm vẫn chưa thêm thông tin gì..."
                  />
                )}
              </div>
            )}
            {currentTab === 'INFORMATION' && (
              <div className="w-full m-auto px-[100px]">
                <ProductInformation data={dataProduct} />
              </div>
            )}
            {currentTab === 'COMMENT' && (
              <div className="w-2/3 m-auto">
                <div className="mt-[20px] flex justify-between ">
                  <div className="flex gap-x-3 mb-[20px] font-medium text-[18px] text-[#1a1a1a]">
                    Đã có {commentList.length} bình luận cho{' '}
                    <p className="font-semibold">{dataProduct.name}</p>
                  </div>
                  <p>Xem thêm</p>
                </div>
                <div className="flex max-h-[400px] flex-col-reverse overflow-auto">
                  <div className="">
                    {/* <p className="w-fit m-auto text-blue-500">Xem thêm</p> */}
                    {commentList.map((item, index) => (
                      <CommentItem
                        key={index}
                        isOwner={item.user_id?.id === dataProduct.create_by?.id}
                        {...item}
                      />
                    ))}
                  </div>
                </div>
                <CommentInput productId={productId} />
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex my-[50px] gap-x-5">
          <div className="w-1/2 flex items-center justify-center px-[30px] bg-[#f6f6f6] rounded-xl">
            <div className="w-full p-[20px] flex flex-col border-2 bg-[#fbfbfb] rounded-xl">
              <div className="w-full h-[50px] flex items-center justify-between rounded-full bg-white">
                <FontAwesomeIcon
                  size={'2x'}
                  icon={faDatabase}
                  style={{ color: '#3d6ab8' }}
                />
                <p
                  onClick={() => setShowModalListTransaction(true)}
                  className="p-[10px] bg-[#d7d7d7] rounded-xl"
                >
                  Xem giao dịch
                </p>
              </div>
              <p className="text-[#0b0c50] my-[10px] text-[16px] font-semibold">
                {`Các giao dịch của "${dataProduct.name}"`}
              </p>
              <div className="flex items-baseline justify-center space-x-3">
                <p className="text-gray-500 font-semibold">Đã có</p>
                <p className="text-[#0b0c50] text-[50px] font-semibold">
                  {statisticalProduct.transaction?.transaction_count}
                  {/* {dataProduct.transaction?.transaction_count || 0} */}
                </p>
                <p className="text-gray-500 font-semibold">Giao dịch</p>
              </div>
              <div className="w-full px-[100px]">
                <Percent
                  label="Giao dịch đang chờ xác nhận"
                  total={statisticalProduct.transaction?.transaction_count || 0}
                  value={
                    statisticalProduct.transaction
                      ?.pendding_transaction_count || 0
                  }
                />
                <Percent
                  label="Giao dịch bị từ chối"
                  total={statisticalProduct.transaction?.transaction_count || 0}
                  value={
                    statisticalProduct.transaction?.reject_transaction_count ||
                    0
                  }
                />
                <Percent
                  label="Giao dịch đã xác nhận"
                  total={statisticalProduct.transaction?.transaction_count || 0}
                  value={
                    statisticalProduct.transaction?.accept_transaction_count ||
                    0
                  }
                />
                <Percent
                  label="Giao dịch đã hoàn thành"
                  total={statisticalProduct.transaction?.transaction_count || 0}
                  value={
                    statisticalProduct.transaction?.done_transaction_count || 0
                  }
                />
              </div>
              <Modal
                width={'70%'}
                open={showModalListTransaction}
                // centered
                onCancel={() => setShowModalListTransaction(false)}
                footer={[]}
              >
                <div className="w-full ">
                  <p className="text-[#0b0c50] text-[30px] text-center font-semibold">
                    Các giao dịch
                  </p>
                  {/* <div className="flex w-fit bg-white items-center gap-x-5 py-[10px] px-[20px] rounded-xl border-[1px]">
                    <div>
                      <Avatar
                        size={'large'}
                        src={staticVariables.shrimpBg.src}
                      />
                    </div>
                    <div>
                      <p className="font-semibold">Sau ring vuet</p>
                      <Space>
                        <FontAwesomeIcon icon={faEnvelope} />
                        <p>Đã bán: 12</p>
                      </Space>
                    </div>
                  </div> */}
                </div>
                <div className="w-full p-[20px] bg-white rounded-xl">
                  <Row
                    className="w-full py-[20px] bg-[#f6f6f6]"
                    align={'middle'}
                  >
                    <Col span={2}></Col>
                    <Col span={8}>
                      <p className="">Tên khách hàng</p>
                    </Col>
                    <Col span={3}>
                      <p>Đã mua</p>
                    </Col>
                    <Col span={3}>
                      <p>Tổng phí</p>
                    </Col>
                    <Col span={4}>
                      <p>Ngày GD</p>
                    </Col>
                    <Col span={4}>
                      <p>Trạng thái</p>
                    </Col>
                  </Row>
                  {listTransaction.length ? (
                    listTransaction.map((item, index) => (
                      <Row
                        key={index}
                        className="w-full hover:bg-[#f6f6f6] py-[10px]"
                        align={'middle'}
                      >
                        <Col span={2}>
                          <Avatar
                            className="block m-auto"
                            size={'large'}
                            src={staticVariables.shrimpBg.src}
                          />
                        </Col>
                        <Col span={8}>
                          <p className="">{item.create_by?.fullname}</p>
                        </Col>
                        <Col span={3}>
                          <p>{item.quantity}</p>
                        </Col>
                        <Col span={3}>
                          <p>{item.price}</p>
                        </Col>
                        <Col span={4}>
                          <p>
                            {moment(item.create_at).format(
                              'DD/MM/YYYY - HH:mm:ss'
                            )}
                          </p>
                        </Col>
                        <Col span={4}>
                          <Tag color={getColor(item.status || '')}>
                            {item.status}
                          </Tag>
                        </Col>
                      </Row>
                    ))
                  ) : (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_DEFAULT}
                      description={'Không có dữ liệu'}
                    />
                  )}
                  <Pagination
                    className="w-fit block m-auto mt-[30px]"
                    current={currentPageTransaction}
                    onChange={(e) => setCurrentPageTransaction(e)}
                    total={countTransaction}
                  />
                </div>
              </Modal>
            </div>
          </div>
          <div className="w-1/2 bg-[#f6f6f6] rounded-xl p-[50px] pt-[20px]">
            <p className="text-[#0b0c50] text-[20px] font-semibold py-[20px]">
              Các bên liên quan
            </p>
            <div className="w-full relative flex justify-between before:content-[''] before:absolute before:w-1/3 before:border-b-4 before:top-1/2 before:left-1/3 before:border-current-color before:border-dashed">
              <div className="flex w-1/3 bg-white items-center gap-x-5 py-[10px] px-[20px] rounded-xl border-[1px]">
                <div>
                  <Avatar
                    size={'large'}
                    src={dataProduct.avatar || staticVariables.noImage.src}
                  />
                </div>
                <div>
                  <p className="font-semibold truncate">Sản phẩm</p>
                  <TooltipAntd title={dataProduct.name}>
                    <p className="w-[100px] truncate">{dataProduct.name}</p>
                  </TooltipAntd>
                </div>
              </div>
              <div className="flex w-1/3 bg-white items-center gap-x-5 py-[10px] px-[20px] rounded-xl border-[1px]">
                <div>
                  <Avatar size={'large'} src={staticVariables.shrimpBg.src} />
                </div>
                <div className="w-full flex flex-col gap-y-3">
                  <p className="font-semibold">Chủ sản phẩm</p>
                  <Space className="w-full">
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{ color: '#2b8c3f' }}
                    />
                    <TooltipAntd title={dataProduct.create_by?.fullname}>
                      <p className="w-[100px] truncate">
                        {dataProduct.create_by?.fullname}
                      </p>
                    </TooltipAntd>
                  </Space>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col items-end justify-end">
              {historyData.map(
                (item, index) =>
                  index !== 0 && (
                    <div
                      key={index}
                      className="w-3/5 relative flex justify-end py-[20px] before:absolute before:w-1/3 before:h-full before:border-current-color  before:rounded-bl-2xl before:border-dashed before:border-l-4 before:border-b-4 before:-top-[20px] before:left-0"
                    >
                      <div className="flex w-2/3 bg-white translate-y-1/2 items-center gap-x-5 py-[10px] px-[20px] rounded-xl border-[1px]">
                        <div>
                          <Avatar
                            size={'large'}
                            src={item.avatar || staticVariables.noImage.src}
                          />
                        </div>
                        <div className="flex flex-col gap-y-3">
                          <p className="font-semibold">
                            {getRole(item.product_type || '')}
                          </p>
                          <Space>
                            <FontAwesomeIcon
                              icon={faUser}
                              style={{ color: '#2b8c3f' }}
                            />
                            <p className="w-[100px] truncate">{item.name}</p>
                          </Space>
                        </div>
                      </div>
                    </div>
                  )
              )}
              {/* <div className="w-1/2 relative flex justify-end py-[20px] before:absolute before:w-1/3 before:h-full before:border-current-color  before:rounded-bl-2xl before:border-dashed before:border-l-4 before:border-b-4 before:-top-[20px] before:left-0">
                <div className="flex w-2/3 bg-white translate-y-1/2 items-center gap-x-5 py-[10px] px-[20px] rounded-xl border-[1px]">
                  <div>
                    <Avatar size={'large'} src={staticVariables.shrimpBg.src} />
                  </div>
                  <div>
                    <p className="font-semibold">Nhà máy chế biến</p>
                    <Space>
                      <FontAwesomeIcon
                        icon={faUser}
                        style={{ color: '#2b8c3f' }}
                      />
                      <p className="w-[100px] truncate">Nguyen Van A</p>
                    </Space>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="w-full px-[30px]">
          <div className="text-center my-[30px] text-[32px] text-[#222222]">
            Sản phẩm liên quan
          </div>
          {listRelatedProduct.length ? (
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
          ) : (
            ''
          )}
        </div>
      </div>
    )
  );
}
