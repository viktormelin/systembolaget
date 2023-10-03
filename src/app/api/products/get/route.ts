import { Product } from '@/types/Product';
import { readFileSync } from 'fs';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest, response: NextResponse) => {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query')?.toLowerCase();

  let products: Product[] = JSON.parse(readFileSync('data/products.json', 'utf8'));

  if (products.length <= 0) {
    console.error('Products.json not found');
    return new Response(null, { status: 500 });
  }

  if (!query || query === '') {
    return NextResponse.json({ products }, { status: 200 });
  } else {
    // const filteredProducts = products.filter(
    //   (p) =>
    //     p.productId.toLowerCase().includes(query) ||
    //     p.productNumber.toLowerCase().includes(query) ||
    //     p.productNameBold.toLowerCase().includes(query) ||
    //     p.productNameThin.toLowerCase().includes(query) ||
    //     p.producerName.toLowerCase().includes(query)
    // );

    const filteredProducts = products.filter((p) => p.productNameBold.toLowerCase().includes(query));

    console.log(filteredProducts.length);

    return NextResponse.json({ products: filteredProducts }, { status: 200 });
  }
};
