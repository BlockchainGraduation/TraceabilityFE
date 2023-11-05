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
      className=" flex flex-col w-full py-[200px] px-[50px]"
      // style={{
      //   backgroundImage: `url(${staticVariables.qc5.src})`,
      //   backgroundRepeat: 'no-repeat',
      //   backgroundSize: 'cover',
      //   backgroundOrigin: 'center',
      // }}
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
          // components: {
          //   Button: {
          //     fontWeight: 700,
          //     ghostBg: '#C2FFC39B',
          //   },
          // },
          token: {
            // colorBgContainer: '#C2FFC39B',
          },
        }}
      >
        <div className="flex h-full w-full">{listTab[currentTab]}</div>
      </ConfigProvider>
      <div className="flex items-center gap-x-10 mt-10">
        <Button
          disabled={currentTab <= listTab.length - 1}
          // style={{ backgroundColor: '#FFFAFAB5' }}
          type={'default'}
          className="w-1/3 backdrop-blur-sm"
          onClick={handlePrev}
        >
          Quay lại
        </Button>
        <Button
          // style={{ backgroundColor: '#FFFAFAB5' }}
          type={'default'}
          className="w-2/3 backdrop-blur-sm"
          onClick={handleSubmit}
        >
          Tiếp theo
        </Button>
      </div>
    </div>
  );
}
