import { Product } from '@/types/Product';
import Image from 'next/image';
import { imageUrl } from '@/lib/images';
import { readFileSync } from 'fs';
import { calculateApk, paginateProducts } from '../api/products/apk/route';
import Pagination from '../components/Pagination';
import { abril } from '../layout';
import Filter from '../components/Filter';

export const metadata = {
  title: 'APK',
};

const Page = async (searchParams: { searchParams: { sida: string; filter: string } }) => {
  const page = searchParams.searchParams['sida'] ?? 1;
  const filter = searchParams.searchParams['filter'] ?? 'allt';
  const size = 10;

  const products: Product[] = JSON.parse(readFileSync('data/products.json', 'utf8'));
  const apkProducts = await calculateApk(products, filter);
  const paginatedProducts = await paginateProducts(apkProducts, Number(size), Number(page));

  return (
    <div className='container px-6 m-auto'>
      <Filter />
      <div className='mt-16 grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12'>
        {paginatedProducts.map((product) => (
          <div
            key={product.productId}
            className='mb-12 h-72 col-span-4 lg:col-span-3 bg-[var(--brand-light)] rounded-xl px-4 pb-4 flex flex-col items-center justify-between cursor-pointer hover:shadow-lg'
          >
            <div className='flex justify-center h-[250px] w-full shrink-0 -mt-12'>
              <Image
                className='object-contain'
                src={imageUrl(product.images)}
                alt={`Produktbild för ${product.productNameBold}`}
                width={125}
                height={250}
              />
            </div>
            <div className='flex flex-col items-center justify-center'>
              <h2 className={abril.className}>
                {product.productNameBold} {product.productNameThin}
              </h2>
              <div className='flex gap-5'>
                <p className='text-xs'>{product.price}:-</p>
                <p className='text-xs'>{Math.round((product.apk + Number.EPSILON) * 100) / 100} APK</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination sida={Number(page)} />
    </div>
  );
};

export default Page;
