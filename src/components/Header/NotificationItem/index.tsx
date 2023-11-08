import instanceAxios from '@/api/instanceAxios';
import staticVariables from '@/static';
import { DeleteTwoTone } from '@ant-design/icons';
import { Avatar, ConfigProvider, Popconfirm, message } from 'antd';
import moment from 'moment';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { ReactNode, useState } from 'react';
import { useSWRConfig } from 'swr';

export default function NotificationItem(props: NotificationItemType) {
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const { mutate } = useSWRConfig();
  const tNotifications = useTranslations('notification');
  const tAction = useTranslations('action');
  const fetchDeleteNotification = async () => {
    await instanceAxios
      .delete(`notifications/${props.data?.notification_id}`)
      .then((res) => {
        message.success('Bạn đã xóa thông báo');
        mutate('notifications/list');
      })
      .catch((err) => message.error('Xóa thông báo thất bại'));
  };
  return (
    <div
      className={`relative flex items-center p-[10px] hover:bg-sky-200 ${
        props.data?.unread && `bg-sky-50`
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
                colorPrimaryBgHover: '#e62929',
              },
            },
            token: {
              colorBgContainer: '#7f84d4',
            },
          }}
        >
          {/* <Popconfirm
            title={'Xóa thông báo'}
            onConfirm={fetchDeleteNotification}
          > */}
          <DeleteTwoTone
            onClick={fetchDeleteNotification}
            className="absolute top-1/2 right-[10px]"
          />
          {/* </Popconfirm> */}
        </ConfigProvider>
      )}
      {/* <Avatar
        size={'large'}
        src={props/ || staticVariables.logoRaiden.src}
      /> */}
      <div className="w-9/12">
        <Link
          className="hover:text-black"
          href={`/market/${props.params?.product_id}`}
        >
          {props.params?.action ? (
            <div>
              {`${props.params.product_name} ${tNotifications(
                props.params.notification_type
              )} ${tAction(props.params.action)}`}
            </div>
          ) : (
            <div
              className=" w-full line-clamp-2 text-justify"
              dangerouslySetInnerHTML={{
                __html: props.message?.toString() || '',
              }}
            ></div>
          )}
          <p className="text-gray-500">
            {moment(props.data?.created_at).startOf('day').fromNow()}
          </p>
        </Link>
      </div>
    </div>
  );
}
