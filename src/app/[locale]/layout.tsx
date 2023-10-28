import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
// import Pusher from 'pusher-js';
import type { Metadata } from 'next';
import { Providers } from '@/providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import 'moment/locale/pt-br';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'vi' }];
}
import { Roboto } from 'next/font/google';
import { ConfigProvider, Spin, message } from 'antd';
import theme from '@/theme/themeConfig';
import moment from 'moment';

const roboto = Roboto({
  weight: '500',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Traceability',
  description: 'Traceability',
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: any) {
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  moment.locale('fr');

  // const cookie = getCookie('access_token');
  // const fethGetUser = async () => {
  //   if (cookie)
  //     await instanceAxios
  //       .get('user/me', {
  //         headers: {
  //           Authorization: `Bearer ${cookie}`,
  //         },
  //       })
  //       .then((res) => {
  //         console.log(res.data.data);
  //         // dispatch(setLogin({ logged: true, user: res.data.data }));
  //       })
  //       .catch((err) => console.log(err));
  // };
  // fethGetUser();

  return (
    <html lang={locale} suppressHydrationWarning className={''}>
      <head></head>
      <body>
        <ConfigProvider
          locale={locale}
          theme={{
            ...theme,
            token: {
              colorBgLayout: '#F5F8FDFF',
            },
            components: {
              Segmented: {
                itemSelectedBg: '#C5D8FDFF',
                itemSelectedColor: '#2A57C9FF',
                // itemHoverBg: '#D7E4FDFF',
              },
            },
          }}
        >
          {/* <Providers> */}
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            <div>{children}</div>
            <Footer />
          </NextIntlClientProvider>
          {/* </Providers> */}
        </ConfigProvider>
      </body>
    </html>
  );
}
