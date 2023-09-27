import { Checkbox, Collapse, Divider } from 'antd';
import React from 'react';

export default function Rules() {
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  return (
    <div>
      <Divider orientation="left">Vai trò của bạn trong hệ thống</Divider>
      <Collapse
        items={[
          {
            key: '1',
            label: 'This is default size panel header',
            children: <p>{text}</p>,
          },
        ]}
      />
      <Divider orientation="left">Dữ liệu của bạn trong hệ thống</Divider>
      <Collapse
        items={[
          {
            key: '1',
            label: 'This is small size panel header',
            children: <p>{text}</p>,
          },
        ]}
      />
      <Divider orientation="left">Hợp đồng của bạn</Divider>
      <Collapse
        items={[
          {
            key: '1',
            label: 'This is large size panel header',
            children: <p>{text}</p>,
          },
        ]}
      />
      <Divider orientation="left">Dữ liệu của bạn trên blockchain</Divider>
      <Collapse
        items={[
          {
            key: '1',
            label: 'This is large size panel header',
            children: <p>{text}</p>,
          },
        ]}
      />
      <Divider orientation="left">Cam kết</Divider>
      <Collapse
        items={[
          {
            key: '1',
            label: 'This is large size panel header',
            children: <p>{text}</p>,
          },
        ]}
      />
      <div className="flex justify-between my-[50px]">
        <Checkbox className="m-auto">
          Tôi đã đọc nội quy và đồng ý với những nội dung trên
        </Checkbox>
      </div>
    </div>
  );
}
