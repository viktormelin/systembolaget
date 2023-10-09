import { Product } from '@/types/Product';
import { promises } from 'fs';
import SearchResult from '../components/SearchResult';
import { removeSpecialCharacters } from '@/lib/chars';

const Page = async (searchParams: { searchParams: { ord: string } }) => {
  const query = removeSpecialCharacters(searchParams.searchParams['ord'].toLowerCase()) ?? '';
  const file = await promises.readFile('data/products.json', 'utf8');
  const file2 = await promises.readFile('data/countries.json', 'utf8');
  const products: Product[] = JSON.parse(file);
  const { countries } = JSON.parse(file2);

  const filteredProducts = products.filter((p) => {
    const prodName1 = removeSpecialCharacters(p.productNameBold)?.toLowerCase();
    const prodName2 = removeSpecialCharacters(p.productNameThin)?.toLowerCase();
    return prodName1?.includes(query) || prodName2?.includes(query);
  });

  return (
    <>
      {filteredProducts && filteredProducts.length > 0 ? (
        <SearchResult products={filteredProducts} countries={countries} />
      ) : null}
    </>
  );
};

export default Page;
