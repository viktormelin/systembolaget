import './globals.css';
import { Abril_Fatface, Poppins } from 'next/font/google';
import Navbar from './components/Navbar';
import Link from 'next/link';

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

const fetchLatestDataCommit = async () => {
  const response = await fetch(
    'https://api.github.com/repos/viktormelin/systembolaget/commits?path=data/products.json'
  );
  const data = await response.json();
  if (data) {
    return data[0].commit.author.date;
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const latestDataCommit = new Date(await fetchLatestDataCommit());

  console.log(latestDataCommit);

  return (
    <html lang='en'>
      <body className={poppins.className}>
        <Navbar />
        <main className='flex-1 flex flex-col bg-[var(--brand-dark)] relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]'>
          {children}
        </main>
        <footer className='fixed bottom-0 w-full flex justify-center items-center gap-10 p-2'>
          <p className='text-xs text-gray-500'>
            Produktdata hämtad från{' '}
            <Link className='text-xs text-gray-500 hover:underline' href='https://systembolaget.se'>
              Systembolaget
            </Link>{' '}
            {latestDataCommit.toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' })}
          </p>
          <Link
            className='uppercase text-xs text-gray-500 hover:underline'
            href='https://github.com/viktormelin/systembolaget'
          >
            Github
          </Link>
          <Link className='uppercase text-xs text-gray-500 hover:underline' href='https://viktormelin.com'>
            Kontakt
          </Link>
        </footer>
      </body>
    </html>
  );
}
