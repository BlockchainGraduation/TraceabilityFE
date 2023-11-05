import { LeftArrow, RightArrow } from '@/app/[locale]/home/components/Category';
import staticVariables from '@/static';
import { UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Collapse,
  ConfigProvider,
  Image,
  Segmented,
  Typography,
} from 'antd';
import { SegmentedValue } from 'antd/es/segmented';
import React, { useState } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';

export default function RoleSelect({
  onFinishSelectRule,
}: {
  onFinishSelectRule?: (e?: any) => void;
}) {
  const [currentDescriptionPage, setCurrentDescriptionPage] = useState(0);
  const listRuleDescription = [
    {
      rules: 'ABC',
      decription: 'asdasdasd',
      detail: [{ label: 'asd', content: '' }],
    },
  ];
  return (
    <div className="w-full flex">
      <div className="w-1/2 overflow-x-auto">
        <ConfigProvider
          theme={{
            components: { Segmented: { itemSelectedBg: '#47b57c' } },
            token: {
              colorBgLayout: '#E8FFF2B5',
            },
          }}
        >
          <p className="font-bold text-center	text-4xl font-sans text-green-950 mb-[30px]">
            Bạn muốn giữ vai trò gì trong hệ thống?
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
                      preview={false}
                      height={100}
                      width={100}
                      src={staticVariables.logo.src}
                    />
                    <div>Nông dân</div>
                  </div>
                ),
                value: 'FAMMER',
                title: 'asdsd',
              },
              {
                label: (
                  <div style={{ padding: 20 }}>
                    <Image
                      alt=""
                      className="rounded object-cover"
                      height={100}
                      width={100}
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
                      height={100}
                      width={100}
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
                      height={100}
                      width={100}
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
      <div className="w-1/2 p-[30px]">
        <p className="text-3xl font-semibold p-[20px]">Nông dân</p>
        <p className="py-[20px]">
          Nông dân là những người lao động cư trú ở nông thôn, tham gia sản xuất
          nông nghiệp. Nông dân sống chủ yếu bằng ruộng vườn, sau đó đến các
          ngành nghề mà tư liệu sản xuất chính là đất đai. Tùy từng quốc gia,
          từng thời kì lịch sử, người nông dân có quyền sở hữu khác nhau về
          ruộng đất. Họ hình thành nên giai cấp nông dân, có vị trí, vai trò
          nhất định trong xã hội.
        </p>
        <Collapse
          items={[
            {
              key: '0',
              label: 'Xem mô tả',
              children: (
                <div className="pr-[50px] text-justify">
                  {`This limited series of Midnight Society Access Passes grants the
              holder studio-specific perks including but not limited to: a
              one-of-a-kind "Variant" 🤣😂😊😊 PFP \n
              (profile pic) with unique VisorCortex,
              Call Sign, and other attributes of various rarity. Founders are
              entitled to voting rights on game features, exclusive access to
              studio events, first dibs on merchandise, early access to the
              latest dev build, and more.`}
                </div>
              ),
            },
            {
              key: '3',
              label: 'Xem mô tả',
              children: (
                <div className="pr-[50px] text-justify">
                  {`This limited series of Midnight Society Access Passes grants the
              holder studio-specific perks including but not limited to: a
              one-of-a-kind "Variant" 🤣😂😊😊 PFP \n
              (profile pic) with unique VisorCortex,
              Call Sign, and other attributes of various rarity. Founders are
              entitled to voting rights on game features, exclusive access to
              studio events, first dibs on merchandise, early access to the
              latest dev build, and more.`}
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
