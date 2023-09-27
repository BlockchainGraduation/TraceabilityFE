import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Providers } from '@/providers';
import Header from '@/components/Header';
// export function generateStaticParams() {
//   return [{ locale: 'en' }, { locale: 'vi' }];
// }

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
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
              <div>{children}</div>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
