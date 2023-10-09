'use client';

import { useDebounce } from '@uidotdev/usehooks';
import { SearchIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SearchBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const debouncedSearchTerm = useDebounce(search, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const searchFunc = async () => {
      if (debouncedSearchTerm) {
        router.push('/results' + '?search=' + debouncedSearchTerm);
      }
    };

    searchFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    <div className='flex items-center justify-center'>
      <div className='relative w-96'>
        <input
          id='input'
          type='text'
          name='input'
          placeholder='Colesel Fontana Vecia'
          value={search}
          className='relative w-full h-12 px-4 pl-12 placeholder-transparent transition-all border-b outline-none peer border-[var(--brand-light)] text-slate-50 shadow-md rounded-lg autofill:bg-[var(--brand-dark)] invalid:border-pink-500 invalid:text-pink-500 focus:border-[var(--brand-accent)] focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 bg-[var(--brand-light)]'
          onChange={handleChange}
        />
        <label
          htmlFor='input'
          className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-200 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-[var(--brand-light)] before:rounded-md before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-10 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:left-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-[var(--brand-accent)] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
        >
          Sök på dryck
        </label>
        <SearchIcon className='absolute w-6 h-6 top-3 left-4 stroke-[var(--brand-accent)] peer-disabled:cursor-not-allowed' />
      </div>
    </div>
  );
};

export default SearchBar;
