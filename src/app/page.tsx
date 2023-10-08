import SearchResult from './components/SearchResult';
import SearchBar from './components/SearchBar';
import { Product } from '@/types/Product';
import { promises, readFile, readFileSync } from 'fs';

// fetch('http://localhost:3000/api/products', { method: 'GET' });

const Home = async (searchParams: { searchParams: { query: string } }) => {
  const query = searchParams.searchParams['query'];
  const file = await promises.readFile('data/products.json', 'utf8');
  const file2 = await promises.readFile('data/countries.json', 'utf8');
  const products: Product[] = JSON.parse(file);
  const { countries } = JSON.parse(file2);

  const filteredProducts = products.filter((p) => {
    return (
      p.productNameBold?.toLowerCase().includes(query?.toLowerCase()) ||
      p.productNameThin?.toLowerCase().includes(query?.toLowerCase())
    );
  });

  return (
    <>
      <SearchBar />
      {filteredProducts && filteredProducts.length > 0 ? (
        <SearchResult products={filteredProducts} countries={countries} />
      ) : null}
    </>
  );
};

export default Home;
