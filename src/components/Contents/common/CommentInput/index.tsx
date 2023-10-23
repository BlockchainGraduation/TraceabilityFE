import instanceAxios from '@/api/instanceAxios';
import { useAppSelector } from '@/hooks';
import useLogin from '@/services/requireLogin';
import staticVariables from '@/static';
import { SendOutlined } from '@ant-design/icons';
import { Avatar, Button, Input, message } from 'antd';
import React, { useState } from 'react';

export default function CommentInput({
  marketId,
  className,
}: {
  marketId: string;
  className?: string;
}) {
  const currentUser = useAppSelector((state) => state.user.user);
  const [commentValue, setCommentValue] = useState('');
  const { login } = useLogin();
  const fetchSubmitComment = async () => {
    if (!commentValue.trim()) {
      message.warning('Vui lòng nhập nội dung');
    }
    await instanceAxios
      .post(`comments/`, { marketplace_id: marketId, content: commentValue })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <div className={`flex mt-[20px] ${className}`}>
      <Avatar className="mr-[10px]" src={staticVariables.logoRaiden.src} />
      <Input.TextArea onChange={(e) => setCommentValue(e.target.value)} />
      {/* <Button
        onClick={() => login(fetchSubmitComment)}
        className="flex items-center"
      > */}
      <SendOutlined
        onClick={() => login(fetchSubmitComment)}
        style={{ color: '#366ece' }}
        size={30}
        className="text-xl px-[10px]"
      />
      {/* </Button> */}
    </div>
  );
}
