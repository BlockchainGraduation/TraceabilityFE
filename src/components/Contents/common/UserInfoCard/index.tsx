import staticVariables from '@/static';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button } from 'antd';
import Link from 'next/link';
import React from 'react';

export default function UserInfoCard() {
  return (
    <div>
      <div className="flex items-center border-b-[1px] pb-[50px]">
        <div className="flex items-center gap-y-5 flex-col w-1/5">
          <Avatar size={150} src={staticVariables.logoRaiden.src} />
          <Link href={`/user/${1}`}>
            <Button>Xem them</Button>
          </Link>
        </div>
        <div className="flex gap-y-5 flex-col border-[1px] px-[30px] py-[20px] rounded">
          <div className="flex items-center">
            <MailOutlined />
            Nguyen Van A
          </div>
          <div className="flex items-center">
            <PhoneOutlined />
            0123131313
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon width={20} icon={faLocationDot} />
            Nguyen Van A
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon width={20} icon={faLocationDot} />
            14 - Doan Uan - Khue My - NHS - DN
          </div>
        </div>
      </div>
    </div>
  );
}
