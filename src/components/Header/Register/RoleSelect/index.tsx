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
import React, { useEffect, useState } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { useEffectOnce } from 'usehooks-ts';

export default function RoleSelect({
  onFinishSelectRule,
}: {
  onFinishSelectRule?: (e?: any) => void;
}) {
  const [currentDescriptionPage, setCurrentDescriptionPage] = useState(0);
  const [value, setValue] = useState('FARMER');

  useEffect(() => {
    onFinishSelectRule?.(value);
  }, [onFinishSelectRule, value]);
  const listRuleDescription = [
    {
      rules: 'Nông dân',
      value: 'FARMER',
      image: staticVariables.qc5.src,
      decription: `Nông dân là những người lao động cư trú ở nông thôn, tham gia sản xuất
      nông nghiệp. Nông dân sống chủ yếu bằng ruộng vườn, sau đó đến các
      ngành nghề mà tư liệu sản xuất chính là đất đai. Tùy từng quốc gia,
      từng thời kì lịch sử, người nông dân có quyền sở hữu khác nhau về
      ruộng đất. Họ hình thành nên giai cấp nông dân, có vị trí, vai trò
      nhất định trong xã hội.`,
      detail: [
        {
          label: 'Xem mô tả',
          content: `Nông dân là những người lao động cư trú ở nông thôn, tham gia sản xuất
      nông nghiệp. Nông dân sống chủ yếu bằng ruộng vườn, sau đó đến các
      ngành nghề mà tư liệu sản xuất chính là đất đai. Tùy từng quốc gia,
      từng thời kì lịch sử, người nông dân có quyền sở hữu khác nhau về
      ruộng đất. Họ hình thành nên giai cấp nông dân, có vị trí, vai trò
      nhất định trong xã hội.`,
        },
        {
          label: 'Quyền lợi',
          content: `Nông dân là những người lao động cư trú ở nông thôn, tham gia sản xuất
      nông nghiệp. Nông dân sống chủ yếu bằng ruộng vườn, sau đó đến các
      ngành nghề mà tư liệu sản xuất chính là đất đai. Tùy từng quốc gia,
      từng thời kì lịch sử, người nông dân có quyền sở hữu khác nhau về
      ruộng đất. Họ hình thành nên giai cấp nông dân, có vị trí, vai trò
      nhất định trong xã hội.`,
        },
      ],
    },
    {
      rules: 'Seed company',
      value: 'SEEDLING_COMPANY',
      image: staticVariables.qc5.src,
      decription: 'asdasdasd',
      detail: [
        {
          label: 'Xem mô tả',
          content: `Nông dân là những người lao động cư trú ở nông thôn, tham gia sản xuất
      nông nghiệp. Nông dân sống chủ yếu bằng ruộng vườn, sau đó đến các
      ngành nghề mà tư liệu sản xuất chính là đất đai. Tùy từng quốc gia,
      từng thời kì lịch sử, người nông dân có quyền sở hữu khác nhau về
      ruộng đất. Họ hình thành nên giai cấp nông dân, có vị trí, vai trò
      nhất định trong xã hội.`,
        },
        {
          label: 'Quyền lợi',
          content: `Nông dân là những người lao động cư trú ở nông thôn, tham gia sản xuất
      nông nghiệp. Nông dân sống chủ yếu bằng ruộng vườn, sau đó đến các
      ngành nghề mà tư liệu sản xuất chính là đất đai. Tùy từng quốc gia,
      từng thời kì lịch sử, người nông dân có quyền sở hữu khác nhau về
      ruộng đất. Họ hình thành nên giai cấp nông dân, có vị trí, vai trò
      nhất định trong xã hội.`,
        },
      ],
    },
    {
      rules: 'Nhà chế biến',
      value: 'MANUFACTURER',
      image: staticVariables.qc5.src,
      decription: 'asdasdasd',
      detail: [
        {
          label: 'Xem mô tả',
          content: `Nông dân là những người lao động cư trú ở nông thôn, tham gia sản xuất
      nông nghiệp. Nông dân sống chủ yếu bằng ruộng vườn, sau đó đến các
      ngành nghề mà tư liệu sản xuất chính là đất đai. Tùy từng quốc gia,
      từng thời kì lịch sử, người nông dân có quyền sở hữu khác nhau về
      ruộng đất. Họ hình thành nên giai cấp nông dân, có vị trí, vai trò
      nhất định trong xã hội.`,
        },
        {
          label: 'Quyền lợi',
          content: `Nông dân là những người lao động cư trú ở nông thôn, tham gia sản xuất
      nông nghiệp. Nông dân sống chủ yếu bằng ruộng vườn, sau đó đến các
      ngành nghề mà tư liệu sản xuất chính là đất đai. Tùy từng quốc gia,
      từng thời kì lịch sử, người nông dân có quyền sở hữu khác nhau về
      ruộng đất. Họ hình thành nên giai cấp nông dân, có vị trí, vai trò
      nhất định trong xã hội.`,
        },
      ],
    },
  ];
  return (
    <div className="w-full flex">
      <div className="w-full overflow-x-auto">
        <p className="font-bold text-center	text-4xl font-sans text-green-950 mb-[30px]">
          Bạn muốn giữ vai trò gì trong hệ thống ?
        </p>
        <Image
          alt=""
          width={'30%'}
          preview={false}
          height={'50%'}
          className="object-cover"
          src={staticVariables.shrimpBg.src}
        />
      </div>
      {/* <div className="w-1/2 p-[30px]">
        <p className="text-3xl font-semibold p-[20px]">
          {listRuleDescription[currentDescriptionPage].rules}
        </p>
        <p className="py-[20px] font-thin">
          {listRuleDescription[currentDescriptionPage].decription}
        </p>
        <Collapse
          items={listRuleDescription[currentDescriptionPage].detail.map(
            (item, index) => ({
              key: index,
              label: item.label,
              children: (
                <div className="pr-[50px] text-justify">{item.content}</div>
              ),
            })
          )}
        />
      </div> */}
    </div>
  );
}
