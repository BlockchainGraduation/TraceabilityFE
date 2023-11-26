'use client';
import { NextIntlClientProvider } from 'next-intl';
import { notFound, useRouter } from 'next/navigation';
import type { Metadata } from 'next';
import { Providers } from '@/providers';
import Header from '@/components/Header';
import { ReactNode, useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Skeleton, message } from 'antd';
import useSWR, { useSWRConfig } from 'swr';
import Footer from '@/components/Footer';
import { getCookie } from 'cookies-next';
import dynamic from 'next/dynamic';
import instanceAxios from '@/api/instanceAxios';
import { setLogin } from '@/reducers/userSlice';
import { useEffectOnce } from 'usehooks-ts';
// export function generateStaticParams() {
//   return [{ locale: 'en' }, { locale: 'vi' }];
// }
// const Header = dynamic(() => import('@/components/Header'),{loading:()=><Skeleton/>});
// const Footer = dynamic(() => import('@/components/Footer'));

interface NotificationType {
  message: string;
  params: {
    marketplace_id: string;
    notification_type: string;
  };
  data: {
    created_at: number;
    unread: string;
    notification_id: string;
  };
}

export const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY || '', {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || '', // Replace with 'cluster' from dashboard
});

export default function HaveHeaderLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
      {!loading && (
        <div>
          <Header />
          <div className="min-h-[600px]">{children}</div>
          <Footer />
        </div>
      )}
    </>
  );
}
