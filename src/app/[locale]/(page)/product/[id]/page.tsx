'use client';
import staticVariables from '@/static';
import {
  MailOutlined,
  PhoneOutlined,
  PlusCircleTwoTone,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  Image,
  Input,
  List,
  Modal,
  Row,
  Table,
  Timeline,
  Typography,
} from 'antd';
import React, { ReactNode, useState } from 'react';
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
import CustomInput from '@/components/Contents/ProductInfo/CustomInput';

export default function ProductInfo() {
  const [openModal, setOpenModal] = useState(false);
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

  return (
    <div className="w-4/5 m-auto">
      <UserInfoCard />
      <div className="flex w-full flex-col">
        <Typography.Title level={2}>Sau rieng viet nam</Typography.Title>
        <div className="w-full flex bg-gray-400	px-[50px] py-[20px] rounded">
          <div className="w-2/5 border-r-[1px]">
            <Row gutter={[0, 48]}>
              <Col span={6}>Ten san pham</Col>
              <Col span={10}>
                {isOwner ? (
                  <CustomInput
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
                  <CustomInput
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
                  <CustomInput
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
                  <CustomInput
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
                  <CustomInput
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
                  <CustomInput
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
      <div className="flex justify-around">
        <div>
          <Image
            preview={false}
            onClick={() => setOpenModal(true)}
            alt=""
            width={200}
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
          <Modal
            open={openModal}
            onCancel={() => setOpenModal(false)}
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
            onClick={() => {}}
            className="text-2xl absolute right-0 top-1/2 translate-y-[-50%] translate-x-[50%]"
          />
        </div>

        <div className="ml-[-111px] h-[500px] border-b-[1px] overflow-auto mb-[200px] pl-[100px]">
          <GrowUpItem />
          <GrowUpItem />
          <GrowUpItem />
        </div>
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

        {/* <Transac  tionItem /> */}
      </div>
    </div>
  );
}
