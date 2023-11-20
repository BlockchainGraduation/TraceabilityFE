import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image, Space, Typography } from 'antd';
import React from 'react';

export default function UserInformation({ data }: { data?: UserType }) {
  return (
    <div className="w-full flex gap-x-5">
      <div className="w-2/5 p-[10px] flex gap-y-10 flex-col">
        <div className="w-full bg-white p-[20px] rounded-xl">
          <p className="text-[20px] font-bold">Giới thiệu</p>
          <p className={`${!data?.description && 'text-[#656565]'}`}>
            {data?.description || 'Người dùng chưa thêm ...'}
          </p>
        </div>
        <div className="w-full flex gap-y-5 flex-col bg-white p-[20px] rounded-xl">
          <p className="text-[20px] font-bold">Thông liên hệ</p>
          {data?.email && (
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon
                size={'2x'}
                icon={faEnvelope}
                style={{ color: '#4c79c8' }}
              />
              <Typography.Text copyable>{data?.email}</Typography.Text>
            </div>
          )}
          {data?.phone && (
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon
                size={'2x'}
                icon={faPhone}
                style={{ color: '#4c79c8' }}
              />
              <Typography.Text copyable>{data?.phone}</Typography.Text>
            </div>
          )}
          {data?.geographical_address && (
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon
                size={'2x'}
                icon={faLocationDot}
                style={{ color: '#4c79c8' }}
              />
              <Typography.Text copyable>
                {data?.geographical_address}
              </Typography.Text>
            </div>
          )}
        </div>
      </div>
      <div className="w-3/5 flex flex-col gap-y-10 p-[10px] ">
        <div className="w-full bg-white p-[20px] rounded-xl">
          <p className="text-[20px] pb-[20px] font-bold">Ảnh đại diện</p>
          <div className={`w-full`}>
            <Image
              width={'100%'}
              height={300}
              preview={false}
              src={data?.avatar}
              alt=""
              className="object-cover rounded-xl"
            />
          </div>
        </div>
        {data?.user_banner?.length ? (
          <div className="w-full bg-white p-[20px] rounded-xl">
            <p className="text-[20px] pb-[20px] font-bold">Ảnh liên quan</p>
            <div className={`w-full relative`}>
              <Image
                width={'100%'}
                height={300}
                preview={false}
                src={data?.user_banner[0].image}
                alt=""
                className="object-cover rounded-xl"
              />
              {data?.user_banner?.length > 1 && (
                <div className="w-[25%] absolute bottom-0 text-white flex items-center justify-center right-0 rounded-xl h-[25%] bg-[#000000D3]">
                  <p>+ {data?.user_banner?.length}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
