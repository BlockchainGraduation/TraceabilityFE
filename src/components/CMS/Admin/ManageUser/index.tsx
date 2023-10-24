import instanceAxios from '@/api/instanceAxios';
import {
  faCircleXmark,
  faLock,
  faLockOpen,
  faPenToSquare,
  faStore,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Col,
  Collapse,
  ConfigProvider,
  Popconfirm,
  Row,
  Segmented,
  Table,
  Tag,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import React, { ReactNode, useEffect, useState } from 'react';
import useSWR from 'swr';

interface DataType {
  key: React.Key;
  index: number;
  userId?: string;
  userName?: string;
  phone?: string;
  mail?: number;
  joinDate?: string;
  role?: string;
  requestRole?: string;
  status?: string;
}

export default function ManageUser() {
  const [currentTable, setCurrentTable] = useState('all');
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);

  const columnsWaiting: ColumnsType<DataType> =
    currentTable === 'waiting'
      ? [
          {
            title: 'Role',
            dataIndex: 'role',
          },
          {
            title: 'Role yêu cầu',
            dataIndex: 'requestRole',
          },
        ]
      : [
          {
            title: 'Role',
            dataIndex: 'role',
          },
        ];
  const columns: ColumnsType<DataType> = [
    {
      title: 'Stt',
      dataIndex: 'index',
      width: 65,
    },
    {
      title: 'Người dùng',
      dataIndex: 'userName',
      width: 250,
    },
    {
      title: 'Tên tài khoản',
      dataIndex: 'userName',
    },
    {
      title: 'Mail',
      dataIndex: 'mail',
    },
    {
      title: 'Ngày tham gia',
      dataIndex: 'joinDate',
    },
    // {
    //   title: 'Role',
    //   dataIndex: 'total',
    // },
    ...columnsWaiting,
    // currentTable == 'waiting'
    //   ? {
    //       title: 'Role yêu cầu',
    //       dataIndex: 'total',
    //     }
    //   : {
    //       title: 'Role',
    //       dataIndex: 'total',
    //     },

    {
      title: 'Trạng thái',
      dataIndex: '',
      render: (value, record, index) =>
        record.index % 2 ? (
          <Tag color={'success'}>Kích hoạt</Tag>
        ) : (
          <Tag color={'gold'}>Chưa kích hoạt</Tag>
        ),
    },

    {
      title: 'Hành động',
      dataIndex: 'total',
      render: (value, record, index) => (
        <ConfigProvider
          theme={{
            components: {
              Button: {
                primaryColor: '#e62929',
              },
            },
            token: {
              colorBgContainer: '#7f84d4',
            },
          }}
        >
          <Row className="flex gap-x-2">
            {currentTable === 'waiting' && (
              <>
                <Tag>OK</Tag>
                <Tag>OK</Tag>
              </>
            )}
            <Col span={3}>
              <Link href={`/product/${record.key}`}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  style={{ color: '#2657ab' }}
                />
              </Link>
            </Col>
            <Col span={3}>
              {record.role === 'PUBLISH' ? (
                <FontAwesomeIcon
                  //   onClick={() => fetchUpdateProductStatus(record.id, 'PRIVATE')}
                  icon={faLockOpen}
                  style={{ color: '#27913c' }}
                />
              ) : (
                <FontAwesomeIcon
                  //   onClick={() => fetchUpdateProductStatus(record.id, 'PUBLISH')}
                  icon={faLock}
                  style={{ color: '#a87171' }}
                />
              )}
            </Col>
            <Col span={3}>
              <Popconfirm
                title="Sure to open market ?"
                // onConfirm={() => fetchCreateMarket(record.id)}
              >
                <FontAwesomeIcon icon={faStore} style={{ color: '#65dd55' }} />
              </Popconfirm>
            </Col>
            <Col span={3}>
              <Popconfirm
                title="Sure to delete?"
                // onConfirm={() => fetchDeleteProduct(record.id)}
              >
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  style={{ color: '#c01616' }}
                />
              </Popconfirm>
            </Col>
          </Row>
        </ConfigProvider>
      ),
    },
  ];
  const data: DataType[] = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      key: i,
      index: i + 1,
      userId: 'ReactNode',
      userName: 'string',
      phone: '12',
      mail: 2312,
      joinDate: '131',
      //   date: 'string',
      status: 'string',
    });
  }
  //   useEffect(() => {
  const fetchUserRequest = async () => {
    await instanceAxios
      .get(`user/list_users_request?skip=${skip}&limit=${limit}`)
      .then((res) => console.log(res.data.data))
      .catch((err) => {
        console.log(err);
      });
  };
  useSWR('user/list_users_request', fetchUserRequest);
  //     fetchUserRequest();
  //   }, [limit, skip]);
  return (
    <div>
      <div className="flex  items-center justify-between p-[20px] border-[1px] rounded-[10px]">
        <p className="text-3xl font-medium">Danh sách sản phẩm</p>
      </div>
      <Segmented
        size={'large'}
        defaultValue={currentTable}
        onChange={(e) => setCurrentTable(e.toString())}
        options={[
          { label: 'All', value: 'all' },
          { label: 'Yêu cầu kích hoạt', value: 'waiting' },
          { label: 'Đã duyệt', value: 'active' },
          { label: 'Chưa kích hoạt', value: 'not-activate' },
        ]}
      />
      <div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10, total: 30, position: ['bottomCenter'] }}
          scroll={{ y: 400 }}
        />
      </div>
    </div>
  );
}
