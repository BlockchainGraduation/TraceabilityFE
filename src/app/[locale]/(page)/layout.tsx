'use client';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Providers } from '@/providers';
import Header from '@/components/Header';
import { ReactNode, useEffect } from 'react';
import Pusher from 'pusher-js';
import { useAppSelector } from '@/hooks';
import { message } from 'antd';
import { useSWRConfig } from 'swr';
// export function generateStaticParams() {
//   return [{ locale: 'en' }, { locale: 'vi' }];
// }

export const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY || '', {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || '', // Replace with 'cluster' from dashboard
});

export default function LocaleLayout({ children }: { children: ReactNode }) {
  const currentUser = useAppSelector((state) => state.user.user);
  const { mutate } = useSWRConfig();
  useEffect(() => {
    const channel = pusher.subscribe('general-channel');
    channel.bind(currentUser.id, (data: any) => {
      message.info('Bạn vừa có thông báo mới');
      mutate('notifications/list');
      console.log(data);
    });

    return () => {
      pusher.unsubscribe('general-channel');
    };
  }, [currentUser]);
  return <div className="pt-[60px]">{children}</div>;
}
