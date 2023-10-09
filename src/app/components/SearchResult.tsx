import { imageUrl } from '@/lib/images';
import { Product } from '@/types/Product';
import Image from 'next/image';
import ReactCountryFlag from 'react-country-flag';
import { abril } from '../layout';
import Link from 'next/link';

interface Props {
  products: Product[];
  countries: any;
}

const SearchResult = ({ products, countries }: Props) => {
  return (
    <section>
      <div className='container px-6 m-auto'>
        <div className='mt-16 grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12'>
          {products.map((product) => (
            <Link
              href={`/produkt/${product.productNumber}-${product.productNameBold}`}
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
                <p className='text-xs'>{product.price}:-</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchResult;

// return Object.keys(object).find(key => object[key] === value);
