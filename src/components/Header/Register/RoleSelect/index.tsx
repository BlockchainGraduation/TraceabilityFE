import staticVariables from '@/static';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, ConfigProvider, Image, Segmented, Typography } from 'antd';
import { SegmentedValue } from 'antd/es/segmented';
import React from 'react';

export default function RoleSelect({
  onFinishSelectRule,
}: {
  onFinishSelectRule?: (e?: any) => void;
}) {
  return (
    <div className="w-fit flex-col">
      <ConfigProvider
        theme={{
          components: { Segmented: { itemSelectedBg: '#47b57c' } },
          token: {
            colorBgLayout: '#E8FFF2B5',
          },
        }}
      >
        <p className="font-bold text-center	text-4xl font-sans text-green-950 mb-[30px]">
          Vui lòng chọn nghề ngiệp của bạn
        </p>
        <Segmented
          onChange={(e: SegmentedValue) => onFinishSelectRule?.(e)}
          options={[
            {
              label: (
                <div style={{ padding: 20 }}>
                  <Image
                    alt=""
                    className="rounded object-cover"
                    height={200}
                    width={150}
                    src={staticVariables.logo.src}
                  />
                  <div>Nông dân</div>
                </div>
              ),
              value: 'FAMMER',
            },
            {
              label: (
                <div style={{ padding: 20 }}>
                  <Image
                    alt=""
                    className="rounded object-cover"
                    height={200}
                    width={150}
                    src={staticVariables.logo.src}
                  />
                  <div>Nhà máy</div>
                </div>
              ),
              value: 'FACTORY',
            },
            {
              label: (
                <div style={{ padding: 20 }}>
                  <Image
                    alt=""
                    className="rounded object-cover"
                    height={200}
                    width={150}
                    src={staticVariables.logo.src}
                  />
                  <div>Nhà vận chuyển</div>
                </div>
              ),
              value: 'DISTRIBUTER',
            },
            {
              label: (
                <div style={{ padding: 20 }}>
                  <Image
                    alt=""
                    className="rounded object-cover"
                    height={200}
                    width={150}
                    src={staticVariables.logo.src}
                  />
                  <div>Đại lí</div>
                </div>
              ),
              value: 'SEEDCOMPANY',
            },
          ]}
        />
      </ConfigProvider>
    </div>
  );
}
