'use client';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Login from '@/components/Header/Login';
import Register from '@/components/Header/Register';
import ForgetForm from '@/components/Header/Register/ForgetForm';
import staticVariables from '@/static';
import { Image } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useEffectOnce } from 'usehooks-ts';

export default function LoginPage() {
  const [loadingPage, setLoadingPage] = useState(true);
  const [currentForm, setCurrentForm] = useState<
    'LOGIN' | 'REGISTER' | 'FORGET'
  >('LOGIN');
  const route = useRouter();

  const onFinishOTP = () => {
    setCurrentForm('LOGIN');
  };
  useEffectOnce(() => {
    setLoadingPage(false);
  });
  return (
    !loadingPage && (
      <div className="w-full ">
        <Header />
        <div className="w-4/5 flex m-auto my-[100px] min-h-[550px] rounded-xl bg-[#f5f5f5] p-[50px]">
          <div className="relative w-1/2  min-h-full">
            <Image
              preview={false}
              width={'100%'}
              height={'100%'}
              className="object-cover rounded-xl"
              alt=""
              src={staticVariables.shrimpBg.src}
            />
            <div className="w-full h-full rounded-xl flex items-center justify-center top-0 absolute bg-[#00000089]">
              <div className="text-white w-1/2">
                <p className="text-[35px] tracking-[5px] text-center font-bold">
                  Wellcome
                </p>
                <p className="text-justify tracking-[1px]">
                  {`We source the healthiest and most beautiful seed to bring nature's finest to your home.We provide expert care advice to ensure your shrimp thrive.`}
                </p>
              </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col px-[50px]">
            <div>
              <p className="text-[30px] font-serif font-semibold tracking-[5px]">
                SimpRaidenEi
              </p>
            </div>
            {currentForm === 'LOGIN' && (
              <Login
                onFinish={() => {
                  route.push('/home');
                }}
              />
            )}
            {currentForm === 'REGISTER' && (
              <Register
                // onFinishOTP={onFinishOTP}
                onFinish={() => {
                  route.push('/register-rule');
                }}
              />
            )}
            {currentForm === 'FORGET' && (
              <ForgetForm onFinishOTP={onFinishOTP} />
            )}
            <div className="w-full flex justify-around">
              <p onClick={() => setCurrentForm('FORGET')}>Forget?</p>
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
          </div>
        </div>
        <Footer />
      </div>
    )
  );
}
