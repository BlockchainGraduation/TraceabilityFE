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
  Image,
  Space,
  Statistic,
  Tag,
  Typography,
} from 'antd';
import React from 'react';
import Link from 'next/link';

const { Meta } = Card;

interface Props {
  productName: string;
  productImg: string;
  productId: string;
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
          <div onClick={() => alert('OK')} key="like">
            <Statistic
              valueStyle={{ fontSize: '10px' }}
              title={<LikeOutlined />}
              value={`112893`}
            />
          </div>,
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
        <Link href={`/product/${props.productId}`}>
          <Meta
            // avatar={<Avatar size={50} src={props.ownerImg} />}
            title={
              props.ownerName ||
              props.ownerImg ||
              (props.role && (
                <div>
                  <Meta className="text-center " title={props.productName} />
                  <div className="flex mt-[10px] items-center">
                    <Avatar size={50} src={props.ownerImg} />
                    <div className="ml-[10px]">
                      <p className="font-normal text-xs mr-[10px]">
                        {props.ownerName}
                      </p>
                      <Tag className="font-light">{props.role}</Tag>
                    </div>
                  </div>
                </div>
              ))
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
    </div>
  );
}
