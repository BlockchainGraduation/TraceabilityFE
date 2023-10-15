'use client';
import {
  Badge,
  Carousel,
  Input,
  Modal,
  Pagination,
  Segmented,
  Select,
  Skeleton,
  Typography,
} from 'antd';
import React, { ReactNode, useState } from 'react';
import { useTheme } from 'next-themes';
import ProductItem from '@/components/Contents/Home/ProductItem';
import staticVariables from '@/static';
import TopBanner from '@/components/Contents/Home/TopBanner';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import Table, { ColumnsType } from 'antd/es/table';
// import ProductTodayItem from '@/components/Contents/Home/ProductTodayItem';
import dynamic from 'next/dynamic';

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
  const contentStyle: React.CSSProperties = {
    height: '400px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    borderRadius: '10px',
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
          <Carousel autoplay>
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
        {[...Array(10)].map((_, index) => (
          <Badge.Ribbon text="Hot" color="blue" key={index}>
            <ProductItem
              productId="1"
              productName="Sầu riêng DatBe"
              productImg="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              ownerName="SimpRaidenEi"
              ownerImg={staticVariables.logoRaiden.src}
              role="Fammer"
              likeQuantity={12}
              messageQuantity={12}
              buyerQuantity={12}
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
