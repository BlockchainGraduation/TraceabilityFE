import instanceAxios from '@/api/instanceAxios';
import {
  faCircleXmark,
  faEnvelope,
  faEye,
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
  Popover,
  Row,
  Segmented,
  Table,
  Tag,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import React, {
  ReactNode,
  useEffect,
  useState,
  memo,
  useCallback,
} from 'react';
import useSWR, { useSWRConfig } from 'swr';

interface DataType {
  key: React.Key;
  index: number;
  full_name?: string;
  hashed_data?: string;
  updated_at?: string;
  avatar?: string;
  birthday?: string;
  phone?: string;
  hashed_password?: string;
  email?: string;
  verify_code?: string;
  address_wallet?: null;
  system_role?: string;
  is_active?: true;
  confirm_status?: string;
  username?: string;
  private_key?: string;
  survey_data?: {};
  id: string;
  address_real?: string;
  created_at?: string;
}

export default memo(function ManageUser() {
  const [currentTable, setCurrentTable] = useState('all');
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState<DataType[]>([]);
  const { mutate } = useSWRConfig();

  const columnsWaiting: ColumnsType<DataType> =
    currentTable === 'waiting'
      ? [
          {
            title: 'Role',
            dataIndex: 'system_role',
          },
          {
            title: 'Role yêu cầu',
            dataIndex: 'requestRole',
          },
        ]
      : [
          {
            title: 'Role',
            dataIndex: 'system_role',
          },
        ];
  const columns: ColumnsType<DataType> = [
    {
      title: 'Stt',
      dataIndex: 'key',
      width: 65,
    },
    {
      title: 'Người dùng',
      dataIndex: 'full_name',
      width: 200,
    },
    {
      title: 'Tên tài khoản',
      dataIndex: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      // width: 200,
    },
    {
      title: 'Ngày tham gia',
      dataIndex: 'created_at',
    },
    ...columnsWaiting,
    {
      title: 'Trạng thái',
      dataIndex: '',
      render: (value, record, index) =>
        record.is_active ? (
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
              Popover: {},
            },
            token: {
              colorBgContainer: '#7f84d4',
            },
          }}
        >
          <Row className="flex gap-x-2">
            {currentTable === 'waiting' ? (
              <div className="flex items-center">
                <Tag color={'error'}>Reject</Tag>
                <Tag color={'success'}>Accept</Tag>
              </div>
            ) : (
              <>
                <Col span={3}>
                  <Link href={`/product/${record.key}`}>
                    <Popover title="Kiểm tra người dùng">
                      <FontAwesomeIcon
                        icon={faEye}
                        style={{ color: '#2657ab' }}
                      />
                    </Popover>
                  </Link>
                </Col>
                <Col span={3}>
                  {record.system_role === 'PUBLISH' ? (
                    <Popconfirm
                      title="Sure to block this user ?"
                      // onConfirm={() => fetchCreateMarket(record.id)}
                    >
                      <Popover title="Nhắn tin cho người dùng">
                        <FontAwesomeIcon
                          //   onClick={() => fetchUpdateProductStatus(record.id, 'PRIVATE')}
                          icon={faLockOpen}
                          style={{ color: '#27913c' }}
                        />
                      </Popover>
                    </Popconfirm>
                  ) : (
                    <Popconfirm
                      title="Sure to open this user ?"
                      // onConfirm={() => fetchCreateMarket(record.id)}
                    >
                      <Popover title="Nhắn tin cho người dùng">
                        <FontAwesomeIcon
                          //   onClick={() => fetchUpdateProductStatus(record.id, 'PUBLISH')}
                          icon={faLock}
                          style={{ color: '#a87171' }}
                        />
                      </Popover>
                    </Popconfirm>
                  )}
                </Col>
                <Col span={3}>
                  <Popconfirm
                    title="Send mail to this user ?"
                    // onConfirm={() => fetchCreateMarket(record.id)}
                  >
                    <Popover title="Nhắn tin cho người dùng">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        style={{ color: '#65dd55' }}
                      />
                    </Popover>
                  </Popconfirm>
                </Col>
                <Col span={3}>
                  <Popconfirm
                    title="Sure to delete?"
                    // onConfirm={() => fetchDeleteProduct(record.id)}
                  >
                    <Popover title="Xóa người dùng">
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        style={{ color: '#c01616' }}
                      />
                    </Popover>
                  </Popconfirm>
                </Col>
              </>
            )}
          </Row>
        </ConfigProvider>
      ),
    },
  ];
  // const data: DataType[] = [];
  // for (let i = 0; i < 10; i++) {
  //   data.push({
  //     key: i,
  //     index: i + 1,
  //     userId: 'ReactNode',
  //     userName: 'string',
  //     phone: '12',
  //     mail: 2312,
  //     joinDate: '131',
  //     role: 'string',
  //     requestRole: 'string',
  //     status: 'string',
  //   });
  // }
  const fetchUser = useCallback(async () => {
    setLoading(true);
    await instanceAxios
      .get(
        `${
          currentTable === 'waiting' ? `user/list_users_request` : `user/list`
        }?skip=${skip}&limit=${limit}`
      )
      .then((res) => {
        // console.log(res.data.data);
        const newList: DataType[] = [...res.data.data.list_users].map(
          (item, index) => ({
            key: skip * limit + index + 1,
            ...item,
          })
        );
        setUserList(newList);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [currentTable, limit, skip]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // useSWR('user/list_users_request', fetchUserRequest);
  // useSWR('user/list', fetchAllUser);
  const handleChangeTable = async (e: any) => {
    setCurrentTable(e.toString());
  };

  return (
    <div>
      <div className="flex  items-center justify-between p-[20px] border-[1px] rounded-[10px]">
        <p className="text-3xl font-medium">Danh sách sản phẩm</p>
      </div>
      <Segmented
        size={'large'}
        defaultValue={currentTable}
        onChange={handleChangeTable}
        options={[
          { label: 'All', value: 'all' },
          { label: 'Yêu cầu kích hoạt', value: 'waiting' },
          { label: 'Đã duyệt', value: 'active' },
          { label: 'Chưa kích hoạt', value: 'not-activate' },
        ]}
      />
      <div data-aos="fade-left">
        <Table
          loading={loading}
          columns={columns}
          dataSource={userList}
          pagination={{ pageSize: 10, total: 30, position: ['bottomCenter'] }}
          scroll={{ y: 400 }}
        />
      </div>
    </div>
  );
});
