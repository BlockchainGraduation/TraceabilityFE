import instanceAxios from '@/api/instanceAxios';
import staticVariables from '@/static';
import { DownOutlined } from '@ant-design/icons';
import {
  Avatar,
  Dropdown,
  Popconfirm,
  Select,
  Space,
  Tag,
  Tooltip,
  message,
} from 'antd';
import moment from 'moment';
import React from 'react';

export default function OrderItem({
  data,
  onFinish,
  onReject,
  onAccept,
}: {
  data?: TransactionType;
  onFinish?: () => void;
  onReject?: () => void;
  onAccept?: () => void;
}) {
  const fetchAcceptTransaction = async (status: boolean) => {
    await instanceAxios
      .patch(`accept-transaction/${data?.id}`, { status })
      .then((res) => {
        if (status) {
          message.success(`Đã nhận đơn của ${data?.create_by?.fullname}`);
          onAccept?.();
        } else {
          onReject?.();
          message.warning(`Đã từ chối đơn của ${data?.create_by?.fullname}`);
        }
        onFinish?.();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="w-full flex items-center px-[20px] rounded-xl bg-white">
      <div className="w-[10%]">
        <Avatar src={data?.create_by?.avatar || staticVariables.noImage.src} />
      </div>
      <div className="flex w-[70%] flex-col">
        <div className="flex items-center py-[10px] gap-x-5">
          <p className=" truncate">{data?.create_by?.fullname}</p>
          <Tooltip
            title={moment(data?.create_at).format('DD/MM/YYYY - HH:MM:ss')}
          >
            <p className="truncate text-[12px] text-gray-700">
              {moment(data?.create_at).fromNow()}
            </p>
          </Tooltip>
        </div>
        <div className="flex w-full px-[30px]">
          <div className="flex w-1/2 items-center space-x-2">
            <p className="text-gray-500">Số lượng:</p>
            <p className="font-normal text-[18px]">{data?.quantity}</p>
          </div>
          <div className="flex w-1/2 items-center space-x-2">
            <p className="text-gray-500">Tổng phí:</p>
            <p className="font-normal text-[18px]">{data?.price}</p>
          </div>
        </div>
      </div>
      <div className="w-[20%]">
        {data?.status === 'PENDDING' ? (
          <Dropdown
            trigger={['click']}
            className="w-full"
            menu={{
              items: [
                {
                  key: 1,
                  label: (
                    <Popconfirm
                      cancelButtonProps={{ style: { backgroundColor: 'red' } }}
                      okButtonProps={{ style: { backgroundColor: '#66ae02' } }}
                      onConfirm={() => fetchAcceptTransaction(true)}
                      title="Xác nhận"
                    >
                      <p className="truncate">Xác nhận</p>
                    </Popconfirm>
                  ),
                },
                {
                  key: 2,
                  label: (
                    <Popconfirm
                      cancelButtonProps={{
                        style: { backgroundColor: '#66ae02' },
                      }}
                      okButtonProps={{ style: { backgroundColor: 'red' } }}
                      onConfirm={() => fetchAcceptTransaction(true)}
                      title="Từ chối"
                    >
                      <p className="text-red-500 truncate">Từ chối</p>
                    </Popconfirm>
                  ),
                },
              ],
            }}
          >
            <Space className="border-[1px] rounded px-[10px]">
              Thao tác <DownOutlined />
            </Space>
          </Dropdown>
        ) : (
          <Tag
            color={
              data?.status === 'ACCEPT'
                ? 'blue'
                : data?.status === 'REJECT'
                ? 'red'
                : 'green'
            }
            className=" w-full text-center rounded px-[10px]"
          >
            {data?.status}
          </Tag>
        )}
      </div>
    </div>
  );
}
