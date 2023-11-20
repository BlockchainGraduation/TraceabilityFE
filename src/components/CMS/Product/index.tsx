import instanceAxios from '@/api/instanceAxios';
import CreateProductForm from '@/components/Contents/common/CreateProductForm';
import { useAppSelector } from '@/hooks';
import fetchUpdate from '@/services/fetchUpdate';
import useLogin from '@/services/requireLogin';
import { ExclamationCircleTwoTone, PlusOutlined } from '@ant-design/icons';
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
import TransactionSelectItem from './TransactionSelectItem';
import moment from 'moment';
import CMSProductItem from './CMSProductItem';

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
interface TransactionType {
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
}

export default memo(function ProductCMS() {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [totalProduct, setTotalProduct] = useState(0);
  const [listProduct, setListProduct] = useState<ProductType[]>([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [name, setName] = useState('');
  const [hasChange, setHasChange] = useState(0);
  const [transactionId, setTransactionId] = useState('');
  const [currentModalPage, setCurrentModalPage] = useState<
    'SELECT_TRANSACTION' | 'CREATE_PRODUCT'
  >('SELECT_TRANSACTION');
  const [listTransaction, setListTransaction] = useState<TransactionType[]>([]);
  const currentUser = useAppSelector((state) => state.user.user);
  const { mutate } = useSWRConfig();

  useEffectOnce(() => {
    fetchListTransaction();
  });

  const changeCurrentModalPageToCreate = (e: string) => {
    setCurrentModalPage('CREATE_PRODUCT');
    setTransactionId(e);
  };
  const fetchListTransaction = async () => {
    await instanceAxios(
      `${
        currentUser.role === 'FARMER' ? 'transaction_sf' : 'transaction_fm'
      }/list?skip=0&limit=100`
    )
      .then((res) => {
        setListTransaction(
          currentUser.role === 'FARMER'
            ? res.data.data.list_transaction_sf
            : res.data.data.list_transaction_fm
        );
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

  const fetchCreateMarket = async (productId: string) => {
    await instanceAxios
      .post(`marketplace/create?product_id=${productId}`)
      .then((res) => {
        notification.success({
          message: 'Thông báo',
          description: 'Tạo market thành công',
        });
      })
      .catch((err) => {
        notification.error({
          message: 'Thông báo',
          description: 'Tạo market thất bại',
        });
      });
  };
  const fetchUpdateProductStatus = async (
    productId: string,
    status: string
  ) => {
    await instanceAxios
      .put(`product/${productId}/status?product_status=${status}`)
      .then((res) => {
        setHasChange(hasChange + 1);
        notification.success({
          message: 'Thông báo',
          description: `Đổi trạng thái thành công --> ${status}`,
        });
        mutate('product/me');
      })
      .catch((err) => {});
  };

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
      <div className="flex items-center justify-between p-[20px] border-[1px] rounded-[10px]">
        <p className="text-3xl font-medium">Danh sách sản phẩm</p>
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
              <p onClick={() => setCurrentModalPage('SELECT_TRANSACTION')}>
                Quay lại
              </p>
            )
          }
          onCancel={() => setOpenModalCreate(false)}
          footer={[]}
        >
          <Typography.Title className="w-fit m-auto" level={3}>
            {currentModalPage === 'CREATE_PRODUCT'
              ? `Thêm sản phẩm`
              : `Chọn hóa đơn`}
          </Typography.Title>
          {currentModalPage === 'SELECT_TRANSACTION' && (
            <div>
              {listTransaction.length ? (
                <>
                  <p className="py-[10px]">
                    * Nhắc nhở: Bạn có thể bỏ qua bước này nếu bạn là công ty
                    hạt giống
                  </p>
                  <div className="max-h-[600px] overflow-auto">
                    {listTransaction.map((item, index) => (
                      <TransactionSelectItem
                        transactionId={item.id || ''}
                        onFinish={changeCurrentModalPageToCreate}
                        key={index}
                        image={item.product?.banner || ''}
                        productName={item.product?.name || ''}
                        owner={item.product?.user?.username || ''}
                        priceTotal={item.price || 0}
                        buyQuantity={item.quantity || 0}
                        buyDay={item.created_at || ''}
                      />
                    ))}
                    {currentUser.role === 'SEEDLING_COMPANY' && (
                      <Button
                        className="m-auto block"
                        onClick={() => setCurrentModalPage('CREATE_PRODUCT')}
                      >
                        Bỏ qua
                      </Button>
                    )}
                  </div>
                </>
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
