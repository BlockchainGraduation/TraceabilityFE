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
import { Card, Carousel, Col, Row, Statistic } from 'antd';
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
            <Col>
              <Card className="w-fit" bordered={false}>
                <Statistic
                  title="San pham"
                  value={40}
                  // precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<InboxOutlined />}
                  // suffix="San pham"
                />
              </Card>
            </Col>
            <Col>
              <Card className="w-fit" bordered={false}>
                <Statistic
                  title="Giao dich"
                  value={150}
                  // precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<BookOutlined />}
                  // suffix="%"
                />
              </Card>
            </Col>
            <Col>
              <Card className="w-fit" bordered={false}>
                <Statistic
                  title="Khach hang"
                  value={150}
                  // precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<TeamOutlined />}
                  // suffix="%"
                />
              </Card>
            </Col>
            <Col>
              <Card className="w-fit" bordered={false}>
                <Statistic
                  title="Cuoc tro chuyen"
                  value={150}
                  // precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<MessageOutlined />}
                  // suffix="%"
                />
              </Card>
            </Col>
            <Col>
              <Card className="w-fit" bordered={false}>
                <Statistic
                  title="Xep hang giao dich"
                  value={5}
                  // precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ArrowUpOutlined />}
                  // suffix="%"
                />
              </Card>
            </Col>
            <Col>
              <Card className="w-fit" bordered={false}>
                <Statistic
                  title="Danh gia"
                  value={9.5}
                  // precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<StarOutlined />}
                  // suffix="%"
                />
              </Card>
            </Col>
            <Col>
              <Card className="w-fit" bordered={false}>
                <Statistic
                  title="San pham ban ra"
                  value={200}
                  // precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ScheduleOutlined />}
                  // suffix="%"
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
