'use client';
import {
  Badge,
  Button,
  Carousel,
  Image,
  Input,
  Modal,
  Pagination,
  Segmented,
  Select,
  Skeleton,
  Typography,
} from 'antd';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import ProductItem from '@/components/Contents/Home/ProductItem';
import staticVariables from '@/static';
import TopBanner from '@/components/Contents/Home/TopBanner';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import Table, { ColumnsType } from 'antd/es/table';
// import ProductTodayItem from '@/components/Contents/Home/ProductTodayItem';
import dynamic from 'next/dynamic';
import instanceAxios from '@/api/instanceAxios';
import useSWR, { useSWRConfig } from 'swr';

const { Search } = Input;
const ProductTodayItem = dynamic(
  () => import('@/components/Contents/Home/ProductTodayItem'),
  {
    loading: () => <Skeleton />,
    ssr: false,
  }
);
interface DataType {
  key: React.Key;
  index: number;
  fammer: ReactNode;
  product: number;
  transaction: number;
  sellquantity: number;
}

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [OrderType, setOrderType] = useState('');
  const [nameProduct, setNameProduct] = useState('');
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [listMarket, setListMarket] = useState([]);
  const { mutate } = useSWRConfig();

  const fetchListMarket = useCallback(async () => {
    await instanceAxios
      .get(
        `marketplace/list?${OrderType ? 'order_type=FARMER' : ''}${
          nameProduct ? '&name_product=12' : ''
        }&skip=${skip}&limit=${limit}`
      )
      .then((res) => {
        setListMarket(res.data.data.list_marketplace);
      })
      .catch((err) => console.log(err));
  }, [OrderType, limit, nameProduct, skip]);

  const { error, isLoading } = useSWR('marketplace/list', fetchListMarket);

  // useEffect(() => {
  //   fetchListMarket();
  // }, [fetchListMarket]);

  const contentStyle: React.CSSProperties = {
    height: 100,
    borderRadius: '10px',
    objectFit: 'cover',
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Rank',
      dataIndex: 'index',
      width: 65,
    },
    {
      title: 'Fammer',
      dataIndex: 'fammer',
      width: 250,
    },
    {
      title: 'Product',
      dataIndex: 'product',
    },
    {
      title: 'Transaction',
      dataIndex: 'transaction',
    },
    {
      title: 'Sell Quantity',
      dataIndex: 'sellquantity',
    },
  ];
  const data: DataType[] = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      key: i,
      index: i + 1,
      fammer: `Edward King ${i}`,
      product: 32,
      transaction: i,
      sellquantity: i,
    });
  }
  return (
    <div className="w-full px-[50px]">
      <div className="w-full flex items-center justify-around">
        <div className="w-1/2">
          <Carousel
            className=" rounded-[10px] overflow-hidden h-[400px]"
            autoplay
          >
            <Image
              className="w-full h-full object-cover"
              width={'100%'}
              height={400}
              alt=""
              src={staticVariables.qc1.src}
            />

            <Image
              width={'100%'}
              height={400}
              alt=""
              src={staticVariables.qc3.src}
            />

            <Image
              width={'100%'}
              height={400}
              className="w-full h-full object-cover"
              alt=""
              src={staticVariables.qc2.src}
            />
          </Carousel>
        </div>
        <div className="flex flex-col gap-y-5">
          <TopBanner />
          <TopBanner />
        </div>
      </div>
      <div className="w-full mt-[50px] justify-around flex">
        <div className="w-1/2 ">
          <Segmented
            size={'large'}
            className="my-[20px]"
            options={[
              {
                label: 'Top Fammer',
                value: '1',
                icon: <BarsOutlined />,
              },
              {
                label: 'Top Factory',
                value: '2',
                icon: <AppstoreOutlined />,
              },
              {
                label: 'Top SeedCompany',
                value: '3',
                icon: <AppstoreOutlined />,
              },
            ]}
          />
          <div className="w-full border-2">
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              scroll={{ y: 340 }}
            />
          </div>
        </div>
        <div>
          <Typography.Title level={3}>Top ban chay hom nay</Typography.Title>
          <ProductTodayItem />
          <ProductTodayItem />
        </div>
      </div>
      {/* <div className="flex">
        <Search
          className="m-auto"
          placeholder="Search product"
          onSearch={() => {}}
          style={{ width: 500 }}
        />
      </div> */}
      <div className="w-1/2 flex items-center justify-around mt-[50px]">
        <Segmented
          size={'large'}
          options={['All', 'Fammer', 'Seed Company', 'Distributer', 'Factory']}
        />
        <Select
          labelInValue
          defaultValue={{ value: 'popular', label: 'Popular' }}
          style={{ width: 120 }}
          // onChange={handleChange}
          options={[
            {
              value: 'popular',
              label: 'Popular',
            },
            {
              value: 'lasted',
              label: 'Lasted',
            },
          ]}
        />
      </div>
      <div className="w-full flex flex-wrap gap-y-24 gap-x-12 m-auto mt-[80px] item-center justify-center">
        {listMarket.map((item: any, index) => (
          <Badge.Ribbon text="Hot" color="blue" key={index}>
            <ProductItem
              productId={item.product.id}
              productName={item.product.name}
              productImg={item.product.banner}
              ownerName={item.product.user.username}
              ownerImg={staticVariables.logoRaiden.src}
              role="Fammer"
              likeQuantity={12}
              messageQuantity={12}
              buyerQuantity={12}
              price={item.product.price}
              quantity={item.product.quantity}
            />
          </Badge.Ribbon>
        ))}
      </div>
      <Pagination
        className="w-fit m-auto mt-[50px]"
        current={currentPage}
        onChange={(e) => setCurrentPage(e)}
        total={50}
      />
    </div>
  );
}
