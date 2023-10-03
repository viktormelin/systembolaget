'use client';

import { Product } from '@/types/Product';
import { useDebounce } from '@uidotdev/usehooks';
import { SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import SearchResult from './components/SearchResult';

// fetch('http://localhost:3000/api/products', { method: 'GET' });

export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(search, 300);

  const onClick = async () => {
    const response = await fetch('http://localhost:3000/api/products/get?id=1192501', { method: 'GET' });
    const data = await response.json();

    console.log(response, data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const searchFunc = async () => {
      let results = [];
      setIsSearching(true);
      if (debouncedSearchTerm) {
        const response = await fetch(`/api/products/get?query=${debouncedSearchTerm}`);
        const data = await response.json();
        results = data.products || [];

        for (const result of results) {
          console.log(result.images);
        }
      }

      setIsSearching(false);
      setResults(results);
    };

    searchFunc();
  }, [debouncedSearchTerm]);

  return (
    <>
      <div className='w-full h-96 flex items-center justify-center gap-6'>
        <div className='relative my-6 w-96'>
          <input
            id='input'
            type='text'
            name='input'
            placeholder='Colesel Fontana Vecia'
            value={search}
            className='relative w-full h-12 px-4 pl-12 placeholder-transparent transition-all border-b outline-none peer border-slate-300 text-slate-500 shadow-md rounded-md autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400'
            onChange={handleChange}
          />
          <label
            htmlFor='input'
            className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-10 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:left-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
          >
            Sök på dryck
          </label>
          <SearchIcon className='absolute w-6 h-6 top-3 left-4 stroke-slate-400 peer-disabled:cursor-not-allowed' />
          <small className='absolute flex justify-between w-full px-4 py-1 text-xs transition text-slate-400 peer-invalid:text-pink-500'>
            <span>Sök på namn, produkt eller id</span>
          </small>
        </div>
        <button
          disabled={search.length <= 0 || isSearching}
          className='inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white shadow-md transition duration-300 rounded-md focus-visible:outline-none whitespace-nowrap bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none'
        >
          <span>{isSearching ? 'Söker...' : 'Sök'}</span>
        </button>
      </div>
      {results.length > 0 ? <SearchResult products={results} /> : null}
    </>
  );
}
