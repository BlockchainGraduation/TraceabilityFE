import instanceAxios from '@/api/instanceAxios';
import { useAppSelector } from '@/hooks';
import useLogin from '@/services/requireLogin';
import staticVariables from '@/static';
import { SendOutlined } from '@ant-design/icons';
import { Avatar, Input, message } from 'antd';
import { useState } from 'react';
import { useSWRConfig } from 'swr';

export default function CommentInput({
  productId,
  className,
  onSuccess,
}: {
  className?: string;
  productId?: number;
  onSuccess?: () => void;
}) {
  const currentUser = useAppSelector((state) => state.user.user);
  const [commentValue, setCommentValue] = useState('');
  const { login } = useLogin();
  const { mutate } = useSWRConfig();
  const fetchSubmitComment = async () => {
    if (!commentValue.trim()) {
      message.warning('Vui lòng nhập nội dung');
    } else {
      await instanceAxios
        .post(`comment/`, { product_id: productId, description: commentValue })
        .then((res) => {
          onSuccess?.();
          // mutate(`fethComments`);
          setCommentValue('');
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className={`flex items-center mt-[20px] ${className}`}>
      <div>
        <Avatar
          className="mr-[10px]"
          size="large"
          src={currentUser.avatar || staticVariables.noImage.src}
        />
      </div>
      <Input.TextArea
        autoSize
        placeholder="Bình luận..."
        className="max-h-[300px]"
        value={commentValue}
        onChange={(e) => setCommentValue(e.target.value)}
      />
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
