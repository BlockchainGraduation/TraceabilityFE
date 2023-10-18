import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Providers } from '@/providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// export function generateStaticParams() {
//   return [{ locale: 'en' }, { locale: 'vi' }];
// }
import { Roboto } from 'next/font/google';
import { getCookie } from 'cookies-next';
import instanceAxios from '@/api/instanceAxios';
import { SWRConfig } from 'swr';
import { ConfigProvider } from 'antd';

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
      <body>
        <ConfigProvider locale={locale}>
          <Providers>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <Header />
              <div>{children}</div>
              <Footer />
            </NextIntlClientProvider>
          </Providers>
        </ConfigProvider>
      </body>
    </html>
  );
}
