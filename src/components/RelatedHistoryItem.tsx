import getRole from '@/services/getRole';
import staticVariables from '@/static';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, Image, Modal, Popover, Space } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useEffectOnce } from 'usehooks-ts';

export default function RelatedHistoryItem({ data }: { data: ProductType }) {
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const router = useRouter();
  useEffectOnce(() => {
    console.log(data);
  });
  return (
    <div className="w-3/5 relative flex justify-end py-[20px] before:absolute before:w-1/3 before:h-full before:border-current-color  before:rounded-bl-2xl before:border-dashed before:border-l-4 before:border-b-4 before:-top-[20px] before:left-0">
      <Popover
        content={
          <div className="flex flex-col gap-y-5 p-[10px]">
            <Button onClick={() => router.push(`/user/${data.create_by?.id}`)}>
              Xem bên liên quan
            </Button>
            <Button onClick={() => router.push(`/product/${data.id}`)}>
              Xem sản phẩm liên quan
            </Button>
          </div>
        }
      >
        <div
          onClick={() => setOpenModalInfo(true)}
          className="flex w-2/3 bg-white translate-y-1/2 items-center gap-x-5 py-[10px] px-[20px] rounded-xl border-[1px]"
        >
          <div>
            <Avatar
              size={'large'}
              src={data.create_by?.avatar || staticVariables.noImage.src}
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <p className="font-semibold">{getRole(data.product_type || '')}</p>
            <Space>
              <FontAwesomeIcon icon={faUser} style={{ color: '#2b8c3f' }} />
              <p className="w-[100px] truncate">{data.create_by?.fullname}</p>
            </Space>
          </div>
        </div>
      </Popover>
      {/* <Modal
        open={openModalInfo}
        onCancel={() => setOpenModalInfo(false)}
        className=""
        footer={[]}
      >
        <div className="w-full">
          <div className="w-full">
            <p className="text-[25px] font-semibold border-2 w-fit px-[20px] rounded-xl">
              Bên liên quan
            </p>
            <div className="flex">
              <div className="w-1/2">
                <Avatar
                  size={100}
                  src={data.create_by?.avatar || staticVariables.noImage.src}
                />
              </div>
              <div className="flex w-1/2 flex-col">
                <p className="text-[20px]">{data.create_by?.fullname}</p>
                <div>
                  Vai trò
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal> */}
    </div>
  );
}
