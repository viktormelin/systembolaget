'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Pagination = ({ page }: { page: number }) => {
  const pathname = usePathname();

  return (
    <nav role='navigation' aria-label='Pagination Navigation'>
      <ul className='flex items-center justify-center text-sm mb-6 list-none md:gap-1 text-slate-700'>
        <li>
          <Link
            href={pathname + '?page=' + (Number(page) - 1 > 1 ? String(Number(page) - 1) : '1')}
            aria-label='Goto Page 1'
            className='inline-flex items-center justify-center h-10 gap-4 px-4 text-sm font-medium transition duration-300 rounded focus-visible:outline-none stroke-slate-700 text-slate-700 hover:bg-blue-50 hover:text-blue-500 hover:stroke-blue-500 focus:bg-blue-50 focus:text-blue-600 focus:stroke-blue-600'
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
              <title id='title-09'>Previous page</title>
              <desc id='desc-09'>link to previous page</desc>
              <path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7' />
            </svg>
          </Link>
        </li>

        <li>
          <Link
            href={pathname + '?page=' + String(Number(page) + 1)}
            aria-label='Goto Page 3'
            className='inline-flex items-center justify-center h-10 gap-4 px-4 text-sm font-medium transition duration-300 rounded focus-visible:outline-none stroke-slate-700 text-slate-700 hover:bg-blue-50 hover:text-blue-500 hover:stroke-blue-500 focus:bg-blue-50 focus:text-blue-600 focus:stroke-blue-600'
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
              <title id='title-10'>Next page</title>
              <desc id='desc-10'>link to next page</desc>
              <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
            </svg>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
