import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
// import Pusher from 'pusher-js';
import type { Metadata } from 'next';
import { Providers } from '@/providers';
// import Header from '@/components/Header';
import Footer from '@/components/Footer';
import 'moment/locale/pt-br';
import { Roboto } from 'next/font/google';
import { App, ConfigProvider, Skeleton, Spin, message } from 'antd';
import theme from '@/theme/themeConfig';
import dynamic from 'next/dynamic';
// import { Suspense } from 'react';

const Header = dynamic(() => import('@/components/Header'), {
  ssr: false,
  loading: () => <Skeleton active />,
});
// export function generateStaticParams() {
//   return [{ locale: 'en' }, { locale: 'vi' }];
// }
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

  return (
    <html lang={locale} suppressHydrationWarning className={''}>
      <head></head>
      <body>
        <App>
          <ConfigProvider
            locale={locale}
            theme={{
              ...theme,
              token: {
                colorBgLayout: '#d9eee1',
              },
              components: {
                Segmented: {
                  itemSelectedBg: '#48b89f',
                  itemSelectedColor: '#0b1d19',
                  // itemHoverBg: '#D7E4FDFF',
                },
                Button: {
                  colorPrimaryHover: '#ffffff',
                },
              },
            }}
          >
            {/* <Providers> */}
            <NextIntlClientProvider locale={locale} messages={messages}>
              <Header />
              {/* <Suspense fallback={<Skeleton active />}>{children}</Suspense> */}
              <div>{children}</div>
              <Footer />
            </NextIntlClientProvider>
            {/* </Providers> */}
          </ConfigProvider>
        </App>
      </body>
    </html>
  );
}
