import SearchResult from './components/SearchResult';
import SearchBar from './components/SearchBar';
import { Product } from '@/types/Product';
import { readFileSync } from 'fs';

// fetch('http://localhost:3000/api/products', { method: 'GET' });

const Home = async (searchParams: { searchParams: { query: string } }) => {
  const query = searchParams.searchParams['query'];
  const products: Product[] = JSON.parse(readFileSync('data/products.json', 'utf8'));
  const filteredProducts = products.filter((p) => p.productNameBold.toLowerCase().includes(query));

  return (
    <>
      <SearchBar />
      {filteredProducts && filteredProducts.length > 0 ? <SearchResult products={filteredProducts} /> : null}
    </>
  );
};

export default Home;
