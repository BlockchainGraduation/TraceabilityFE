'use client';
import staticVariables from '@/static';
import {
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
  DatePicker,
  Form,
  Image,
  Input,
  List,
  Modal,
  Row,
  Segmented,
  Table,
  Tag,
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
import CommentItem from '@/components/Contents/ProductInfo/CommentItem';
import { ColumnsType } from 'antd/es/table';
import { CheckoutForm } from '@/components/Contents/common/CheckoutForm';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
interface DataType {
  key: React.Key;
  buyer: ReactNode;
  quantity: number;
  price: number;
  time: string;
  status: ReactNode;
}

export default function ProductInfo() {
  const [openListImageModal, setOpenListImageModal] = useState(false);
  const [openGrowUpModal, setOpenGrowUpModal] = useState(false);
  const [changePageRight, setChangePageRight] = useState('COMMENT');
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
  const [showModalPay, setShowModalPay] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '300px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    borderRadius: '10px',
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

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="w-4/5 m-auto">
      <div className="flex justify-between">
        <Image
          className="object-cover rounded drop-shadow-[0_10px_10px_rgba(0,0,0,0.25)]"
          alt=""
          width={700}
          height={500}
          src={staticVariables.logo.src}
        />
        <div>
          <Typography.Title level={2}>Sau rieng viet nam</Typography.Title>
          <div className="flex gap-x-2 text-[#7B7B7B] font-light">
            San pham cua{' '}
            <p className="text-[#313064] font-bold">SimpRaidenEi</p>
          </div>
          <div className="flex gap-x-4 my-[20px]">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="w-fit items-center py-[10px] px-[20px] bg-lime-50 rounded-2xl border-[1px] border-stone-300"
              >
                <EyeOutlined className="mr-[5px]" />
                12313
              </div>
            ))}
          </div>
          <div className="border-[1px] rounded p-[20px]">
            <div className="flex pb-[10px] mb-[10px] border-b-[1px]">
              <FieldTimeOutlined className="px-[10px] text-2xl" />
              Sell day - 12/12/12
            </div>
            <div>The current price of durian fruit is $1,000 per fruit</div>
            <div className="w-fit flex items-center text-xs m-auto my-[20px]">
              Price<p className="text-3xl">123123 VND</p>
            </div>
            <div className="flex items-center mt-[10px]">
              <Button onClick={() => setShowModalPay(true)} className="w-full">
                Buy now
              </Button>
              <Button
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
                form={{ onFinish: (e) => console.log(e) }}
                initialUser="Trung"
                initialPhone="123123123123"
              />
              {/* {checkoutForm(
                { onFinish: (e) => console.log(e) },
                'Trung',
                '12312312312'
              )} */}
            </Modal>
          </div>
        </div>
      </div>
      <div className="w-full flex mt-[50px]">
        <div className="w-2/5 ">
          <Segmented
            size={'large'}
            options={[
              { label: 'Thông tin', value: '1' },
              { label: 'Lịch sử phát triển', value: '2' },
            ]}
          />
          <div className="flex flex-col w-2/3 px-[20px] py-[15px] border-[1px] rounded">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="w-full flex justify-between items-center py-[5px]"
              >
                <p>Nguyen Van A</p>
                <Paragraph copyable>Sasdasd</Paragraph>
              </div>
            ))}
          </div>
          <div className="px-[10px] py-[15px] mt-[50px] rounded border-[1px]">
            <div className="pb-[10px] pl-[20px] border-b-[1px]">Decription</div>
            <div className="p-[20px] ">
              Nay chị Sốt nên lên bài hơi trễMưa quá nên ăn utng hộ c hết sớm
              nghĩ sớm nhaaa Có quá nhiều đơn trong 1 lúc mà chị chỉ có 2 tay +
              trời mưa to đường trơn mà nhà c cũng không gần KTX lắm nên việc
              Sót đơn hoặc để các em chờ hơi lâu là một thiết sót lớn với chịCác
              em bao dung sự bất tiện này nhé LÊN ĐƠN KÈM SỐ PHÒNG DÙM CHỊ BÉ
              NHÓShip chừ tới #12h đêm giờ nào cũng có các em yên tâm nhaaaChị
              bé ship cả ngoài kí túc xá nên cứ mạnh dạn lên đơn Đồ ăn chị có :
              -SET KIMPAD ĐÙI GÀ #30k -ĐUI GÀ CHIÊN XÙ #20k -KIMPAD TRUYỀN THỐNG
              #15_20k -GỎI CUỐN TÔM THỊT KÈM MẮM #5k -CHÂN GÀ NHỎ-LỚN #20-35k
              -CÁ VIÊN CHIÊN CHẤM TƯƠNG ỚT #15_20k -CÁ VIÊN CHIÊN MẮM #20k
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
                <div className="p-[20px] border-[1px] rounded">
                  <div className="max-h-[500px] overflow-auto">
                    <CommentItem />
                    <CommentItem />
                  </div>
                  <div className="flex mt-[20px]">
                    <Avatar
                      className="mr-[10px]"
                      src={staticVariables.logoRaiden.src}
                    />
                    <Input />
                    <Button className="flex mx-[10px] items-center">
                      <SendOutlined
                        style={{ color: '#366ece' }}
                        className="text-xl text-green"
                      />
                    </Button>
                  </div>
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
      {/* <UserInfoCard /> */}
      {/* <div className="flex w-full flex-col">
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
      </div> */}
      {/* <div className="flex w-full justify-around">
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
      </div> */}
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
      {/* <div>
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
      </div> */}
    </div>
  );
}
