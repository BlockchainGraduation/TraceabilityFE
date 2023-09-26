import { Steps } from 'antd';
import React, { useState } from 'react';
import RegisterForm from '../RegisterForm';

export default function RegisterEnterprise() {
    const [current, setCurrent] = useState(0);

  const items=[
    {
      title: 'Bạn muốn đóng vai trò gì trong hệ thống?',
      description:<RegisterForm/>,
    },
    {
      title: 'In Progress',
    //   subTitle: 'Left 00:00:08',
    description:'aaaaa',
    },
    {
      title: 'Waiting',
      description:'vbbbbbb',
    },
  ]

  return (
    <div>
      <Steps
        current={current}
        percent={60}
        direction="vertical"
        items={items.map((item,index)=>({key: index, title: item.title, description:item.description}))}
        onChange={()=>{}}
      />
    </div>
  );
}
