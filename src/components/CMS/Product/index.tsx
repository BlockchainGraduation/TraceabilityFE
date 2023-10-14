import { PlusOutlined } from '@ant-design/icons';
import {
  faCircleXmark,
  faLock,
  faLockOpen,
  faPenToSquare,
  faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Tag,
  Typography,
  UploadFile,
} from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import Upload, { RcFile, UploadChangeParam, UploadProps } from 'antd/es/upload';
import React, { ReactNode, useState } from 'react';

interface DataType {
  key: React.Key;
  index: number;
  productName: string;
  quantity: number;
  price: number;
  date: string;
  status: string;
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
  const [fileList, setFileList] = useState<UploadFile[]>([]);

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
  const columns: ColumnsType<DataType> = [
    {
      title: 'Stt',
      dataIndex: 'index',
      width: 65,
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      width: 250,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
    },
    {
      title: 'Giá đơn vị',
      dataIndex: 'price',
    },
    {
      title: 'Ngày bán',
      dataIndex: 'date',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (value, record, index) =>
        record.index % 2 ? (
          <Tag color={'success'}>Đang mở bán</Tag>
        ) : (
          <Tag color={'error'}>Đóng</Tag>
        ),
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (e) => (
        <Row className="flex gap-x-2">
          <Col span={3}>
            <FontAwesomeIcon
              icon={faPenToSquare}
              style={{ color: '#2657ab' }}
            />
          </Col>
          <Col span={3}>
            {e.index % 2 ? (
              <FontAwesomeIcon icon={faLock} style={{ color: '#a87171' }} />
            ) : (
              <FontAwesomeIcon icon={faLockOpen} style={{ color: '#27913c' }} />
            )}
          </Col>
          <Col span={3}>
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ color: '#c01616' }}
            />
          </Col>
        </Row>
      ),
    },
  ];
  const data: DataType[] = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      key: i,
      index: i + 1,
      productName: 'Sau reing',
      quantity: 2,
      price: 1233,
      date: '12/12/12',
      status: 'ok',
    });
  }
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
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            onFinish={(e) => console.log(e)}
          >
            <Form.Item
              label="Chon giao dịch"
              name="transaction"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Select
                options={[
                  { label: 'Option1', value: 1 },
                  { label: 'Option2', value: 2 },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Tên sản phẩm"
              name="product_name"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Số lượng bán"
              name="quantity"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Giá bán cho từng đơn vị"
              name="price"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Ảnh chính của sản phẩm"
              valuePropName="fileList"
              name={'main-file'}
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
                maxCount={1}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
            </Form.Item>
            <Form.Item
              label="Ảnh banner"
              valuePropName="fileList"
              name={'banner-file'}
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
          dataSource={data}
          pagination={false}
          scroll={{ y: 340 }}
        />
      </div>
    </div>
  );
}
