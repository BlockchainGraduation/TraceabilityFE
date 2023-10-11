'use client';
import staticVariables from '@/static';
import {
  MailOutlined,
  PhoneOutlined,
  PlusCircleTwoTone,
  PlusOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Carousel,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  List,
  Modal,
  Row,
  Table,
  Timeline,
  Typography,
  Upload,
} from 'antd';
import React, { ReactNode, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowTrendUp,
  faClockRotateLeft,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import GrowUpItem from '@/components/Contents/ProductInfo/GrowUpItem';
import DescriptionItem from '@/components/Contents/ProductInfo/DescriptionItem';
import TransactionItem from '@/components/Contents/ProductInfo/TransactionItem';
import UserInfoCard from '@/components/Contents/common/UserInfoCard';
import Paragraph from 'antd/es/typography/Paragraph';
import InputCustom from '@/components/Contents/ProductInfo/CustomInput/InputCustom';
import TextAreaCustom from '@/components/Contents/ProductInfo/CustomInput/TextAreaCustom';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/es/upload';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function ProductInfo() {
  const [openListImageModal, setOpenListImageModal] = useState(false);
  const [openGrowUpModal, setOpenGrowUpModal] = useState(false);
  const [isOwner, setIsOwner] = useState(true);
  const [editProductName, setEditProductName] = useState('Sau rieng thai.');
  const [editProductOrigin, setEditProductOrigin] = useState(
    'Cty hat giong SimpRaiden.'
  );
  const [editProductOwner, setEditProductOwner] = useState('DatBE');
  const [editProductPrice, setEditProductPrice] = useState('2000vnd');
  const [editProductQuantity, setEditProductQuantity] = useState('30');
  const [editProductDescripton, setEditProductDescripton] = useState(
    'DatBe tạo ra một hệ thống minh bạch cho việc theo dõi nguồn gốc của sản phẩm. Thông tin về quá trình sản xuất, vận chuyển và lưu trữ sản phẩm được ghi lại một cách an toàn và không thể thay đổi. Điều này giúp tăng độ tin cậy cho tất cả các bên liên quan, từ nhà sản xuất đến người tiêu dùng cuối cùng.'
  );

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    borderRadius: '5px',
  };

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

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="w-4/5 m-auto">
      {/* <UserInfoCard /> */}
      <div className="flex w-full flex-col">
        <Typography.Title level={2}>Sau rieng viet nam</Typography.Title>
        <div className="w-full flex bg-gray-400 mb-[50px]	px-[50px] py-[20px] rounded">
          <div className="w-2/5 border-r-[1px]">
            <Row gutter={[0, 48]}>
              <Col span={6}>Ten san pham</Col>
              <Col span={10}>
                {isOwner ? (
                  <InputCustom
                    name="name"
                    className={'w-max'}
                    initialValue={editProductName}
                    onKeyDown={() => {}}
                  />
                ) : (
                  <p>{editProductName}</p>
                )}
              </Col>
            </Row>
            <Row>
              <Col span={6}>Nguon goc</Col>
              <Col span={10}>
                {isOwner ? (
                  <InputCustom
                    name="name"
                    className={'w-max'}
                    initialValue={editProductOrigin}
                    onEnter={() => {}}
                  />
                ) : (
                  <p>{editProductOrigin}</p>
                )}
              </Col>
            </Row>
            <Row>
              <Col span={6}>nguoi trong</Col>
              <Col span={10}>
                {isOwner ? (
                  <InputCustom
                    name="name"
                    className={'w-max'}
                    initialValue={editProductOwner}
                    onEnter={() => {}}
                  />
                ) : (
                  <p>{editProductOwner}</p>
                )}
              </Col>
            </Row>
            <Row>
              <Col span={6}>Gia</Col>
              <Col span={10}>
                {isOwner ? (
                  <InputCustom
                    name="name"
                    className={'w-max'}
                    initialValue={editProductPrice}
                    onEnter={() => {}}
                  />
                ) : (
                  <p>{editProductPrice}</p>
                )}
              </Col>
            </Row>
            <Row>
              <Col span={6}>So luong</Col>
              <Col span={10}>
                {isOwner ? (
                  <InputCustom
                    name="name"
                    className={'w-max'}
                    initialValue={editProductQuantity}
                    onEnter={() => {}}
                  />
                ) : (
                  <p>{editProductQuantity}</p>
                )}
              </Col>
            </Row>
          </div>
          <div className="w-3/5 pl-[50px]">
            <Row>
              <Col span={3}>Mo ta</Col>
              <Col span={20}>
                {isOwner ? (
                  <TextAreaCustom
                    name="name"
                    initialValue={editProductDescripton}
                    onEnter={() => {}}
                  />
                ) : (
                  <p>{editProductDescripton}</p>
                )}
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-around">
        <div className="w-4/12 flex flex-col">
          <Image
            preview={false}
            onClick={() => setOpenListImageModal(true)}
            alt=""
            width={200}
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
          <Modal
            open={openListImageModal}
            onCancel={() => setOpenListImageModal(false)}
            footer={[]}
          >
            <Image.PreviewGroup>
              <Image
                alt=""
                width={200}
                src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              />
            </Image.PreviewGroup>
          </Modal>
          <Carousel style={{}} waitForAnimate={true} effect="fade" autoplay>
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
        </div>
        <div className="w-3/5 p-[50px] flex flex-col gap-y-[30px] rounded border-[1px] bg-[#F8F8F8]">
          <Typography.Title className="text-center" level={1}>
            Chi tiet
          </Typography.Title>
          <DescriptionItem />
          <DescriptionItem />
          <DescriptionItem />
        </div>
      </div>
      <div
        //  relative before:content-[''] before:left-[15px] before:absolute before:w-[1px] before:h-full before:bg-black
        className={`border-l-2 block w-fit m-auto mt-[150px]`}
      >
        <div className="relative w-fit flex items-center p-[20px] border-[1px] border-l-0">
          <FontAwesomeIcon
            icon={faArrowTrendUp}
            size={'2xl'}
            style={{ color: '#29c214' }}
          />
          <p className="pl-[20px]">Qua trinh phat trien </p>
          <PlusCircleTwoTone
            onClick={() => setOpenGrowUpModal(true)}
            className="text-2xl absolute right-0 top-1/2 translate-y-[-50%] translate-x-[50%]"
          />
        </div>

        <div className="ml-[-111px] h-[500px] border-b-[1px] overflow-auto mb-[200px] pl-[100px]">
          <GrowUpItem />
          <GrowUpItem />
          <GrowUpItem />
        </div>
        <Modal
          open={openGrowUpModal}
          onCancel={() => setOpenGrowUpModal(false)}
          footer={[]}
        >
          <Typography.Title level={3}>
            Cap nhat qua trinh phat trien
          </Typography.Title>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={(e) => console.log(e)}
          >
            <Form.Item label={'Chon ngay'} name="date">
              <DatePicker onChange={() => {}} />
            </Form.Item>
            <Form.Item
              label="Upload"
              valuePropName="fileList"
              name={'file'}
              getValueFromEvent={normFile}
            >
              <Upload
                // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                multiple
                // fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
            </Form.Item>
            <Form.Item label={'Mota'} name={'description'}>
              <Input.TextArea onChange={() => {}} />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">OK</Button>
            </Form.Item>
          </Form>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <Image alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </Modal>
      </div>
      <div>
        <div className="w-fit flex items-center p-[20px] border-[1px]">
          <FontAwesomeIcon
            size={'2xl'}
            icon={faClockRotateLeft}
            style={{ color: '#8f8f8f' }}
          />
          <p className="pl-[20px]">Lich su giao dich</p>
        </div>
        <div>
          <Input.Search
            className="my-[30px]"
            placeholder="Search transaction"
          />
          <div className="overflow-hidden	rounded">
            <Row className="border-[1px] py-[20px] bg-[#d1d1d1]" align="middle">
              <Col span={8}>
                <p className="text-center">Cong ty</p>
              </Col>
              <Col span={4}>So luong</Col>
              <Col span={4}>Tong gia tri</Col>
              <Col span={4}>Ngay giao dich</Col>
            </Row>
            <List
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 5,
                align: 'center',
              }}
              dataSource={[...Array(20)].map((_, index) => (
                <TransactionItem key={index} />
              ))}
              renderItem={(item) => item}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
