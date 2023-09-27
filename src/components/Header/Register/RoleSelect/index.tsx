import staticVariables from '@/static';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, ConfigProvider, Image, Segmented } from 'antd';
import React from 'react';

export default function RoleSelect() {
  return (
    <div>
      <ConfigProvider
        theme={{ components: { Segmented: { itemSelectedBg: '#47b57c' } } }}
      >
        <Segmented
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
