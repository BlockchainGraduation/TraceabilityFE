import {
  EditOutlined,
  EllipsisOutlined,
  HeartOutlined,
  LikeOutlined,
  MessageOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Image, Space, Statistic, Tag, Typography } from 'antd';
import React from 'react';

const { Meta } = Card;

interface Props {
  productName: string;
  productImg: string;
  productId: string;
  ownerName: string;
  ownerImg: string;
  role: string;
  likeQuantity: number;
  messageQuantity: number;
  buyerQuantity: number;
}

export default function ProductItem(props: Props) {
  return (
    <div className="w-fit">
      <Card
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
          <Statistic
            key="like"
            valueStyle={{ fontSize: '10px' }}
            title={<LikeOutlined />}
            value={`112893`}
          />,
          <Statistic
            key="message"
            valueStyle={{ fontSize: '10px' }}
            title={<MessageOutlined />}
            value={`${props.likeQuantity} Messenger`}
          />,
          <Statistic
            key="cart"
            valueStyle={{ fontSize: '10px' }}
            title={<ShoppingCartOutlined />}
            value={`${props.buyerQuantity} Buyer`}
          />,
        ]}
      >
        <Meta
          avatar={<Avatar src={props.ownerImg} />}
          title={
            <div>
              <Meta title={props.productName} />
            </div>
          }
          description={
            <Space direction={'vertical'}>
              <Typography.Text italic>{props.ownerName}</Typography.Text>
              <Tag>{props.role}</Tag>
            </Space>
          }
        />
      </Card>
    </div>
  );
}
