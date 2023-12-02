import instanceAxios from '@/api/instanceAxios';
import staticVariables from '@/static';
import { DeleteTwoTone } from '@ant-design/icons';
import { faBell, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, ConfigProvider, Popconfirm, message } from 'antd';
import moment from 'moment';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useState } from 'react';
import { useSWRConfig } from 'swr';

export default function NotificationItem(props: NotificationItemType) {
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const { mutate } = useSWRConfig();
  const tNotifications = useTranslations('notification');
  const tAction = useTranslations('action');
  const route = useRouter();
  const fetchGetDetail = async () => {
    await instanceAxios
      .patch(`active-notification/${props.id}`)
      .then((res) => {
        mutate('notifiation-me');
      })
      .catch((err) => console.log('Error', `notifications/${props.id}/detail`));
  };
  const fetchDeleteNotification = async () => {
    await instanceAxios
      .delete(`delete-notification/${props.id}`)
      .then((res) => {
        message.success('Bạn đã xóa thông báo');
        mutate('notifiation-me');
      })
      .catch((err) => message.error('Xóa thông báo thất bại'));
  };
  return (
    <div
      className={`relative flex items-center p-[10px] ${
        !props.active
          ? 'hover:bg-sky-100 hover:border hover:border-sky-600'
          : 'hover:bg-gray-100'
      }  hover:bg-gray-100 group rounded-xl max-w-[400px] gap-x-3`}
      onMouseOver={() => setShowDeleteIcon(true)}
      onMouseOut={() => setShowDeleteIcon(false)}
    >
      {!props.active && !showDeleteIcon && (
        <FontAwesomeIcon
          className="absolute top-1/2 right-[20px] opacity-100 duration-500 visible transition-all group-hover:invisible group-hover:opacity-0 group-hover:translate-x-[10px]"
          icon={faBell}
          size={'1x'}
          style={{ color: '#0866ff' }}
        />
      )}
      {/* {showDeleteIcon && ( */}
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
          className="absolute top-1/2 right-0 opacity-0 duration-500 invisible transition-all group-hover:visible group-hover:opacity-100 group-hover:-translate-x-[20px]"
        />
        {/* </Popconfirm> */}
      </ConfigProvider>
      {/* )} */}
      <Avatar
        size={'large'}
        src={props.create_by?.avatar || staticVariables.noImage.src}
      />
      <div className="w-9/12">
        <div
          onClick={async () => {
            await fetchGetDetail();
            route.push(`/product/${props.product_id?.id}`);
          }}
          className="hover:text-black"
        >
          {/* {props.params?.action ? (
            <div>
              {`The ${props.params.product_name} ${tAction(
                props.params.action
              )}  ${tNotifications(props.params.notification_type)}`}
            </div>
          ) : ( */}
          <div
            className=" w-full line-clamp-2 text-justify"
            // dangerouslySetInnerHTML={{
            //   __html: props.data?.message?.toString() || '',
            // }}
          >
            <p>
              {`${props.create_by?.fullname} ${tNotifications(
                props.notification_type
              )} ${props.product_id?.name}`}
            </p>
          </div>
          <p
            className={`${
              !props.active ? 'text-[#0866ff]' : 'text-gray-500'
            } text-[12px]`}
          >
            {moment(props.create_at).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
}
