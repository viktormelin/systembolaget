'use client';

import { ApkProduct } from '@/types/Product';
import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { imageUrl } from '@/lib/images';

const Page = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const page = searchParams.get('page') ?? 1;
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<ApkProduct[]>([]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return String(params);
    },
    [searchParams]
  );

  useEffect(() => {
    const fetchPageProducts = async () => {
      const response = await fetch(`/api/products/apk?page=${page}&size=10`);
      const data = await response.json();

      console.log(data.products);

      setProducts(data.products);
      setIsLoading(false);
    };

    fetchPageProducts();
  }, [page]);

  return (
    <div className='flex-1 h-full flex flex-col'>
      <div className='flex-1 flex items-center justify-center gap-2'>
        {isLoading ? (
          <svg
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            aria-live='polite'
            aria-busy='true'
            aria-labelledby='title-08a desc-08a'
            className='w-16 h-16'
          >
            <title id='title-08a'>Icon title</title>
            <desc id='desc-08a'>Some desc</desc>
            <path d='M7 8H3V16H7V8Z' className='fill-emerald-500 animate animate-bounce ' />
            <path d='M14 8H10V16H14V8Z' className='fill-emerald-500 animate animate-bounce  [animation-delay:.2s]' />
            <path d='M21 8H17V16H21V8Z' className='fill-emerald-500 animate animate-bounce  [animation-delay:.4s]' />
          </svg>
        ) : (
          <ul className='divide-y divide-slate-100'>
            {products.map((product) => (
              <li
                key={product.productId}
                className='flex items-center gap-4 px-4 py-3 rounded-md cursor-pointer hover:bg-blue-200'
              >
                <div className='flex items-center self-center shrink-0'>
                  <Image
                    className='object-contain'
                    src={imageUrl(product.images)}
                    alt={`Produktbild för ${product.productNameBold}`}
                    width={40}
                    height={75}
                  />
                </div>
                <div className='flex flex-col gap-0 min-h-[2rem] items-start justify-center w-full min-w-0'>
                  <h4 className='text-base text-slate-700 '>
                    <span className='font-semibold'>{product.productNameBold}</span> - {product.productNameThin}
                  </h4>
                  <p className='w-full text-sm truncate text-slate-500'>
                    Pris: {product.price}kr | {Math.round((product.apk + Number.EPSILON) * 100) / 100}{' '}
                    <span className='italic'>ml/krona</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <nav role='navigation' aria-label='Pagination Navigation'>
        <ul className='flex items-center justify-center text-sm mb-6 list-none md:gap-1 text-slate-700'>
          <li>
            <a
              href={pathname + '?' + createQueryString('page', Number(page) - 1 > 1 ? String(Number(page) - 1) : '1')}
              aria-label='Goto Page 1'
              className='inline-flex items-center justify-center h-10 gap-4 px-4 text-sm font-medium transition duration-300 rounded focus-visible:outline-none stroke-slate-700 text-slate-700 hover:bg-emerald-50 hover:text-emerald-500 hover:stroke-emerald-500 focus:bg-emerald-50 focus:text-emerald-600 focus:stroke-emerald-600'
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
            </a>
          </li>

          <li>
            <a
              href={pathname + '?' + createQueryString('page', String(Number(page) + 1))}
              aria-label='Goto Page 3'
              className='inline-flex items-center justify-center h-10 gap-4 px-4 text-sm font-medium transition duration-300 rounded focus-visible:outline-none stroke-slate-700 text-slate-700 hover:bg-emerald-50 hover:text-emerald-500 hover:stroke-emerald-500 focus:bg-emerald-50 focus:text-emerald-600 focus:stroke-emerald-600'
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
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Page;
