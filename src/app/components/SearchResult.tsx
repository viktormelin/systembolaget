import { imageUrl } from '@/lib/images';
import { Product } from '@/types/Product';
import Image from 'next/image';

interface Props {
  products: Product[];
}

const SearchResult = ({ products }: Props) => {
  return (
    <section>
      <div className='container px-6 m-auto'>
        <div className='grid grid-cols-3 gap-6 md:grid-cols-6 lg:grid-cols-9'>
          {products.map((product) => (
            <div
              key={product.productId}
              className='col-span-4 lg:col-span-3 border border-slate-200 rounded-md p-2 flex gap-2 cursor-pointer hover:bg-blue-200'
            >
              <div className='flex h-[104px] w-[53px] shrink-0'>
                <Image
                  className='object-contain'
                  src={imageUrl(product.images)}
                  alt={`Produktbild för ${product.productNameBold}`}
                  width={53}
                  height={104}
                />
              </div>
              <div className='h-full flex flex-col'>
                <p className='font-bold underline'>{product.productNameBold}</p>
                <p>{product.productNameThin}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchResult;
