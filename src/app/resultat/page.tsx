import { Product } from '@/types/Product';
import { promises } from 'fs';
import SearchResult from '../components/SearchResult';
import { removeSpecialCharacters } from '@/lib/chars';
import { paginateProducts } from '../api/products/apk/route';

interface SearchParams {
  sida: string;
  ord?: string;
  land?: string;
  region?: string;
  typ1?: string;
  typ2?: string;
  druva?: string;
  passar_till?: string;
}

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const page = searchParams.sida ?? 1;
  const size = 10;

  const ordParam = searchParams.ord;
  const ordSpec = ordParam ? removeSpecialCharacters(ordParam.toLowerCase()) : null;

  const file = await promises.readFile('data/products.json', 'utf8');
  // const file2 = await promises.readFile('data/countries.json', 'utf8');
  let products: Product[] = JSON.parse(file);

  // const { countries } = JSON.parse(file2);

  if (ordSpec) {
    products = products.filter((p) => {
      const prodName1 = removeSpecialCharacters(p.productNameBold)?.toLowerCase();
      const prodName2 = removeSpecialCharacters(p.productNameThin)?.toLowerCase();
      return prodName1?.includes(ordSpec) || prodName2?.includes(ordSpec);
    });
  }

  if (searchParams.land) products = products.filter((p) => p.country === searchParams.land!);
  if (searchParams.region) products = products.filter((p) => p.originLevel1 === searchParams.region!);
  if (searchParams.typ1) products = products.filter((p) => p.categoryLevel1 === searchParams.typ1!);
  if (searchParams.typ2) products = products.filter((p) => p.categoryLevel2 === searchParams.typ2!);
  if (searchParams.druva) products = products.filter((p) => p.grapes.includes(searchParams.druva!));
  if (searchParams.passar_till) products = products.filter((p) => p.tasteSymbols.includes(searchParams.passar_till!));

  const paginatedProducts = await paginateProducts(products, Number(size), Number(page));

  return (
    <>
      {paginatedProducts && paginatedProducts.length > 0 ? (
        <SearchResult products={paginatedProducts} page={page} />
      ) : null}
    </>
  );
};

export default Page;
