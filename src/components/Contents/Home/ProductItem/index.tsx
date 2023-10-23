import {
  EditOutlined,
  EllipsisOutlined,
  HeartOutlined,
  LikeOutlined,
  MessageOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Card,
  ConfigProvider,
  Empty,
  Image,
  Modal,
  Space,
  Statistic,
  Tag,
  Typography,
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import useLogin from '@/services/requireLogin';
import CommentItem from '../../ProductInfo/CommentItem';
import CommentInput from '../../common/CommentInput';
import instanceAxios from '@/api/instanceAxios';
import useSWR from 'swr';

const { Meta } = Card;

interface Props {
  productName: string;
  productImg: string;
  productId?: string;
  marketId?: string;
  ownerName?: string;
  ownerImg?: string;
  role?: string;
  likeQuantity: number;
  messageQuantity: number;
  buyerQuantity: number;
  price: number;
  quantity: number;
}

export default function ProductItem(props: Props) {
  const { login } = useLogin();
  const [openComment, setOpenComment] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [skip, setKkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const fetchDataComment = useCallback(async () => {
    await instanceAxios
      .get(
        `comments/list?marketplace_id=${props.marketId}&skip=${skip}&limit=${limit}`
      )
      .then((res) => {
        setCommentList(res.data.data.list_comment);
      })
      .catch((err) => {
        setCommentList([]);
        console.log(err);
      });
  }, [limit, props.marketId, skip]);
  const afterOpenChange = async (e: boolean) => {
    if (e) {
      fetchDataComment();
    }
  };
  // useEffect(() => {
  //   fetchDataComment();
  // }, [fetchDataComment, limit, props.marketId, skip]);
  // const { isLoading } = useSWR(``, fetchDataComment);
  return (
    <div data-aos="flip-right" className="w-fit">
      <Card
        hoverable
        style={{ width: 300 }}
        cover={
          <div className="relative w-fit">
            <Image
              width={300}
              height={200}
              alt=""
              className="object-cover"
              src={props.productImg}
            />
          </div>
        }
        actions={[
          <div onClick={() => login()} key="like">
            <Statistic
              valueStyle={{ fontSize: '10px' }}
              title={<LikeOutlined />}
              value={`112893`}
            />
          </div>,
          <div key="message" onClick={() => login(() => setOpenComment(true))}>
            <Statistic
              valueStyle={{ fontSize: '10px' }}
              title={<MessageOutlined />}
              value={`${props.likeQuantity} Messenger`}
            />
          </div>,
          <div key="cart" onClick={() => login()}>
            <Statistic
              valueStyle={{ fontSize: '10px' }}
              title={<ShoppingCartOutlined />}
              value={`${props.buyerQuantity} Buyer`}
            />
          </div>,
        ]}
      >
        <Link href={`/market/${props.marketId}`}>
          <Meta
            // avatar={<Avatar size={50} src={props.ownerImg} />}
            title={
              <div>
                <div className="mb-[15px]">
                  <Meta className="text-center" title={props.productName} />
                </div>
                {props.ownerName || props.ownerImg || props.role ? (
                  <div className="flex mt-[10px] items-center">
                    <Avatar size={50} src={props.ownerImg} />
                    <div className="ml-[10px]">
                      <p className="font-normal text-xs mr-[10px]">
                        {props.ownerName}
                      </p>
                      <Tag className="font-light">{props.role}</Tag>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            }
            description={
              <ConfigProvider
                theme={{
                  components: {
                    Statistic: {
                      contentFontSize: 20,
                      // titleFontSize: 12,
                    },
                  },
                }}
              >
                <div className="flex justify-around">
                  <Statistic title="Quantity" value={props.quantity} />
                  <Statistic title="Price" suffix={'VND'} value={props.price} />
                </div>
              </ConfigProvider>
            }
          />
        </Link>
      </Card>
      <Modal
        onCancel={() => setOpenComment(false)}
        centered
        title={'Bình luận về AA'}
        open={openComment}
        afterOpenChange={afterOpenChange}
        footer={[]}
      >
        <div className="max-h-[500px] overflow-auto">
          {commentList.length ? (
            commentList.map((_, index) => <CommentItem key={index} />)
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_DEFAULT}
              description={'Chưa có bình luận nào'}
            />
          )}
        </div>
        <CommentInput marketId={props.marketId || ''} />
      </Modal>
    </div>
  );
}
