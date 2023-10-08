export type Category = 'categoryLevel1' | 'categoryLevel2';

export interface FilterProp {
  name: string;
  category: Category;
}

export const Filters: FilterProp[] = [
  {
    name: 'Rött vin',
    category: 'categoryLevel2',
  },
  {
    name: 'Vitt vin',
    category: 'categoryLevel2',
  },
  {
    name: 'Mousserande vin',
    category: 'categoryLevel2',
  },
  {
    name: 'Öl',
    category: 'categoryLevel1',
  },
  {
    name: 'Sprit',
    category: 'categoryLevel1',
  },
  {
    name: 'Cider & blanddrycker',
    category: 'categoryLevel1',
  },
];
