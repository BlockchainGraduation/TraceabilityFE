import instanceAxios from '@/api/instanceAxios';
import { useAppSelector } from '@/hooks';
import fetchUpdate from '@/services/fetchUpdate';
import useLogin from '@/services/requireLogin';
import { PlusOutlined } from '@ant-design/icons';
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
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Select,
  Tag,
  Typography,
  UploadFile,
  notification,
} from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import Upload, { RcFile, UploadChangeParam, UploadProps } from 'antd/es/upload';
import Link from 'next/link';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

interface DataType {
  key: React.Key;
  index: number;
  id: string;
  name: string;
  quantity: number;
  price: number;
  created_at: string;
  product_status: string;
}
interface FormType {
  key: React.Key;
  name: string;
  price: string;
  quantity: string;
  description: string;
  created_at: string;
  transaction_id: string;
  banner: string;
  avatar: string;
}
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
export default function ProductCMS() {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [totalProduct, setTotalProduct] = useState(0);
  const [listProduct, setListProduct] = useState<DataType[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileAvartar, setFileAvartar] = useState<UploadFile[]>([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [name, setName] = useState('');
  const [hasChange, setHasChange] = useState(0);
  const currentUser = useAppSelector((state) => state.user.user);
  const { mutate } = useSWRConfig();
  const [form] = Form.useForm();

  const fetchProductMe = useCallback(async () => {
    await instanceAxios
      .get(
        `product/me?skip=${skip}&limit=${limit}${name ? '&name=${name}' : ''}`
      )
      .then((res) => {
        console.log(res.data);
        // let newProducts: DataType[] = [];
        // [...res.data.data[1]].map((item, index) => {
        //   return newProducts.push({ ...item, key: skip * limit + index + 1 });
        // });
        const newProducts = [...res.data.data[1]].map((item, index) => ({
          ...item,
          key: skip * limit + index + 1,
        }));
        setTotalProduct(res.data.data[0]);
        setListProduct(newProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [limit, name, skip]);

  useEffect(() => {
    fetchProductMe();
  }, [fetchProductMe, limit, name, skip, hasChange]);
  // const { error, isLoading } = useSWR('product/me', fetchProductMe);

  const handleCancel = () => setPreviewOpen(false);

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

  const handleChangeAvatar: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    // console.log(newFileList);
    info.file.status = 'done';
    setFileAvartar(info.fileList);
  };
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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

  const onFinish = async (e: FormType) => {
    let formData = new FormData();
    formData.append('banner', fileAvartar[0]?.originFileObj as Blob);
    await instanceAxios
      .post(
        `product/create?name=${e.name}${e.price ? `&price=${e.price}` : ''}${
          e.quantity ? `&quantity=${e.quantity}` : ''
        }${e.description ? `&description=${e.description}` : ''}${
          e.transaction_id ? `&transaction_id=${e.transaction_id}` : ''
        }`,
        formData
      )
      .then((res) => {
        setOpenModalCreate(false);
        setHasChange(hasChange + 1);
        form.resetFields();
        notification.success({
          message: 'Thông báo',
          description: 'Tạo sản phẩm thành công',
        });
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: 'Thông báo',
          description: 'Tạo sản phẩm thất bại',
        });
      });
  };
  const columns: ColumnsType<DataType> = [
    {
      key: 0,
      title: 'Stt',
      dataIndex: 'key',
      width: 65,
    },
    {
      key: 1,
      title: 'Product Name',
      dataIndex: 'name',
      width: 250,
    },
    {
      key: 2,
      title: 'Số lượng',
      dataIndex: 'quantity',
    },
    {
      key: 3,
      title: 'Giá đơn vị',
      dataIndex: 'price',
    },
    {
      key: 4,
      title: 'Ngày bán',
      dataIndex: 'created_at',
    },
    {
      key: 5,
      title: 'Trạng thái',
      dataIndex: 'product_status',
      render: (value, record, index) =>
        record.product_status === 'PUBLISH' ? (
          <Tag color={'success'}>Đang mở bán</Tag>
        ) : (
          <Tag color={'error'}>Đóng</Tag>
        ),
    },
    {
      key: 6,
      title: 'Action',
      dataIndex: '',
      render: (value, record, index) => (
        <ConfigProvider
          theme={{
            components: {
              Button: {
                primaryColor: '#e62929',
              },
            },
            token: {
              colorBgContainer: '#7f84d4',
            },
          }}
        >
          <Row className="flex gap-x-2">
            <Col span={3}>
              <Link href={`/product/${record.id}`}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  style={{ color: '#2657ab' }}
                />
              </Link>
            </Col>
            <Col span={3}>
              {record.product_status === 'PUBLISH' ? (
                <FontAwesomeIcon
                  onClick={() => fetchUpdateProductStatus(record.id, 'PRIVATE')}
                  icon={faLockOpen}
                  style={{ color: '#27913c' }}
                />
              ) : (
                <FontAwesomeIcon
                  onClick={() => fetchUpdateProductStatus(record.id, 'PUBLISH')}
                  icon={faLock}
                  style={{ color: '#a87171' }}
                />
              )}
            </Col>
            <Col span={3}>
              <Popconfirm
                title="Sure to open market ?"
                onConfirm={() => fetchCreateMarket(record.id)}
              >
                <FontAwesomeIcon icon={faStore} style={{ color: '#65dd55' }} />
              </Popconfirm>
            </Col>
            <Col span={3}>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => fetchDeleteProduct(record.id)}
              >
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  style={{ color: '#c01616' }}
                />
              </Popconfirm>
            </Col>
          </Row>
        </ConfigProvider>
      ),
    },
  ];

  return (
    <div>
      <div className="flex  items-center justify-between p-[20px] border-[1px] rounded-[10px]">
        <p className="text-3xl font-medium	">Danh sách sản phẩm</p>
        <div
          onClick={() => setOpenModalCreate(true)}
          className="flex items-center rounded-3xl p-[10px] border-[1px] border-[#83B970] rounded-[10px]"
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
          open={openModalCreate}
          onCancel={() => setOpenModalCreate(false)}
          footer={[]}
        >
          <Typography.Title className="w-fit m-auto" level={3}>
            Thêm sản phẩm
          </Typography.Title>
          <Form
            form={form}
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            onFinish={onFinish}
          >
            <Form.Item<FormType>
              label="Chon giao dịch"
              name="transaction_id"
              rules={[
                {
                  required: !(currentUser.system_role === 'SEEDLING_COMPANY'),
                  message: 'Please input your username!',
                },
              ]}
            >
              <Select
                options={[
                  { label: 'Option1', value: 1 },
                  { label: 'Option2', value: 2 },
                  currentUser.system_role === 'SEEDLING_COMPANY'
                    ? { label: 'None', value: 0 }
                    : {},
                ]}
              />
            </Form.Item>
            <Form.Item<FormType>
              label="Tên sản phẩm"
              name="name"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FormType>
              label="Số lượng bán"
              name="quantity"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item<FormType>
              label="Giá bán cho từng đơn vị"
              name="price"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item<FormType>
              label="Ảnh chính của sản phẩm"
              valuePropName="fileList"
              name={'avatar'}
              getValueFromEvent={normFile}
              rules={[
                { required: true, message: 'Please choose your product image' },
              ]}
            >
              <Upload
                // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                // multiple
                // fileList={fileList}
                maxCount={1}
                onPreview={handlePreview}
                onChange={handleChangeAvatar}
              >
                {fileAvartar.length >= 1 ? null : uploadButton}
              </Upload>
            </Form.Item>
            <Form.Item<FormType>
              label="Ảnh banner"
              valuePropName="fileList"
              name={'banner'}
              getValueFromEvent={normFile}
              rules={[
                { required: true, message: 'Please choose your product image' },
              ]}
            >
              <Upload
                // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                multiple
                // fileList={fileList}
                maxCount={8}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 6 ? null : uploadButton}
              </Upload>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={listProduct}
          pagination={{
            onChange: (e) => {
              setSkip(e - 1);
            },
            pageSize: 10,
            total: totalProduct,
            position: ['bottomCenter'],
          }}
          scroll={{ y: 340 }}
        />
      </div>
    </div>
  );
}
