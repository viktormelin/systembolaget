'use client';

import { paramsToObject } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const Pagination = ({ sida }: { sida: number }) => {
  const pathname = usePathname();
  const params = useSearchParams();
  const entries = params.entries();
  const compiledParams = paramsToObject(entries);

  const generatePath = (target: string) => {
    const currentUrl = pathname;
    const newParams = new URLSearchParams();
    for (const [key, value] of Object.entries(compiledParams)) {
      if (key !== 'sida') {
        newParams.append(key, String(value));
      }
    }

    newParams.append('sida', target);
    return currentUrl + '?' + newParams;
  };

  return (
    <nav role='navigation' aria-label='Pagination Navigation'>
      <ul className='flex items-center justify-center text-sm mb-6 list-none md:gap-1 '>
        <li>
          <Link
            href={generatePath(Number(sida) - 1 > 1 ? String(Number(sida) - 1) : '1')}
            aria-label='Goto sida 1'
            className='inline-flex items-center justify-center h-10 gap-4 px-4 text-sm font-medium transition duration-300 rounded focus-visible:outline-none   hover:bg-[var(--brand-light)] hover:text-[var(--brand-accent)] hover:stroke-[var(--brand-accent)] focus:bg-[var(--brand-light)] focus:text-[var(--brand-accent)] focus:stroke-[var(--brand-accent)]'
          >
            <span className='order-2'>Föregående</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-4 h-4 -mx-1'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='1.5'
              role='graphics-symbol'
              aria-labelledby='title-09 desc-09'
            >
              <title id='title-09'>Previous sida</title>
              <desc id='desc-09'>link to previous sida</desc>
              <path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7' />
            </svg>
          </Link>
        </li>

        <li>
          <Link
            href={generatePath(String(Number(sida) + 1))}
            aria-label='Goto sida 3'
            className='inline-flex items-center justify-center h-10 gap-4 px-4 text-sm font-medium transition duration-300 rounded focus-visible:outline-none   hover:bg-[var(--brand-light)] hover:text-[var(--brand-accent)] hover:stroke-[var(--brand-accent)] focus:bg-[var(--brand-light)] focus:text-[var(--brand-accent)] focus:stroke-[var(--brand-accent)]'
          >
            <span>Nästa</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-4 h-4 -mx-1'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='1.5'
              role='graphics-symbol'
              aria-labelledby='title-10 desc-10'
            >
              <title id='title-10'>Next sida</title>
              <desc id='desc-10'>link to next sida</desc>
              <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
            </svg>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
