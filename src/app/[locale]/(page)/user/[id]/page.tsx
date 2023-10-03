'use client';
import UserInfoCard from '@/components/Contents/common/UserInfoCard';
import {
  ArrowUpOutlined,
  BookOutlined,
  InboxOutlined,
  MessageOutlined,
  ScheduleOutlined,
  StarOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Carousel, Col, Row, Statistic, Typography } from 'antd';
import React from 'react';

export default function UserInfo() {
  const contentStyle: React.CSSProperties = {
    height: '300px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    borderRadius: '10px',
  };
  const statisticItems = [
    {
      title: 'San pham',
      value: 20,
      valueStyle: { color: '#3f8600' },
      precision: 0,
      prefix: <InboxOutlined />,
      suffix: '',
    },
    {
      title: 'Giao dich',
      value: 40,
      valueStyle: { color: '#3f8600' },
      precision: 0,
      prefix: <BookOutlined />,
      suffix: '',
    },
    {
      title: 'Khach hang',
      value: 40,
      valueStyle: { color: '#3f8600' },
      precision: 0,
      prefix: <TeamOutlined />,
      suffix: '',
    },
    {
      title: 'Cuoc tro chuyen',
      value: 40,
      valueStyle: { color: '#3f8600' },
      precision: 0,
      prefix: <MessageOutlined />,
      suffix: '',
    },
    {
      title: 'Xep hang giao dich',
      value: 40,
      valueStyle: { color: '#3f8600' },
      precision: 0,
      prefix: <ArrowUpOutlined />,
      suffix: '',
    },
    {
      title: 'Danh gia',
      value: 40,
      valueStyle: { color: '#3f8600' },
      precision: 0,
      prefix: <StarOutlined />,
      suffix: '',
    },
    {
      title: 'San pham ban ra',
      value: 40,
      valueStyle: { color: '#3f8600' },
      precision: 0,
      prefix: <ArrowUpOutlined />,
      suffix: '',
    },
  ];
  return (
    <div className="px-[50px]">
      <UserInfoCard />
      <div className="flex">
        <div className="w-2/5">
          <Carousel waitForAnimate={true} effect="fade" autoplay>
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
        </div>
        <div className="flex px-[30px]">
          <Row gutter={[50, 12]} justify={'space-around'} align={'middle'}>
            {statisticItems.map((item, index) => (
              <Col key={index}>
                <Card hoverable className="w-fit" bordered={false}>
                  <Statistic
                    title={item.title}
                    value={item.value}
                    precision={item.precision || 0}
                    valueStyle={item.valueStyle || {}}
                    prefix={item.prefix}
                    suffix={item.suffix}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <div>
        <div className="border-2 mt-[100px]">
          <Typography.Title
            className="absolute py-[10px] px-[20px] border-2 translate-y-[-50%]"
            level={2}
            style={{ margin: 0 }}
          >
            Danh sach san pham
          </Typography.Title>
        </div>
      </div>
    </div>
  );
}
