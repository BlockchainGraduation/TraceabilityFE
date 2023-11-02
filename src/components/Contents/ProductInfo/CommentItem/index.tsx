import staticVariables from '@/static';
import { Avatar, Tag, Typography } from 'antd';
import React from 'react';

export default function CommentItem({
  userAvatar,
  userName,
  userRole,
  content,
}: {
  userAvatar: string;
  userRole: string;
  userName: string;
  content: string;
}) {
  return (
    <div className="mb-[20px]">
      <div className="flex ">
        <Avatar src={userAvatar} />
        <div className="flex ml-[10px] flex-col ">
          <p className="font-medium">{userName}</p>
          <Tag
            color={userRole === 'FARMER' ? 'green' : 'blue-inverse'}
            className="w-fit font-light"
          >
            {userRole}
          </Tag>
        </div>
      </div>
      <div className="max-w-[400px] w-fit p-[15px] rounded-bl-[10px] rounded-r-[10px] ml-[40px] mt-[5px] bg-gray-200 text-xs drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        {content}
      </div>
    </div>
  );
}
