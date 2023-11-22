import { Col, Image, Row, Tooltip } from 'antd';
import moment from 'moment';
import React from 'react';

export default function TransactionItemSelect({
  data,
}: {
  data?: DetailTransactionType;
}) {
  return (
    <div className="cursor-pointer">
      <Row align={'middle'} justify={'center'} className="py-[10px]">
        <Col span={8}>
          <div className="flex items-center space-x-3">
            <div className="w-[70px] h-[50px] rounded overflow-hidden">
              <Image
                alt=""
                width={'100%'}
                height={'100%'}
                src={data?.product_id?.avatar}
                preview={false}
                className="object-cover"
              />
            </div>
            <Tooltip title={data?.product_id?.name}>
              <p className="truncate pr-[30px] font-extralightl">
                {data?.product_id?.name}
              </p>
            </Tooltip>
          </div>
        </Col>
        <Col span={6}>
          <Tooltip title={data?.create_by?.email}>
            <p className="truncate pr-[30px]">{data?.create_by?.email}</p>
          </Tooltip>
        </Col>
        <Col span={3}>
          <p>{data?.quantity}</p>
        </Col>
        <Col span={3}>
          <p>{data?.price}</p>
        </Col>
        <Col span={4}>
          <Tooltip title={moment().format('DD/MM/YYYY - HH:MM:ss')}>
            <p>{moment(data?.create_at).fromNow()}</p>
          </Tooltip>
        </Col>
      </Row>
    </div>
  );
}
