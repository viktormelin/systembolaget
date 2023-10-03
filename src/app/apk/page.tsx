import { Product } from '@/types/Product';
import Image from 'next/image';
import { imageUrl } from '@/lib/images';
import { readFileSync } from 'fs';
import { calculateApk, paginateProducts } from '../api/products/apk/route';
import Pagination from '../components/Pagination';

const Page = async (searchParams: { searchParams: { page: string } }) => {
  const page = searchParams.searchParams['page'] ?? 1;
  const size = 10;

  const products: Product[] = JSON.parse(readFileSync('data/products.json', 'utf8'));
  const apkProducts = await calculateApk(products);
  const paginatedProducts = await paginateProducts(apkProducts, Number(size), Number(page));

  return (
    <div className='flex-1 h-full flex flex-col'>
      <div className='flex-1 flex items-center justify-center gap-2'>
        <ul className='divide-y divide-slate-100'>
          {paginatedProducts.map((product) => (
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
      </div>
      <Pagination page={Number(page)} />
    </div>
  );
};

export default Page;
