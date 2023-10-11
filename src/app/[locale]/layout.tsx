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
      <body>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            <div>{children}</div>
            <Footer />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
