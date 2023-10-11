import staticVariables from '@/static';
import { Button, Image, Statistic, Typography } from 'antd';
import React from 'react';

export default function ProductTodayItem() {
  return (
    <div className="flex p-[20px] h-fit justify-between w-[600px]">
      <Image
        className="object-cover rounded"
        alt=""
        width={200}
        height={200}
        src={staticVariables.logoRaiden.src}
      />
      <div className="w-3/5 py-[10px]">
        <Typography.Title level={3}>Bad private</Typography.Title>
        <div className="flex mb-[10px] gap-x-3 font-thin text-base">
          Sản phẩm của<p className="text-[#313064] font-medium">SimpRaiden</p>
        </div>
        <div className="flex justify-between pr-[50px]">
          <Statistic title="Sold " value={112893} />
          <Statistic title="Transaction" value={112893} />
        </div>
        <Button className="w-full block m-auto mt-[10px]">Buy now</Button>
      </div>
    </div>
  );
}
