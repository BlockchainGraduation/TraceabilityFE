'use client';
import {
  Avatar,
  Badge,
  Button,
  Carousel,
  Col,
  ConfigProvider,
  Empty,
  Image,
  Input,
  List,
  Modal,
  Pagination,
  Row,
  Segmented,
  Select,
  Skeleton,
  Statistic,
  Typography,
} from 'antd';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import ProductItem from '@/components/Contents/Home/ProductItem';
import staticVariables from '@/static';
import TopBanner from '@/components/Contents/Home/TopBanner';
import {
  AppstoreOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  BarsOutlined,
  CaretDownOutlined,
} from '@ant-design/icons';
import Table, { ColumnsType } from 'antd/es/table';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
// import ProductTodayItem from '@/components/Contents/Home/ProductTodayItem';
import dynamic from 'next/dynamic';
import instanceAxios from '@/api/instanceAxios';
import useSWR, { useSWRConfig } from 'swr';
import Meta from 'antd/es/card/Meta';
import LeaderBoard from './components/LeaderBoard';
import currency from '@/services/currency';
import Category from './components/Category';

const { Search } = Input;
const ProductTodayItem = dynamic(
  () => import('@/components/Contents/Home/ProductTodayItem'),
  {
    loading: () => <Skeleton />,
    ssr: false,
  }
);
// interface MarketType {
//   id?: string;
//   order_type?: string;
//   order_id?: string;
//   order_by?: string;
//   hash_data?: string;
//   created_at?: string;
//   product?: {
//     id?: string;
//     product_type?: string;
//     product_status?: string;
//     name?: string;
//     description?: string;
//     price?: string;
//     quantity?: string;
//     banner?: string;
//     created_by?: string;
//     created_at?: string;
//     user?: {
//       id?: string;
//       avatar?: string;
//       username?: string;
//       email?: string;
//     };
//   };
//   comments?: {
//     content?: string;
//     marketplace_id?: string;
//     user_id?: string;
//     id?: string;
//     created_at?: string;
//     user?: string;
//     reply_comments?: string;
//   };
// }
// interface TopSellingType {
//   Product?: {
//     name?: string;
//     number_of_sales?: number;
//     banner?: string;
//     created_by?: string;
//     description?: string;
//     created_at?: string;
//     price?: number;
//     updated_at?: string;
//     quantity?: number;
//     hashed_data?: string;
//     id?: string;
//     product_status?: string;
//     product_type?: string;
//   };
//   total_quantity?: number;
//   total_sales?: number;
// }
interface DataType {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <ArrowLeftOutlined
      disabled={isFirstItemVisible}
      onClick={() => scrollPrev()}
    />
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <ArrowRightOutlined
      disabled={isLastItemVisible}
      onClick={() => scrollNext()}
    />
  );
}

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [orderType, setOrderType] = useState('');
  const [productName, setProductName] = useState('');
  const [dataTopSelling, setDataTopSelling] = useState<TopSellingType[]>([]);
  const [dataSegmented, setDataSegmented] = useState('FARMER');
  const [limit, setLimit] = useState(10);
  const [listMarket, setListMarket] = useState<MarketType[]>([]);
  const [data, setData] = useState<DataType[]>([]);
  const [totalMarket, setTotalMarket] = useState(0);
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState(false);

  const fetchListMarket = useCallback(async () => {
    await instanceAxios
      .get(
        `marketplace/list?${orderType ? `order_type=${orderType}` : ''}${
          productName ? `&name_product=${productName}` : ''
        }&skip=${currentPage - 1}&limit=${limit}`
      )
      .then((res) => {
        setListMarket(res.data.data.list_marketplace);
        setTotalMarket(res.data.data.total_marketplace);
      })
      .catch((err) => {
        console.log(err);
        setListMarket([]);
      });
  }, [currentPage, limit, orderType, productName]);
  const fetchTopSelling = useCallback(async () => {
    await instanceAxios
      .get(`product/top_selling?product_type=SEEDLING_COMPANY`)
      .then((res) => {
        console.log(res.data.data);
        setDataTopSelling(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setDataTopSelling([]);
      });
  }, [dataSegmented]);
  useEffect(() => {
    fetchTopSelling();
  }, [fetchTopSelling]);
  useEffect(() => {
    fetchListMarket();
  }, [fetchListMarket]);

  useSWR('marketplace/list', fetchListMarket);

  // useEffect(() => {
  //   fetchListMarket();
  // }, [fetchListMarket]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      'https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo'
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);
  return (
    <div className="w-full">
      {/* Top Item */}
      <div className="w-full flex-col items-center bg-[#000000]">
        <div className="w-full flex flex-col">
          <div className="w-1/3 h-[450px] text-white flex items-center ">
            <div className="text-[32px] px-[20px]">
              <p className="font-[600]">Collections. Next Level.</p>
              <p className="text-[16px] text-[#b3b3b3]">
                Discover new collection pages with rich storytelling, featured
                items, and more
              </p>
            </div>
          </div>
        </div>
        <div className="w-full m-auto text-white flex">
          <ScrollMenu
            wrapperClassName="w-full px-[20px] mb-[30px] "
            scrollContainerClassName="mx-[20px]"
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
          >
            {[...Array(10)].map((_, index) => (
              <div key={index} className="relative w-[200px] mx-[20px]">
                <Image
                  width={200}
                  height={200}
                  preview={false}
                  className="rounded object-cover"
                  alt=""
                  src={staticVariables.qc5.src}
                />
                <p className="w-full absolute bottom-0 font-bold p-[20px] text-[14px] bg-gradient-to-t truncate from-[#000000]">
                  World of woment
                </p>
              </div>
            ))}
          </ScrollMenu>
        </div>
      </div>
      {/* LeaderBoard Item */}
      <div className="w-full p-[50px]">
        <ConfigProvider
          theme={{
            components: {
              Segmented: {
                fontSize: 24,
              },
            },
          }}
        >
          <Segmented
            className="font-bold"
            size={'large'}
            options={[
              { label: 'Trending', value: 'TRENDING' },
              { label: 'Top', value: 'TOP ' },
            ]}
          />
        </ConfigProvider>
        <div className="w-full flex justify-between gap-x-16">
          <div className="w-1/2">
            <LeaderBoard listTopSelling={dataTopSelling} />
          </div>
          <div className="w-1/2">
            <LeaderBoard
              skip={dataTopSelling.length}
              listTopSelling={dataTopSelling}
            />
          </div>
        </div>
      </div>
      {/* Category */}
      <div>
        <Category orderType={'FARMER'} title="Farmer" />
        <Category orderType={'MANUFACTURER'} title="Manufacturer" />
        <Category orderType={'SEEDLING_COMPANY'} title="Seed Company" />
      </div>
    </div>
  );
}
