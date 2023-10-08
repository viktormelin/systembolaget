import { Filters } from '@/types/Filter';
import { ApkProduct, Product } from '@/types/Product';
import { readFileSync } from 'fs';
import { NextRequest, NextResponse } from 'next/server';

export const calculateApk = async (products: Product[], filter?: string) => {
  let compiledProducts: ApkProduct[] = [];
  for (const product of products) {
    const volume = product.volume;
    const price = product.price;
    const alc = product.alcoholPercentage / 100;
    const alcVolume = volume * alc;
    const apk = alcVolume / price;

    const updatedProduct = { ...product, apk };
    compiledProducts.push(updatedProduct);
  }

  compiledProducts.sort((a, b) => b.apk - a.apk);

  if (filter) {
    if (filter === 'allt') return compiledProducts;

    const category = Filters.find((f) => f.name === filter)?.category;

    return compiledProducts.filter((p) => {
      if (category === 'categoryLevel1') return p.categoryLevel1 === filter;
      if (category === 'categoryLevel2') return p.categoryLevel2 === filter;
    });
  }

  return compiledProducts;
};

export const paginateProducts = async (
  products: ApkProduct[],
  pageSize: number,
  pageNumber: number
): Promise<ApkProduct[]> => {
  return products.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};

export const GET = async (request: NextRequest, response: NextResponse) => {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page');
  const size = searchParams.get('size');

  const products: Product[] = JSON.parse(readFileSync('data/products.json', 'utf8'));
  const apkProducts = await calculateApk(products);
  const paginatedProducts = paginateProducts(apkProducts, Number(size), Number(page));

  return NextResponse.json({ products: paginatedProducts }, { status: 200 });
};
