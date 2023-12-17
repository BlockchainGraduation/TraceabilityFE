'use client';
import instanceAxios from '@/api/instanceAxios';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setLogin } from '@/reducers/userSlice';
import { message } from 'antd';
import { getCookie } from 'cookies-next';
import moment from 'moment';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Pusher from 'pusher-js';
import { ReactNode, useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
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

export default function LocaleLayout({ children }: { children: ReactNode }) {
  const currentUser = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const { mutate } = useSWRConfig();
  const cookie = getCookie('access');
  const route = useRouter();
  const locale = useLocale();
  moment.locale(locale);
  useEffect(() => {
    const channel = pusher.subscribe('general-channel');
    channel.bind(currentUser.user.email || '', (data: NotificationType) => {
      message.info('Bạn vừa có thông báo mới');
      mutate('notifiation-me');
      console.log(data);
    });

    return () => {
      pusher.unsubscribe('general-channel');
    };
  }, [currentUser, mutate]);
  const fethGetUser = async () => {
    await instanceAxios
      .get('user/me')
      .then((res) => {
        // console.log(re)
        dispatch(setLogin({ logged: true, user: { ...res.data.user } }));
      })
      .catch((err) => console.log(err));
  };
  useEffectOnce(() => {
    fethGetUser();
  });
  useSWR('user/me', fethGetUser);
  useEffect(() => {
    if (!cookie) {
      route.push('/');
    }
    setLoading(false);
  }, [cookie, route]);
  return <>{!loading && <div className="min-h-[600px]">{children}</div>}</>;
}
