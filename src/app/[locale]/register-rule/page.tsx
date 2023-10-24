'use client';
import RoleSelect from '@/components/Header/Register/RoleSelect';
import staticVariables from '@/static';
import { Button, ConfigProvider, Image, Typography } from 'antd';
import React, { useState } from 'react';

export default function RegisterRulePage() {
  const [currentTab, setCurrentTab] = useState(0);
  const [rule, setRule] = useState('');
  const onFinishSelectRule = (e: any) => {
    console.log(e);
    setRule(e);
  };
  const handlePrev = () => {
    if (currentTab <= listTab.length - 1) {
      return;
    } else {
      setCurrentTab(currentTab - 1);
    }
  };
  const handleSubmit = () => {
    if (currentTab >= listTab.length - 1) {
      return;
    } else {
      setCurrentTab(currentTab + 1);
    }
  };
  const listTab = [
    <RoleSelect onFinishSelectRule={onFinishSelectRule} key={0} />,
  ];
  return (
    <div
      className="flex justify-end items-center w-full h-[710px]"
      style={{
        backgroundImage: `url(${staticVariables.qc4.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundOrigin: 'center',
      }}
    >
      {/* <Image
        className="w-1/2 h-full object-cover"
        alt=""
        width={1000}
        height={700}
        preview={false}
        src={staticVariables.qc4.src}
      /> */}
      <ConfigProvider
        theme={{
          components: {
            Button: {
              fontWeight: 700,
              ghostBg: '#C2FFC39B',
            },
          },
          token: {
            // colorBgContainer: '#C2FFC39B',
          },
        }}
      >
        <div className="w-5/12 h-full flex items-center rounded-2xl px-[100px] bg-gradient-to-r from-emerald-200 backdrop-blur-lg">
          <p className="font-bold	text-6xl font-sans text-green-950">
            Bạn muốn giữ vai trò gì trong hệ thống?
          </p>
        </div>
        <div className="w-7/12 h-full flex items-center bg-gradient-to-l from-emerald-200">
          <div className="w-fit flex-col">
            {listTab[currentTab]}
            <div className="flex items-center mt-[20px]">
              <Button
                disabled={currentTab <= listTab.length - 1}
                style={{ backgroundColor: '#FFFAFAB5' }}
                type={'default'}
                className="w-1/3 backdrop-blur-sm"
                onClick={handlePrev}
              >
                Quay lại
              </Button>
              <Button
                style={{ backgroundColor: '#FFFAFAB5' }}
                type={'default'}
                className="w-2/3 backdrop-blur-sm"
                onClick={handleSubmit}
              >
                Tiếp theo
              </Button>
            </div>
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
}
