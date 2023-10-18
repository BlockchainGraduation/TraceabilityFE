'use client';
import instanceAxios from '@/api/instanceAxios';
import ProductItem from '@/components/Contents/Home/ProductItem';
import CreateProductForm from '@/components/Contents/User/CreateProductForm';
import UserInfoCard from '@/components/Contents/common/UserInfoCard';
import { useAppSelector } from '@/hooks';
import staticVariables from '@/static';
import {
  ArrowUpOutlined,
  BookOutlined,
  InboxOutlined,
  MessageOutlined,
  PlusCircleOutlined,
  PlusCircleTwoTone,
  ScheduleOutlined,
  StarOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faHandshake,
  faSquarePhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  Card,
  Carousel,
  Col,
  Image,
  Modal,
  Popover,
  Row,
  Statistic,
  Tooltip,
  Typography,
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

export default function UserInfo() {
  const [showCreateProductModal, setShowCreateProductModal] = useState(false);
  const currentUser = useAppSelector((state) => state.user.user);

  const [nameProduct, setNameProduct] = useState('');
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [listProduct, setListProduct] = useState([]);

  const fetchListProductMe = useCallback(async () => {
    await instanceAxios
      .get(
        `product/me?skip=${skip}&limit=${limit}&${
          nameProduct ? `name=${nameProduct}` : ''
        }`
      )
      .then((res) => {
        setListProduct(res.data.data[1]);
      })
      .catch((err) => console.log(err));
  }, [limit, nameProduct, skip]);

  useEffect(() => {
    fetchListProductMe();
  }, [fetchListProductMe]);

  const contentStyle: React.CSSProperties = {
    height: '300px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    borderRadius: '10px',
  };
  const statisticItems = [
    {
      title: 'San pham',
      value: 20,
      valueStyle: { color: '#3f8600' },
      precision: 0,
      prefix: <InboxOutlined />,
      suffix: '',
    },
    {
      title: 'Giao dich',
      value: 40,
      valueStyle: { color: '#3f8600' },
      precision: 0,
      prefix: <BookOutlined />,
      suffix: '',
    },
    {
      title: 'Khach hang',
      value: 40,
      valueStyle: { color: '#3f8600' },
      precision: 0,
      prefix: <TeamOutlined />,
      suffix: '',
    },
    {
      title: 'Cuoc tro chuyen',
      value: 40,
      valueStyle: { color: '#3f8600' },
      precision: 0,
      prefix: <MessageOutlined />,
      suffix: '',
    },
    {
      title: 'Xep hang giao dich',
      value: 40,
      valueStyle: { color: '#3f8600' },
      precision: 0,
      prefix: <ArrowUpOutlined />,
      suffix: '',
    },
    {
      title: 'Danh gia',
      value: 40,
      valueStyle: { color: '#3f8600' },
      precision: 0,
      prefix: <StarOutlined />,
      suffix: '',
    },
    {
      title: 'San pham ban ra',
      value: 40,
      valueStyle: { color: '#3f8600' },
      precision: 0,
      prefix: <ArrowUpOutlined />,
      suffix: '',
    },
  ];
  return (
    <div className="w-full">
      {/* <UserInfoCard showButton={false} /> */}
      <div className="w-full h-fit relative">
        <Image
          className="object-cover"
          width={'100%'}
          height={'400px'}
          alt=""
          src={staticVariables.logo.src}
        />
        <div className="absolute flex flex-col items-center translate-y-[-60%]  translate-x-[50%] bot-0 ">
          <Image
            className="object-cover rounded  drop-shadow-[0_20px_20px_rgba(0,0,0,0.25)] border-2"
            width={200}
            height={200}
            alt=""
            src={staticVariables.logo.src}
          />
          <Typography.Title level={3} className="mt-[20px]">
            {currentUser.username}
          </Typography.Title>
        </div>
      </div>
      <div className="px-[50px] w-full">
        <div className="flex w-full">
          <div className="w-2/5 flex flex-col mt-[100px]">
            <Row className="flex">
              <Col span={2}>
                <FontAwesomeIcon size={'2x'} icon={faSquarePhone} />
              </Col>
              <Col>
                <p>1313123</p>
              </Col>
            </Row>
            <Row className="flex">
              <Col span={2}>
                <FontAwesomeIcon size={'2x'} icon={faSquareFacebook} />
              </Col>
              <Col>
                <p>asdasdaadd</p>
              </Col>
            </Row>
            <Row className="flex">
              <Col span={2}>
                <FontAwesomeIcon size={'2x'} icon={faEnvelope} />
              </Col>
              <Col>
                <p>asdasdaadd</p>
              </Col>
            </Row>
            <div className="pr-[50px] text-justify">
              {`This limited series of Midnight Society Access Passes grants the
              holder studio-specific perks including but not limited to: a
              one-of-a-kind "Variant" 🤣😂😊😊 PFP \n
              (profile pic) with unique VisorCortex,
              Call Sign, and other attributes of various rarity. Founders are
              entitled to voting rights on game features, exclusive access to
              studio events, first dibs on merchandise, early access to the
              latest dev build, and more.`}
            </div>
          </div>
          <div className="flex flex-col w-3/5">
            <div className="w-[500px] m-auto">
              <Carousel waitForAnimate={true} effect="fade" autoplay>
                <div>
                  <h3 style={contentStyle}>1qwe</h3>
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
            <div className="flex px-[30px]">
              <Row gutter={[50, 12]} justify={'space-around'} align={'middle'}>
                {statisticItems.map((item, index) => (
                  <Col key={index}>
                    <Card hoverable className="w-fit" bordered={false}>
                      <Statistic
                        title={item.title}
                        value={item.value}
                        precision={item.precision || 0}
                        valueStyle={item.valueStyle || {}}
                        prefix={item.prefix}
                        suffix={item.suffix}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
        <div>
          <div className="border-[1px] my-[100px]">
            <Typography.Title
              className="absolute py-[10px] pl-[20px] pr-[40px] bg-slate-50 border-[1px] translate-y-[-50%]"
              level={3}
              style={{ margin: 0 }}
            >
              Danh sach san pham
              <Tooltip title="Them san pham">
                <PlusCircleTwoTone
                  onClick={() => setShowCreateProductModal(true)}
                  className="absolute right-0 top-1/2 translate-y-[-50%] translate-x-[50%]"
                />
              </Tooltip>
            </Typography.Title>
          </div>
          <Modal
            onCancel={() => setShowCreateProductModal(false)}
            open={showCreateProductModal}
            footer={[]}
          >
            <p className="text-center py-[50px]">Them san pham</p>
            <CreateProductForm />
          </Modal>
          <div className="flex items-center justify-center px-[50px] flex-wrap gap-20	">
            {listProduct.map((item: any, index) => (
              <ProductItem
                key={index}
                productId={item.id}
                productName={item.name}
                productImg={item.banner}
                // ownerName="SimpRaidenEi"
                // ownerImg={staticVariables.logoRaiden.src}
                // role="Fammer"
                likeQuantity={12}
                messageQuantity={12}
                buyerQuantity={12}
                price={item.price}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
