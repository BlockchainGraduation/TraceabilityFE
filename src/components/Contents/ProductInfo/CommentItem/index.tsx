import staticVariables from '@/static';
import { faClock, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Popover, Space, Tag, Typography } from 'antd';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';

interface Props {
  isOwner: boolean;
}

export default function CommentItem(props: CommentItemType & Props) {
  return (
    <div className="mb-[10px]">
      <div className="flex">
        <Popover
          content={
            <div className="flex flex-col space-y-5">
              <div className="flex space-x-5">
                <Avatar size={100} src={props.user?.avatar} />
                <div className="flex flex-col space-y-1">
                  <p className="text-[20px] font-bold">
                    {props.user?.username}
                  </p>
                  <Space>
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      style={{ color: '#4b7dd2' }}
                    />
                    <p>{props.user?.email}</p>
                  </Space>
                  {/* <Space>
                    <FontAwesomeIcon
                      icon={faClock}
                      style={{ color: '#4978ca' }}
                    />
                    <p>{moment(props.user.).format('DD/MM/YYYY')}</p>
                  </Space> */}
                  <Tag color={'green-inverse'}>{props.user?.username}</Tag>
                </div>
              </div>
              <Space className="px-[20px] space-x-1 ">
                <p className="px-[20px] py-[5px] border-[1px] rounded-xl">
                  Nhắn tin
                </p>
                <Link href={`/user/${props.user?.id}`}>
                  <p className="px-[20px] py-[5px] border-[1px] rounded-xl">
                    Xem thông tin
                  </p>
                </Link>
                <p className="px-[20px] py-[5px] border-[1px] rounded-xl">
                  Báo cáo
                </p>
              </Space>
            </div>
          }
        >
          <Avatar src={props.user?.avatar} />
        </Popover>
        <div className="flex ml-[10px] flex-col  ">
          <Space className="text-[15px]">
            <p className="font-bold">{props.user?.username}</p>
            {props.isOwner && (
              <p className="text-[12px] text-blue-600">Owner</p>
            )}
          </Space>
          <Tag
            color={props.user?.username === 'FARMER' ? 'green' : 'blue-inverse'}
            className="w-fit font-light"
          >
            {props.user?.username}
          </Tag>
        </div>
      </div>
      <div className="ml-[40px] mt-[5px]">
        <div className="max-w-[500px] min-w-[100px] w-fit text-[16px] p-[15px] rounded-bl-[10px] rounded-r-[10px]  bg-[#f0f2f5] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          {props.content}
        </div>
        <div className="flex mt-1 space-x-5 ml-3 text-[12px]  tetx-[#65676b]">
          <p className="font-semibold">Phản hồi</p>
          <p>{moment(props.created_at).fromNow()}</p>
        </div>
      </div>
    </div>
  );
}
