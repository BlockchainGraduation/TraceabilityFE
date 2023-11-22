import instanceAxios from '@/api/instanceAxios';
import CreateProductForm from '@/components/Contents/common/CreateProductForm';
import { useAppSelector } from '@/hooks';
import fetchUpdate from '@/services/fetchUpdate';
import useLogin from '@/services/requireLogin';
import {
  ExclamationCircleTwoTone,
  LeftCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  faCircleXmark,
  faLock,
  faLockOpen,
  faPenToSquare,
  faSquarePlus,
  faStore,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  ConfigProvider,
  Dropdown,
  Empty,
  Form,
  Input,
  InputNumber,
  MenuProps,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Tag,
  Typography,
  UploadFile,
  notification,
} from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import Upload, { RcFile, UploadChangeParam, UploadProps } from 'antd/es/upload';
import Link from 'next/link';
import React, {
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { useEffectOnce } from 'usehooks-ts';
import moment from 'moment';
import CMSProductItem from './CMSProductItem';
import TransactionItemSelect from './TransactionItemSelect';

// interface DataType {
//   key: React.Key;
//   index: number;
//   id: string;
//   name: string;
//   quantity: number;
//   price: number;
//   created_at: string;
//   product_status: string;
// }

export default memo(function ProductCMS() {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [totalProduct, setTotalProduct] = useState(0);
  const [listProduct, setListProduct] = useState<ProductType[]>([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [name, setName] = useState('');
  const [hasChange, setHasChange] = useState(0);
  const [transactionId, setTransactionId] = useState(0);
  const [currentModalPage, setCurrentModalPage] = useState<
    'SELECT_TRANSACTION' | 'CREATE_PRODUCT'
  >('SELECT_TRANSACTION');
  const [listTransaction, setListTransaction] = useState<
    DetailTransactionType[]
  >([]);
  const currentUser = useAppSelector((state) => state.user.user);
  const { mutate } = useSWRConfig();

  useEffectOnce(() => {
    fetchListTransaction();
  });

  const changeCurrentModalPageToCreate = (e?: number) => {
    setCurrentModalPage('CREATE_PRODUCT');
    setTransactionId(e || 0);
  };
  const fetchListTransaction = async () => {
    await instanceAxios(`transaction-me?status=DONE`)
      .then((res) => {
        setListTransaction(res.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchProductMe = useCallback(async () => {
    await instanceAxios
      .get(`product-me/?create_by=${currentUser.id}`)
      .then((res) => {
        setListProduct(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUser.id]);

  useEffect(() => {
    fetchProductMe();
  }, [fetchProductMe]);
  useSWR('product/me', fetchProductMe);

  // const handleCancel = () => setPreviewOpen(false);

  const fetchDeleteProduct = async (productId: string) => {
    await instanceAxios
      .delete(`product/${productId}/delete`)
      .then((res) => {
        setHasChange(hasChange + 1);
        notification.success({
          message: 'Thông báo',
          description: `Đã xóa sản phẩm`,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="transition duration-150 ease-out">
      <div className="flex items-center bg-[#f6f6f6] justify-between p-[20px] border-[1px] rounded-[10px]">
        <p className="text-3xl font-medium">Sản phẩm của bạn</p>
        <div
          onClick={() => setOpenModalCreate(true)}
          className="flex items-center p-[10px] border-[1px] border-[#83B970] rounded-[10px]"
        >
          <FontAwesomeIcon
            className="mr-[10px]"
            size={'2x'}
            icon={faSquarePlus}
            style={{ color: '#21a147' }}
          />
          Thêm sản phẩm
        </div>
        <Modal
          centered
          open={openModalCreate}
          width={700}
          title={
            currentModalPage === 'CREATE_PRODUCT' && (
              <div
                className="flex items-center space-x-2"
                onClick={() => setCurrentModalPage('SELECT_TRANSACTION')}
              >
                <LeftCircleOutlined className="text-blue-500 text-[18px]" />
                <p>Quay lại</p>
              </div>
            )
          }
          onCancel={() => setOpenModalCreate(false)}
          footer={[]}
        >
          <p className="w-2/3 m-auto my-[20px]  text-center rounded-xl bg-[#f6f6f6] text-[30px]">
            {currentUser.role === 'FACTORY'
              ? `Thêm sản phẩm`
              : currentModalPage === 'CREATE_PRODUCT'
              ? `Thêm sản phẩm`
              : `Chọn hóa đơn`}
          </p>
          {currentUser.role === 'FACTORY' ? (
            <CreateProductForm
              onSuccess={() => {
                setOpenModalCreate(false);
                mutate('product/me');
              }}
            />
          ) : (
            <div className="w-full ">
              {currentModalPage === 'SELECT_TRANSACTION' && (
                <div className="w-full ">
                  {listTransaction.length ? (
                    <div className="w-full">
                      <Row className="bg-[#f6f6f6] text-[18px] font-semibold p-[10px] rounded-xl">
                        <Col span={8}>
                          <p>Sản phẩm</p>
                        </Col>
                        <Col span={6}>
                          <p>Người bán</p>
                        </Col>
                        <Col span={3}>
                          <p>Đã mua</p>
                        </Col>
                        <Col span={3}>
                          <p>Giá</p>
                        </Col>
                        <Col span={4}>
                          <p>Ngày mua</p>
                        </Col>
                      </Row>
                      <div className="w-full flex flex-col gap-y-1 overflow-auto py-[20px]">
                        {listTransaction.map((item, index) => (
                          <TransactionItemSelect
                            divProps={{
                              onClick: () =>
                                changeCurrentModalPageToCreate(item.id),
                              // className: 'hover:bg-[#f6f6f6]',
                            }}
                            key={index}
                            data={item}
                          />
                          // <TransactionSelectItem
                          //   transactionId={item.id || ''}
                          //   onFinish={changeCurrentModalPageToCreate}
                          //   key={index}
                          //   image={item.product?.banner || ''}
                          //   productName={item.product?.name || ''}
                          //   owner={item.product?.user?.username || ''}
                          //   priceTotal={item.price || 0}
                          //   buyQuantity={item.quantity || 0}
                          //   buyDay={item.created_at || ''}
                          // />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_DEFAULT}
                      description={
                        'Bạn không có giao dịch nào! Vui lòng mua sản phẩm phù hợp cho bạn rồi quay lại !!!'
                      }
                    />
                  )}
                </div>
              )}
              {currentModalPage === 'CREATE_PRODUCT' && (
                <CreateProductForm
                  onSuccess={() => {
                    setOpenModalCreate(false);
                    mutate('product/me');
                  }}
                  transactionId={transactionId}
                />
              )}
            </div>
          )}
        </Modal>
      </div>
      <div className="p-[30px]">
        <Row className="py-[10px] bg-[#fafafa]">
          <Col span={1}>
            <p className="text-center">Stt</p>
          </Col>
          <Col span={7}>
            <p>Tên sản phẩm</p>
          </Col>
          <Col span={3}>
            <p>Giá đơn vị</p>
          </Col>
          <Col span={3}>
            <p>Số lượng bán</p>
          </Col>
          <Col span={4}>
            <p>Ngày tạo</p>
          </Col>
          <Col span={2}>
            <p>Tình trạng</p>
          </Col>
          <Col span={4}>
            <p className="text-center">Thao tác</p>
          </Col>
        </Row>
        {listProduct.map((item, index) => (
          <CMSProductItem key={index} index={index + 1} data={item} />
        ))}
      </div>
    </div>
  );
});
