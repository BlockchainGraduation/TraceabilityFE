'use client';
import './globals.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
type Props = {
  children: React.ReactNode;
};

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

library.add(fas);
// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  useEffect(() => {
    AOS.init();
  });
  return children;
}
