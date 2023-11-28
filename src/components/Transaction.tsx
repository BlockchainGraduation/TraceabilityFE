import instanceAxios from '@/api/instanceAxios';
import { useAppSelector } from '@/hooks';
import currency from '@/services/currency';
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
import moment from 'moment';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';

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
  const [skip, setSkip] = useState(1);
  const [limit, setLimit] = useState(10);
  const [transactionTotal, setTransactionTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [listTransaction, setListTransaction] = useState<TransactionType[]>([]);
  const currentUser = useAppSelector((state) => state.user.user);

  const fetchDataTransaction = useCallback(async () => {
    setLoading(true);
    await instanceAxios
      .get(
        currentTable === 'BUY'
          ? `transaction-me?create_by=${currentUser.id}&page=${skip}`
          : `sell-transaction-me`
      )
      .then((res) => {
        console.log(res.data);
        setTransactionTotal(res.data.count);
        const newListTransaction = [...res.data.results].map((item, index) => ({
          key: (skip - 1) * limit + index + 1,
          ...item,
        }));
        setListTransaction(newListTransaction);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [currentTable, currentUser.id, skip, limit]);
  useEffect(() => {
    fetchDataTransaction();
  }, [fetchDataTransaction]);

  const columns: ColumnsType<TransactionType> = [
    {
      title: 'Stt',
      dataIndex: 'key',
      width: 65,
    },
    {
      title: currentTable === 'BUY' ? 'Người bán' : 'Người mua',
      dataIndex: 'product.user.username',
      render: (value, record, index) => record.product_id?.create_by?.fullname,
      width: 250,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product.name',
      render: (value, record, index) => record.product_id?.name,
    },
    {
      title: 'Số lượng bán',
      dataIndex: 'quantity',
    },
    {
      title: 'Giá đơn vị',
      dataIndex: 'price',
      render: (value, record, index) => `${value.toLocaleString()} ${currency}`,
    },
    {
      title: 'Tổng giá trị',
      dataIndex: 'quantity',
      render: (value, record, index) =>
        `${(
          (record.price || 0) * (record.quantity || 0)
        ).toLocaleString()} ${currency}`,
    },
    {
      title: 'Ngày giao dịch',
      dataIndex: 'created_at',
      render: (value, record, index) =>
        moment(value).format('DD/MM/YYYY - HH:mm:ss'),
    },
    {
      title: 'Trạng thái',
      dataIndex: '',
      render: (value, record, index) => {
        switch (record.status) {
          case 'REJECT':
            return <Tag color={'red'}>GD Thất bại</Tag>;
          case 'DONE':
            return <Tag color={'success'}>GD thành công</Tag>;
          case 'ACCEPT':
            return <Tag color={'blue'}>Đã xác nhận</Tag>;
          default:
            return <Tag color={'yellow'}>Đang chờ</Tag>;
        }
      },
      // record.status === 'PENDDING' ? (
      //   <Tag color={'success'}>Thành công</Tag>
      // ) : (
      //   <Tag color={'error'}>Thất bại</Tag>
      // ),
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
      <div className="flex bg-[#fafafa] items-center justify-between py-[10px] my-[20px] px-[20px] border-[1px] rounded-[10px]">
        <p className="text-2xl font-medium">Lịch sử giao dịch của bạn</p>
      </div>
      <Segmented
        size={'large'}
        className="mb-[20px]"
        defaultValue={currentTable}
        onChange={(e) => setCurrentTable(e.toString())}
        options={[
          { label: 'Lịch sử mua', value: 'BUY' },
          { label: 'Lịch sử bán', value: 'SELL' },
        ]}
      />
      <div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={listTransaction}
          pagination={{
            onChange: (e) => {
              setSkip(e);
            },
            current: skip,
            pageSize: 10,
            total: transactionTotal,
            position: ['bottomCenter'],
          }}
          scroll={{ y: 340 }}
        />
      </div>
    </div>
  );
}
