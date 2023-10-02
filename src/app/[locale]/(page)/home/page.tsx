'use client';
import { Badge, Input, Segmented, Select } from 'antd';
import React from 'react';
import { useTheme } from 'next-themes';
import ProductItem from '@/components/Contents/Home/ProductItem';
import staticVariables from '@/static';

const { Search } = Input;
export default function HomePage() {
  return (
    <div className="w-full">
      <div className="flex">
        <Search
          className="m-auto"
          placeholder="Search product"
          onSearch={() => {}}
          style={{ width: 500 }}
        />
      </div>
      <div className="w-1/2 m-auto flex items-center justify-around mt-[50px]">
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
        <Segmented
          size={'large'}
          options={['All', 'Fammer', 'Seed Company', 'Distributer', 'Factory']}
        />
      </div>
      <div className="w-4/5 flex flex-wrap gap-y-24 gap-x-12 m-auto mt-[80px] item-center justify-center">
        {[...Array(5)].map((_, index) => (
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
    </div>
  );
}
