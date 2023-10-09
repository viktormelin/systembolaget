'use client';

import { cn, paramsToObject } from '@/lib/utils';
import { FilterProp, Filters } from '@/types/Filter';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Filter = () => {
  const pathname = usePathname();
  const params = useSearchParams();
  const entries = params.entries();
  const compiledParams = paramsToObject(entries);
  const router = useRouter();

  const page = params.get('page');
  const filter = params.get('filter');

  const generatePath = (target: string) => {
    const currentUrl = pathname;
    const newParams = new URLSearchParams();
    for (const [key, value] of Object.entries(compiledParams)) {
      if (key !== 'filter') {
        newParams.append(key, String(value));
      }
    }

    newParams.append('filter', target);
    return currentUrl + '?' + newParams;
  };

  const handleClick = (item: FilterProp) => {
    if (item.name === filter) {
      router.push(generatePath(''));
    } else {
      router.push(generatePath(item.name));
    }
  };

  return (
    <ul className='w-full flex items-center justify-center lg:gap-3 flex-wrap p-4'>
      {Filters.map((item) => (
        <li
          onClick={() => handleClick(item)}
          key={item.name}
          className={cn(
            'p-2 rounded-md hover:underline cursor-pointer',
            item.name === filter && 'bg-[var(--brand-light)]'
          )}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default Filter;
