import staticVariables from '@/static';
import { Avatar, Tag, Typography } from 'antd';
import moment from 'moment';
import React from 'react';

interface Props {
  isOwner: boolean;
}

export default function CommentItem(props: CommentItemType & Props) {
  return (
    <div className="mb-[10px]">
      <div className="flex ">
        <Avatar src={props.user?.avatar} />
        <div className="flex ml-[10px] flex-col  ">
          <div className="flex items-center space-x-3 text-[15px]">
            <p className="font-bold">{props.user?.username}</p>
            {props.isOwner && (
              <p className="text-[12px] text-blue-600">Owner</p>
            )}
          </div>
          <Tag
            color={props.user?.username === 'FARMER' ? 'green' : 'blue-inverse'}
            className="w-fit font-light"
          >
            {props.user?.username}
          </Tag>
        </div>
      </div>
      <div className="ml-[40px] mt-[5px]">
        <div className="max-w-[400px] min-w-[100px] w-fit text-[15px] p-[15px] rounded-bl-[10px] rounded-r-[10px]  bg-[#f0f2f5] text-xs drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          {props.content}
        </div>
        <div className="flex mt-1 space-x-5 ml-3 text-[12px] font-semibold tetx-[#65676b]">
          <p>Phản hồi</p>
          <p>{moment(props.created_at).fromNow()}</p>
        </div>
      </div>
    </div>
  );
}
