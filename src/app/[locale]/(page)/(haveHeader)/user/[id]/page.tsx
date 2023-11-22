'use client';
import instanceAxios from '@/api/instanceAxios';
import ProductItem from '@/components/Contents/Home/ProductItem';
import TextAreaCustom from '@/components/Contents/common/InputCustom/TextAreaCustom';
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
  Collapse,
  ConfigProvider,
  Empty,
  Image,
  Modal,
  Popover,
  QRCode,
  Row,
  Space,
  Statistic,
  Tooltip,
  Typography,
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import MarketItem from '@/app/[locale]/home/components/MarketItem';
import { useEffectOnce } from 'usehooks-ts';
import UserInformation from './components/UserInformation';

export default function UserInfo({ params }: { params: { id: string } }) {
  const [showCreateProductModal, setShowCreateProductModal] = useState(false);
  const currentUser = useAppSelector((state) => state.user.user);
  const [nameProduct, setNameProduct] = useState('');
  const [currentTab, setCurrentTab] = useState<'STORY' | 'PRODUCT'>('STORY');
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [dataUser, setDataUser] = useState<UserType>({});
  const [listProduct, setListProduct] = useState<ProductType[]>([]);

  const fetchUserByID = useCallback(async () => {
    await instanceAxios
      .get(`user/${params.id}`)
      .then((res) => {
        setDataUser(res.data.user);
        setListProduct(res.data.products);
      })
      .catch((err) => console.log(err));
  }, [params.id]);
  useEffectOnce(() => {
    fetchUserByID();
  });

  return (
    <div className="w-full pt-[50px]">
      <div className="w-2/3 m-auto ">
        <div className="w-full">
          <Image
            className="object-cover rounded-xl"
            width={'100%'}
            height={400}
            preview={false}
            src={dataUser.avatar}
            alt=""
          />
        </div>
        <div className="relative w-full pt-[20px] pb-[50px] border-b-[1px] border-gray-300">
          <div className="w-fit -translate-y-10 absolute bottom-0 left-[5%] bg-white rounded-full p-[5px]">
            <Avatar size={150} src={dataUser.avatar} />
          </div>
          <div className="w-full flex pl-[25%]  ">
            <div className="w-1/2">
              <p className="text-[32px] truncate font-bold pr-[30%]">
                {dataUser.fullname}
              </p>
              <p className="text-[16px] font-semibold text-[#65676B]">
                {listProduct.length} Product
              </p>
            </div>
            <div className="w-1/2">
              <p className="px-[20px] rounded-xl text-white font-semibold  text-center bg-current-color py-[10px]">
                {dataUser.role}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full text-[18px] font-semibold flex cursor-pointer">
          <p
            onClick={() => setCurrentTab('STORY')}
            className={`px-[30px] py-[15px] ${
              currentTab === 'STORY' && 'border-b-2 border-current-color'
            }`}
          >
            Tiểu sử
          </p>
          <p
            onClick={() => setCurrentTab('PRODUCT')}
            className={`px-[30px] py-[15px] ${
              currentTab === 'PRODUCT' && 'border-b-2 border-current-color'
            }`}
          >
            Sản phẩm
          </p>
        </div>
      </div>
      <div className="w-full bg-[#f0f2f5] px-[200px] py-[30px]">
        <div>
          {currentTab === 'STORY' && <UserInformation data={dataUser} />}
        </div>
        {currentTab === 'PRODUCT' && (
          <div className="w-full flex flex-wrap gap-5">
            {listProduct.length ? (
              listProduct.map((item, index) => (
                <ProductItem
                  key={index}
                  isOwner={currentUser.id === item.create_by?.id}
                  data={item}
                />
              ))
            ) : (
              <Empty
                className="m-auto"
                image={Empty.PRESENTED_IMAGE_DEFAULT}
                description="Chưa có thông tin về sản phẩm"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
