import instanceAxios from '@/api/instanceAxios';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Select,
  notification,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Upload, {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from 'antd/es/upload';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

interface FormType {
  key: React.Key;
  name: string;
  price: string;
  quantity: string;
  description: string;
  // created_at: string;
  transaction_id?: string;
  banner: string;
  uploaded_images: any;
  avatar: any;
}
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
export default function CreateProductForm({
  transactionId,
  onSuccess,
}: {
  transactionId?: number;
  onSuccess?: () => void;
}) {
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const currentUser = useAppSelector((state) => state.user.user);
  const tNotification = useTranslations('notification');

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileAvartar, setFileAvartar] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchListTransaction = async () => {
      await instanceAxios(`transaction_sf/list?skip=0&limit=100`)
        .then((res) => {
          //   const transactionSelect= [...res.data.data.list_transaction_sf].map((item,index)=>({}))
        })
        .catch((err) => console.log(err));
    };
    fetchListTransaction();
  }, []);

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
  const onFinish = async (e: FormType) => {
    setLoading(true);
    let formData = new FormData();
    formData.append('avatar', fileAvartar[0].originFileObj as RcFile);
    fileList.map((item) =>
      formData.append('uploaded_images', item.originFileObj as RcFile)
    );
    formData.append('name', e.name);
    formData.append('description', e.description);
    formData.append('price', e.price);
    formData.append('quantity', e.quantity);
    formData.append('product_type', currentUser.role || '');
    transactionId &&
      formData.append('transaction_id', transactionId.toString());

    await instanceAxios
      .post(`product/`, formData)
      .then((res) => {
        form.resetFields();
        notification.success({
          message: 'Thông báo',
          description: 'Tạo sản phẩm thành công',
        });
        onSuccess?.();
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: 'Thông báo',
          description: 'Tạo sản phẩm thất bại',
        });
      })
      .finally(() => setLoading(false));
  };
  return (
    <div>
      <Form
        layout={'vertical'}
        form={form}
        // labelCol={{ span: 10 }}
        // wrapperCol={{ span: 14 }}
        className="px-[100px]"
        onFinish={onFinish}
      >
        <Form.Item<FormType>
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: tNotification('REQUIRED_FIELD') }]}
        >
          <Input placeholder="Nhập tên sản phẩm..." />
        </Form.Item>
        <Form.Item<FormType>
          // className="w-1/2"
          label="Nhập số lượng bán"
          name="quantity"
          rules={[{ required: true, message: tNotification('REQUIRED_FIELD') }]}
        >
          <InputNumber
            placeholder="Số lượng bán..."
            className="w-1/2"
            min={0}
          />
        </Form.Item>
        <Form.Item<FormType>
          label="Giá bán của 1 sản phẩm"
          name="price"
          rules={[{ required: true, message: tNotification('REQUIRED_FIELD') }]}
        >
          <InputNumber
            placeholder="Nhập giá tiền của 1 sản phẩm..."
            className="w-1/2"
            min={0}
          />
        </Form.Item>
        <Form.Item<FormType>
          // className="w-1/2"
          label="Giới thiệu chút về sản phẩm"
          name="description"
          rules={[{ required: true, message: tNotification('REQUIRED_FIELD') }]}
        >
          <TextArea
            placeholder="Nhập giới thiệu ngắn về sản phẩm..."
            autoSize
            maxLength={255}
          />
        </Form.Item>
        <Form.Item<FormType>
          label="Ảnh chính của sản phẩm"
          valuePropName="fileList"
          name={'avatar'}
          getValueFromEvent={normFile}
          rules={[{ required: true, message: tNotification('REQUIRED_FIELD') }]}
        >
          <Upload
            accept="image/png, image/jpeg, image/jpg"
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
          name={'uploaded_images'}
          getValueFromEvent={normFile}
          rules={[{ required: true, message: tNotification('REQUIRED_FIELD') }]}
        >
          <Upload
            accept="image/png, image/jpeg, image/jpg"
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
        <Form.Item>
          <Button className="m-auto block" loading={loading} htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Modal
        open={previewOpen}
        onCancel={() => setPreviewOpen(false)}
        footer={[]}
      >
        <Image alt="" src={previewImage} />
      </Modal>
    </div>
  );
}
