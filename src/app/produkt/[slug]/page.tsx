import { getApk } from '@/app/api/products/apk/route';
import { abril } from '@/app/layout';
import { imageUrl } from '@/lib/images';
import { cn } from '@/lib/utils';
import { Product } from '@/types/Product';
import { promises } from 'fs';
import { CircleDotIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Page = async ({ params }: { params: { slug: string } }) => {
  const productNumber = params.slug.split('-')[0];
  const file = await promises.readFile('data/products.json', 'utf8');
  const products: Product[] = JSON.parse(file);
  const product = products.find((p) => p.productNumber === productNumber);

  return (
    <>
      {product ? (
        <div className='flex items-center gap-20'>
          <div className='flex h-[450px]'>
            <Image
              className='object-contain'
              src={imageUrl(product.images)}
              alt={`Produktbild för ${product.productNameBold}`}
              width={225}
              height={450}
            />
          </div>
          <div className='w-[40rem]'>
            <h1 className={cn(abril.className, 'text-3xl mb-2')}>
              {product.productNameBold} {product.productNameThin} - {product.vintage}
            </h1>
            <div className='text-sm flex flex-col gap-1'>
              <p>{product.taste}</p>
              <p>{product.usage}</p>
            </div>
            <div className='mt-4 grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12'>
              <div className='col-span-6 text-sm'>
                <h2 className='font-bold'>Region</h2>
                <p>
                  <Link
                    href={'/resultat' + '?land=' + product.country}
                    className='w-fit hover:underline cursor-pointer'
                  >
                    {product.country}
                  </Link>
                  ,{' '}
                  <Link
                    href={'/resultat' + '?region=' + product.originLevel1}
                    className='w-fit hover:underline cursor-pointer'
                  >
                    {product.originLevel1}
                  </Link>
                </p>
              </div>
              <div className='col-span-6 text-sm'>
                <h2 className='font-bold'>Vintyp</h2>
                <p>
                  <Link
                    href={'/resultat' + '?typ1=' + product.categoryLevel1}
                    className='w-fit hover:underline cursor-pointer'
                  >
                    {product.categoryLevel1}
                  </Link>
                  ,{' '}
                  <Link
                    href={'/resultat' + '?typ2=' + product.categoryLevel2}
                    className='w-fit hover:underline cursor-pointer'
                  >
                    {product.categoryLevel2}
                  </Link>
                </p>
              </div>
              <div className='col-span-6 text-sm'>
                <h2 className='font-bold'>Druvor</h2>
                <p className='flex flex-col'>
                  {product.grapes.map((grape) => (
                    <Link
                      key={grape}
                      href={'/resultat' + '?druva=' + grape}
                      className='w-fit hover:underline cursor-pointer'
                    >
                      {grape}
                    </Link>
                  ))}
                </p>
              </div>
              <div className='col-span-6 text-sm'>
                <h2 className='font-bold'>Information</h2>
                <p>Volym: {product.volumeText}</p>
                <p>Alkohol: {product.alcoholPercentage}%</p>
                <p>APK: {Math.round((getApk(product) + Number.EPSILON) * 100) / 100}</p>

                <p>Pris: {product.price}:-</p>
              </div>
            </div>
            <div className='mt-10 flex items-center'>
              <p className='w-32 text-sm uppercase'>Passar till:</p>
              <div className='w-full flex items-center gap-3 text-sm'>
                {product.tasteSymbols.map((taste) => (
                  <Link
                    href={'/resultat' + '?passar_till=' + taste}
                    className='w-fit hover:underline cursor-pointer'
                    key={taste}
                  >
                    {taste}
                  </Link>
                ))}
              </div>
            </div>
            <div className='flex flex-col gap-3 mt-10'>
              <div className='flex items-center'>
                <p className='w-32 text-sm uppercase'>Fyllighet:</p>
                <div className='relative w-full h-[1px] bg-[var(--brand-accent)] before:h-[12px] before:w-[1px] before:absolute before:left-0 before:-top-[5px] before:bg-[var(--brand-accent)] after:h-[12px] after:-top-[5px] after:w-[1px] after:bg-[var(--brand-accent)] after:absolute after:right-0'>
                  <span
                    style={{ left: `calc(${product.tasteClockBody * 10}% - 24px)` }}
                    className={`bg-[var(--brand-dark)] w-[24px] h-[24px] -mt-[11px] rounded-full absolute flex items-center justify-center`}
                  >
                    {/* <span className='bg-blue-500 w-[12px] h-[12px] rounded-full flex'></span> */}
                    <CircleDotIcon className='text-[var(--brand-accent)] w-[20px] h-[20px]' />
                  </span>
                </div>
              </div>
              <div className='flex items-center'>
                <p className='w-32 text-sm uppercase'>Fruktsyra:</p>
                <div className='relative w-full h-[1px] bg-[var(--brand-accent)] before:h-[12px] before:w-[1px] before:absolute before:left-0 before:-top-[5px] before:bg-[var(--brand-accent)] after:h-[12px] after:-top-[5px] after:w-[1px] after:bg-[var(--brand-accent)] after:absolute after:right-0'>
                  <span
                    style={{ left: `calc(${product.tasteClockFruitacid * 10}% - 24px)` }}
                    className={`bg-[var(--brand-dark)] w-[24px] h-[24px] -mt-[11px] rounded-full absolute flex items-center justify-center`}
                  >
                    {/* <span className='bg-blue-500 w-[12px] h-[12px] rounded-full flex'></span> */}
                    <CircleDotIcon className='text-[var(--brand-accent)] w-[20px] h-[20px]' />
                  </span>
                </div>
              </div>
              <div className='flex items-center'>
                <p className='w-32 text-sm uppercase'>Strävhet:</p>
                <div className='relative w-full h-[1px] bg-[var(--brand-accent)] before:h-[12px] before:w-[1px] before:absolute before:left-0 before:-top-[5px] before:bg-[var(--brand-accent)] after:h-[12px] after:-top-[5px] after:w-[1px] after:bg-[var(--brand-accent)] after:absolute after:right-0'>
                  <span
                    style={{ left: `calc(${product.tasteClockRoughness * 10}% - 24px)` }}
                    className={`bg-[var(--brand-dark)] w-[24px] h-[24px] -mt-[11px] rounded-full absolute flex items-center justify-center`}
                  >
                    {/* <span className='bg-blue-500 w-[12px] h-[12px] rounded-full flex'></span> */}
                    <CircleDotIcon className='text-[var(--brand-accent)] w-[20px] h-[20px]' />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Page;
