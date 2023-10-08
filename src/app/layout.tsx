import './globals.css';
import type { Metadata } from 'next';
import { Abril_Fatface, Poppins } from 'next/font/google';
import Navbar from './components/Navbar';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const abril = Abril_Fatface({ subsets: ['latin'], weight: '400' });

export const metadata = {
  title: {
    default: 'Bolaget',
    template: '%s | Bolaget',
  },
  description: 'Bolaget, en sida med den viktigaste statistiken för dryck',
  keywords: ['Systembolaget', 'Bolaget', 'APK', 'Alkohol per krona'],
  authors: [
    {
      name: 'Viktor Melin',
      url: 'https://viktormelin.com',
    },
  ],
  creator: 'Viktor Melin',
  // themeColor: [
  //   { media: '(prefers-color-scheme: light)', color: 'white' },
  //   { media: '(prefers-color-scheme: dark)', color: 'black' },
  // ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bolaget.viktormelin.com',
    title: 'Bolaget',
    description: 'Bolaget, en sida med den viktigaste statistiken för dryck',
    siteName: 'Bolaget',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bolaget',
    description: 'Bolaget, en sida med den viktigaste statistiken för dryck',
    images: ['https://imagedelivery.net/3ecvmLCFkS-FijMWb0qFvQ/1051182d-c69e-4b50-bd3a-34d24ab8f800/public'],
    creator: '@viktormelin',
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  // manifest: 'https://panel.dixxel.io/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <Navbar />
        <main className='flex-1 flex flex-col relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]'>
          {children}
        </main>
      </body>
    </html>
  );
}
