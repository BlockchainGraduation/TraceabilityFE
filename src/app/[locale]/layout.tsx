import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
// import Pusher from 'pusher-js';
import type { Metadata } from 'next';
import { Providers } from '@/providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import 'moment/locale/pt-br';
import { Roboto } from 'next/font/google';
import { App, ConfigProvider, Skeleton, Spin, message } from 'antd';
import theme from '@/theme/themeConfig';
import dynamic from 'next/dynamic';
import { StyleProviderX } from '@/components/RootStyleRegistry';
import { StyleProvider } from '@ant-design/cssinjs';
// import { Suspense } from 'react';

// const Header = dynamic(() => import('@/components/Header'), {
//   ssr: false,
//   loading: () => <Skeleton active />,
// });
// const Footer = dynamic(() => import('@/components/Footer'), {
//   ssr: false,
//   loading: () => <Skeleton active />,
// });
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
        <StyleProviderX>
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
                    itemSelectedBg: '#42bb67',
                    itemSelectedColor: '#ffffff',
                    // itemHoverBg: '#D7E4FDFF',
                  },
                  Button: {
                    colorPrimaryHover: '#ffffff',
                    colorPrimaryBgHover: '#42bb67',
                  },
                },
              }}
            >
              {/* <Providers> */}
              <NextIntlClientProvider locale={locale} messages={messages}>
                <div className="w-full  overflow-x-hidden">
                  {/* {children} */}
                  {children}
                </div>
              </NextIntlClientProvider>
              {/* </Providers> */}
            </ConfigProvider>
          </App>
        </StyleProviderX>
      </body>
    </html>
  );
}
