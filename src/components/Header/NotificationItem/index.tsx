import staticVariables from '@/static';
import { DeleteTwoTone } from '@ant-design/icons';
import { Avatar } from 'antd';
import moment from 'moment';
import React, { ReactNode } from 'react';

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
  return (
    <div
      className={`relative flex items-center p-[10px] hover:bg-sky-200 ${
        props.unread && `bg-sky-50`
      } rounded max-w-[400px] gap-x-3`}
    >
      <DeleteTwoTone className="absolute top-1/2 right-[10px]" />
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
