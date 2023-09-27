'use client';
import { Input, Segmented, Select } from 'antd';
import React from 'react';
import { useTheme } from 'next-themes'
import ProductItem from '@/components/Contents/Home/ProductItem';

const { Search } = Input;
export default function HomePage() {
  return (
    <div className="w-full h-full pt-[100px]">
      <div className="flex">
        <Search
          className="m-auto"
          placeholder="input search text"
          onSearch={() => {}}
          style={{ width: 500 }}
        />
      </div>
      <div className='w-1/2 m-auto flex justify-around mt-[50px]'>
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
        <Segmented size={'large'} options={['All', 'Fammer', 'Seed Company', 'Distributer', 'Factory']} />
      </div>
        <ProductItem/>
    </div>
  );
}
