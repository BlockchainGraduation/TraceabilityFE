'use client';
import instanceAxios from '@/api/instanceAxios';
import RoleSelect from '@/components/Header/Register/RoleSelect';
import { useAppSelector } from '@/hooks';
import staticVariables from '@/static';
import { Button, ConfigProvider, Image, Typography, notification } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSWRConfig } from 'swr';

export default function RegisterRulePage({
  mutateAPI,
}: {
  mutateAPI?: string;
}) {
  const [currentTab, setCurrentTab] = useState(0);
  const [rule, setRule] = useState('');
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const { mutate } = useSWRConfig();
  const currentUser = useAppSelector((state) => state.user.user);
  const onFinishSelectRule = (e: string) => {
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
  const handleSubmit = async () => {
    setLoading(true);
    if (currentTab >= listTab.length - 1) {
      await fetchChangeRule();
    } else {
      setCurrentTab(currentTab + 1);
    }
    setLoading(false);
  };
  const listTab = [
    <RoleSelect onFinishSelectRule={onFinishSelectRule} key={0} />,
  ];
  const fetchChangeRule = async () => {
    console.log(rule);
    await instanceAxios
      .put(`user/surveys`, {
        survey_data: { user_role: rule },
      })
      .then((res) => {
        notification.success({
          message: 'Thành công',
          description: 'Thay đổi rule thành công',
        });
        // route.replace('/home');
        mutate(mutateAPI);
      })
      .catch((err) => {
        notification.error({
          message: 'Lỗi',
          description: 'Thay đổi rule thật bại',
        });
      });
  };
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
          loading={loading}
          disabled={currentTab <= listTab.length - 1}
          // style={{ backgroundColor: '#FFFAFAB5' }}
          type={'default'}
          className="w-1/3 backdrop-blur-sm"
          onClick={handlePrev}
        >
          Quay lại
        </Button>
        <Button
          loading={loading}
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
