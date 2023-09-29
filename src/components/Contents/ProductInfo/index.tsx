'use client';
import staticVariables from '@/static';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  Image,
  Modal,
  Row,
  Table,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import DescriptionItem from './DescriptionItem';

export default function ProductInfo() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="w-4/5 m-auto">
      <div className="flex items-center border-b-[1px] pb-[50px]">
        <div className="flex items-center gap-y-5 flex-col w-1/5">
          <Avatar size={150} src={staticVariables.logoRaiden.src} />
          <Button>Xem them</Button>
        </div>
        <div className="flex gap-y-5 flex-col border-[1px] px-[30px] py-[20px] rounded">
          <div className="">
            <MailOutlined />
            Nguyen Van A
          </div>
          <div className="">
            <PhoneOutlined />
            0123131313
          </div>
          <div className="flex">
            <FontAwesomeIcon width={20} icon={faLocationDot} />
            Nguyen Van A
          </div>
          <div className="flex">
            <FontAwesomeIcon width={20} icon={faLocationDot} />
            14 - Doan Uan - Khue My - NHS - DN
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col">
        <Typography.Title level={2}>Sau rieng viet nam</Typography.Title>
        <div className="w-full flex bg-gray-400	px-[100px] py-[20px] rounded">
          <div className="w-2/5 border-r-[1px]">
            <Row gutter={[0, 48]}>
              <Col span={6}>Ten san pham</Col>
              <Col span={10}>Sau rieng viet nam</Col>
            </Row>
            <Row>
              <Col span={6}>Nguon goc</Col>
              <Col span={10}>Cty hat giong </Col>
            </Row>
            <Row>
              <Col span={6}>nguoi trong</Col>
              <Col span={10}>Nguyen Van A</Col>
            </Row>
            <Row>
              <Col span={6}>Gia</Col>
              <Col span={10}>50.000</Col>
            </Row>
            <Row>
              <Col span={6}>So luong</Col>
              <Col span={10}>30</Col>
            </Row>
          </div>
          <div className="w-3/5 pl-[50px]">
            <Row>
              <Col span={3}>Mo ta</Col>
              <Col span={20}>
                DatBe tạo ra một hệ thống minh bạch cho việc theo dõi nguồn gốc
                của sản phẩm. Thông tin về quá trình sản xuất, vận chuyển và lưu
                trữ sản phẩm được ghi lại một cách an toàn và không thể thay
                đổi. Điều này giúp tăng độ tin cậy cho tất cả các bên liên quan,
                từ nhà sản xuất đến người tiêu dùng cuối cùng
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
        <div className="w-3/5 p-[50px] flex flex-col gap-y-[30px] rounded border-[1px]">
          <Typography.Title className="text-center" level={1}>
            Chi tiet
          </Typography.Title>
          <DescriptionItem />
          <DescriptionItem />
          <DescriptionItem />
        </div>
      </div>
    </div>
  );
}
