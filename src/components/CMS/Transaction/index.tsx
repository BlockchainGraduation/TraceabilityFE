import {
  faCircleXmark,
  faLock,
  faLockOpen,
  faPenToSquare,
  faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Segmented, Tag } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React, { ReactNode, useState } from 'react';

interface DataType {
  key: React.Key;
  index: number;
  user: ReactNode;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  date: string;
  status: string;
}
export default function TransactionCMS() {
  const [currentTable, setCurrentTable] = useState('BUY');
  const columns: ColumnsType<DataType> = [
    {
      title: 'Stt',
      dataIndex: 'index',
      width: 65,
    },
    {
      title: currentTable === 'BUY' ? 'Người bán' : 'Người mua',
      dataIndex: 'user',
      width: 250,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
    },
    {
      title: 'Số lượng bán',
      dataIndex: 'quantity',
    },
    {
      title: 'Giá đơn vị',
      dataIndex: 'price',
    },
    {
      title: 'Tổng giá trị',
      dataIndex: 'total',
    },
    {
      title: 'Ngày giao dịch',
      dataIndex: 'date',
    },
    {
      title: 'Trạng thái',
      dataIndex: '',
      render: (value, record, index) =>
        record.index % 2 ? (
          <Tag color={'success'}>Thành công</Tag>
        ) : (
          <Tag color={'error'}>Thất bại</Tag>
        ),
    },
  ];
  const data: DataType[] = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      key: i,
      index: i + 1,
      user: 'ReactNode',
      productName: 'string',
      quantity: 12,
      price: 2312,
      total: 131,
      date: 'string',
      status: 'string',
    });
  }
  return (
    <div>
      <div className="flex  items-center justify-between p-[20px] border-[1px] rounded-[10px]">
        <p className="text-3xl font-medium	">Danh sách sản phẩm</p>
      </div>
      <Segmented
        size={'large'}
        defaultValue={currentTable}
        onChange={(e) => setCurrentTable(e.toString())}
        options={[
          { label: 'Lịch sử mua', value: 'BUY' },
          { label: 'Lịch sử bán', value: 'SELL' },
        ]}
      />
      <div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ y: 340 }}
        />
      </div>
    </div>
  );
}
