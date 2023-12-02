import instanceAxios from '@/api/instanceAxios';
import {
  CloseCircleTwoTone,
  ExclamationCircleTwoTone,
  EyeTwoTone,
  LockTwoTone,
  MessageTwoTone,
  SettingTwoTone,
  UnlockTwoTone,
} from '@ant-design/icons';
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
  Button,
  Col,
  Collapse,
  ConfigProvider,
  Dropdown,
  Popconfirm,
  Popover,
  Row,
  Segmented,
  Space,
  Table,
  Tag,
  notification,
} from 'antd';
import { SegmentedValue } from 'antd/es/segmented';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import Link from 'next/link';
import React, {
  ReactNode,
  useEffect,
  useState,
  memo,
  useCallback,
} from 'react';
import useSWR, { useSWRConfig } from 'swr';

export default memo(function ManageUser() {
  const [currentTable, setCurrentTable] = useState('all');
  const [confirmStatus, setConfirmStatus] = useState<SegmentedValue>('');
  const [skip, setSkip] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [totalUser, setTotalUser] = useState(0);
  const [userList, setUserList] = useState<UserType[]>([]);
  const { mutate } = useSWRConfig();
  const fetchAction = async (record: UserType, status: boolean) => {
    await instanceAxios
      .patch(`user/confirm`, {
        user_id: record.id,
        status,
      })
      .then((res) => {
        if (status)
          notification.success({
            message: 'Thành công',
            description: `Đã chấp nhận yêu cầu của ${record.username}`,
          });
        else
          notification.success({
            message: 'Thành công',
            description: `Đã từ chối yêu cầu của ${record.username}`,
          });
        mutate('user/list');
      })
      .catch((err) => {
        notification.error({
          message: 'Lỗi',
          description: `Đã có lỗi xảy ra`,
        });
      });
  };
  const columnsWaiting: ColumnsType<UserType> =
    confirmStatus === 'PENDDING'
      ? [
          {
            title: 'Role',
            dataIndex: 'role',
          },
          {
            title: 'Role yêu cầu',
            // dataIn   dex: '',
            render: (value, record, index) => record.survey?.user_role,
          },
        ]
      : [
          {
            title: 'Role',
            dataIndex: 'role',
          },
        ];
  const columns: ColumnsType<UserType> = [
    {
      title: 'Stt',
      dataIndex: 'key',
      width: 65,
    },
    confirmStatus === 'PENDDING'
      ? {
          title: 'Tên yêu cầu',
          dataIndex: 'fullname',
          width: 200,
          render: (value, record, index) => record.survey?.name,
        }
      : {
          title: 'Người dùng',
          dataIndex: 'fullname',
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
      render: (value, record, index) => moment(value).format('DD/MM/YYYY'),
    },
    ...columnsWaiting,
    {
      title: 'Trạng thái',
      dataIndex: '',

      render: (value, record, index) =>
        record.confirm_status == 'DONE' ? (
          <Tag color={'success'}>Đã kích hoạt</Tag>
        ) : (
          <Tag color={'gold'}>Chưa kích hoạt</Tag>
        ),
    },

    {
      title: <p className="text-center"> Hành động</p>,
      width: 150,
      render: (value, record, index) => (
        <ConfigProvider
          theme={{
            components: {
              Button: {
                primaryColor: '#e62929',
              },
              Popover: {
                zIndexPopup: 1051,
              },
            },
            token: {
              colorBgContainer: '#7f84d4',
            },
          }}
        >
          {confirmStatus === 'PENDDING' ? (
            <div className="flex items-center gap-2">
              <Button
                onClick={() => fetchAction(record, false)}
                className="text-[10px] py-[6px] px-[10px]"
              >
                Từ chối
              </Button>
              <Button
                onClick={() => fetchAction(record, true)}
                className="text-[10px] py-[6px] px-[10px]"
              >
                Xác nhận
              </Button>
            </div>
          ) : (
            <Dropdown
              placement={'bottomLeft'}
              trigger={['click']}
              menu={{
                items: [
                  {
                    key: 1,
                    label: (
                      <Link href={`/user/${record.id}`}>
                        {/* <Popover placement={'left'} title="Xem người dùng"> */}
                        <Space>
                          <EyeTwoTone />
                          <p>Xem người dùng</p>
                        </Space>
                        {/* </Popover> */}
                      </Link>
                    ),
                  },
                  {
                    key: 2,
                    label: (
                      <Popconfirm
                        title={`${
                          record.is_active
                            ? 'Chặn người dùng ?'
                            : 'Mở khóa người dùng ?'
                        }`}
                        // onConfirm={() => fetchCreateMarket(record.id)}
                      >
                        {/* <Popover
                          placement={'left'}
                          title={
                            record.system_role === 'PUBLISH'
                              ? 'Block tài khoản này'
                              : 'Mở khóa tài khoản này'
                          }
                        > */}
                        <Space>
                          {record.is_active ? (
                            <LockTwoTone />
                          ) : (
                            // <FontAwesomeIcon
                            //   //   onClick={() => fetchUpdateProductStatus(record.id, 'PRIVATE')}
                            //   icon={faLockOpen}
                            //   style={{ color: '#27913c' }}
                            // />
                            // <FontAwesomeIcon
                            //   //   onClick={() => fetchUpdateProductStatus(record.id, 'PUBLISH')}
                            //   icon={faLock}
                            //   style={{ color: '#a87171' }}
                            // />
                            <UnlockTwoTone />
                          )}
                          <p>
                            {record.is_active
                              ? 'Chặn người dùng này'
                              : 'Mở khóa người dùng này'}
                          </p>
                        </Space>
                        {/* </Popover> */}
                      </Popconfirm>
                    ),
                  },
                  {
                    key: 3,
                    label: (
                      // <Popover
                      //   placement={'left'}
                      //   title="Nhắn tin cho người dùng"
                      // >
                      <Space>
                        <MessageTwoTone />
                        <p>Nhắn tin cho người dùng</p>
                      </Space>
                      // </Popover>
                    ),
                  },
                  {
                    key: 4,
                    label: (
                      <Popconfirm
                        title="Sure to delete?"
                        // onConfirm={() => fetchDeleteProduct(record.id)}
                      >
                        {/* <Popover placement={'left'} title="Xóa người dùng"> */}
                        <Space>
                          <CloseCircleTwoTone className="text-red-600" />
                          <p>Xóa người dùng</p>
                        </Space>
                        {/* </Popover> */}
                      </Popconfirm>
                    ),
                  },
                ],
              }}
            >
              {/* <div className='text'> */}
              <SettingTwoTone className="m-auto block" />
              {/* </div> */}
            </Dropdown>
          )}
        </ConfigProvider>
      ),
    },
  ];
  const fetchUser = useCallback(async () => {
    setLoading(true);
    await instanceAxios
      .get(
        `user/list?${
          confirmStatus === '' ? '' : `confirm_status=${confirmStatus}&`
        }page=${skip}`
      )
      .then((res) => {
        // console.log(res.data.data);
        const newList: UserType[] = [...res.data.results].map(
          (item, index) => ({
            key: `${skip - 1}${index + 1}`,
            ...item,
          })
        );
        setUserList(newList);
        setTotalUser(res.data.count);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [confirmStatus, skip]);
  useSWR(`user/list`, fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // useSWR('user/list_users_request', fetchUserRequest);
  // useSWR('user/list', fetchAllUser);
  const handleChangeTable = async (e: SegmentedValue) => {
    setSkip(1);
    setCurrentTable(e.toString());
    setConfirmStatus(e);
  };

  return (
    <div>
      <div className="flex  items-center justify-between p-[20px] border-[1px] rounded-[10px]">
        <p className="text-3xl font-medium">Quản lí người dùng</p>
      </div>
      <Segmented
        size={'large'}
        className="m-auto block w-fit my-[30px]"
        defaultValue={confirmStatus}
        onChange={handleChangeTable}
        options={[
          { label: 'All', value: '' },
          { label: 'Yêu cầu kích hoạt', value: 'PENDDING' },
          { label: 'Đã kích hoạt', value: 'DONE' },
          { label: 'Chưa kích hoạt', value: 'NONE' },
        ]}
      />
      <div data-aos="fade-left">
        <Table
          loading={loading}
          columns={columns}
          dataSource={userList}
          pagination={{
            pageSize: limit,
            onChange: (e) => setSkip(e - 1),
            total: totalUser,
            position: ['bottomCenter'],
            current: skip,
          }}
          scroll={{ y: 400 }}
        />
      </div>
    </div>
  );
});
