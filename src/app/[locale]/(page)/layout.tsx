import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Providers } from '@/providers';
import Header from '@/components/Header';
import { ReactNode } from 'react';
// export function generateStaticParams() {
//   return [{ locale: 'en' }, { locale: 'vi' }];
// }

export const metadata: Metadata = {
  title: 'Traceability',
  description: 'Traceability',
};

export default function LocaleLayout(
    { children }: { children: ReactNode }
) {

  return (
    <div className='pt-[100px]'>{children}</div>
  );
}
