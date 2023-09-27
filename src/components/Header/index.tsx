'use client';
import staticVariables from '@/static';
import { Image, Modal } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [user, setUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const path = usePathname()
  const [currentForm, setCurrentForm] = useState<
    'LOGIN' | 'REGISTER' | 'FORGET'
  >('LOGIN');
  return (
    <div
      className={`w-full ${path==='/' && 'text-white'} fixed z-10 flex items-center justify-between backdrop-blur-[50px] pl-5 pr-10 height-fit bg-transparent`}
    >
      <Image
        width={50}
        height={50}
        className={`object-cover`}
        src={staticVariables.logoRaiden.src}
        alt=""
      />
      <div className={`flex`}>
        <Link
          className={`py-3 px-10 hover:scale-125 hover:border-b-[1px]`}
          href={'/'}
        >
          <p className={`text-inherit`}>Trang chủ</p>
        </Link>
        <Link
          className={`py-3 px-10 hover:scale-125 hover:border-b-[1px]`}
          href={'/home'}
        >
          <p className={`text-inherit`}>Nhật kí</p>
        </Link>
        <Link
          className={`py-3 px-10 hover:scale-125 hover:border-b-[1px]`}
          href={'/hitory'}
        >
          <p className={`text-inherit`}>Sản phẩm</p>
        </Link>
        <Link
          className={`py-3 px-10 hover:scale-125 hover:border-b-[1px]`}
          href={'/hitory'}
        >
          <p className={`text-inherit`}>Hỗ trợ</p>
        </Link>
      </div>
      <div>
        {user ? (
          <div>User</div>
        ) : (
          <div className={`text-inherit'} cursor-pointer`} onClick={() => setShowModal(true)}>
            Đăng nhập
          </div>
        )}
      </div>
      <Modal
        open={showModal}
        width={currentForm === 'REGISTER' ? 1000 : 520}
        className={``}
        centered
        onCancel={() => setShowModal(false)}
        footer={[]}
      >
        {currentForm === 'LOGIN' && <Login />}
        {currentForm === 'REGISTER' && <Register />}
        <div className="flex justify-around	">
          <p>Forget?</p>
          <p
            onClick={() =>
              currentForm === 'LOGIN'
                ? setCurrentForm('REGISTER')
                : setCurrentForm('LOGIN')
            }
          >
            {currentForm === 'LOGIN' ? 'Register' : 'Login'}
          </p>
        </div>
      </Modal>
    </div>
  );
}
