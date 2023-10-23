import staticVariables from '@/static';
import { Avatar, Tag } from 'antd';
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
        <div className="flex ml-[10px] flex-col">
          {userName}
          <Tag className="w-fit">{userRole}</Tag>
        </div>
      </div>
      <div className="max-w-[400px] w-fit p-[20px] ml-[40px] mt-[5px] bg-gray-200 rounded text-xs	drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        {content}
      </div>
    </div>
  );
}
