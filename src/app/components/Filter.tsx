'use client';

import { cn } from '@/lib/utils';
import { FilterProp, Filters } from '@/types/Filter';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Filter = () => {
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();

  const page = params.get('page');
  const filter = params.get('filter');

  const handleClick = (item: FilterProp) => {
    if (item.name === filter) {
      router.push(pathname + '?page=' + page);
    } else {
      router.push(pathname + '?page=' + page + '&filter=' + item.name);
    }
  };

  return (
    <ul className='w-full flex items-center justify-center gap-3 p-4'>
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
