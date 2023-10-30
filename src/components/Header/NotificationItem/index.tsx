import instanceAxios from '@/api/instanceAxios';
import staticVariables from '@/static';
import { DeleteTwoTone } from '@ant-design/icons';
import { Avatar, ConfigProvider, Popconfirm, message } from 'antd';
import moment from 'moment';
import React, { ReactNode, useState } from 'react';
import { useSWRConfig } from 'swr';

interface NotificationItemProp {
  avatar?: string;
  content?: ReactNode;
  product_id?: string;
  product_name?: string;
  notification_type?: string;
  created_at?: number;
  unread?: boolean;
  notification_id?: string;
}

export default function NotificationItem(props: NotificationItemProp) {
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const { mutate } = useSWRConfig();
  const fetchDeleteNotification = async () => {
    await instanceAxios
      .delete(`notifications/${props.notification_id}`)
      .then((res) => {
        message.success('Bạn đã xóa thông báo');
        mutate('notifications/list');
      })
      .catch((err) => message.error('Xóa thông báo thất bại'));
  };
  return (
    <div
      className={`relative flex items-center p-[10px] hover:bg-sky-200 ${
        props.unread && `bg-sky-50`
      } rounded max-w-[400px] gap-x-3`}
      onMouseOver={() => setShowDeleteIcon(true)}
      onMouseOut={() => setShowDeleteIcon(false)}
    >
      {showDeleteIcon && (
        <ConfigProvider
          theme={{
            components: {
              Button: {
                primaryColor: '#e62929',
              },
            },
            token: {
              colorBgContainer: '#7f84d4',
            },
          }}
        >
          <Popconfirm
            title={'Xóa thông báo'}
            onConfirm={fetchDeleteNotification}
          >
            <DeleteTwoTone className="absolute top-1/2 right-[10px]" />
          </Popconfirm>
        </ConfigProvider>
      )}
      <Avatar
        size={'large'}
        src={props.avatar || staticVariables.logoRaiden.src}
      />
      <div className="w-9/12">
        <div className=" w-full line-clamp-2 text-justify">{props.content}</div>
        <p className="text-gray-500">
          {moment(props.created_at).startOf('day').fromNow()}
        </p>
      </div>
    </div>
  );
}
