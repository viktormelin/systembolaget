import prisma from '@/lib/prisma';
import { Prisma, Product } from '@prisma/client';
import { readFile, writeFile } from 'fs';
import { NextRequest, NextResponse } from 'next/server';

// const mapAPIProductToProduct = (product: any): Any => {
//   return {
//     productId: product.productId,
//     productNumber: product.productNumber,
//     productNameBold: product.productNameBold,
//     productNameThin: product.productNameThin,
//     category: product.category,
//     productNumberShort: product.productNumberShort,
//     producerName: product.producerName,
//     suppliername: product.suppliername,
//     isKosher: product.isKosher,
//     bottleTextShort: product.bottleTextShort,
//     isOrganic: product.isOrganic,
//     isEthical: product.isEthical,
//     isCompletelyOutOfStock: product.isCompletelyOutOfStock,
//     isTemporaryOutOfStock: product.isTemporaryOutOfStock,
//     alcoholPercentage: product.alcoholPercentage,
//     volume: product.volume,
//     price: product.price,
//     country: product.country,
//     originLevel1: product.originLevel1,
//     originLevel2: product.originLevel2,
//     categoryLevel1: product.categoryLevel1,
//     categoryLevel2: product.categoryLevel2,
//     categoryLevel3: product.categoryLevel3,
//     categoryLevel4: product.categoryLevel4,
//     customCategoryTitle: product.customCategoryTitle,
//     assortmentText: product.assortmentText,
//     usage: product.usage,
//     taste: product.taste,
//     images: product.images.map((x: any) => `${x.imageUrl}.png`),
//     latestUpdated: new Date().toISOString()
//   }
// }

// {
//   productId: '24653956',
//   productNumber: '5404002',
//   productNameBold: "Ca'Rugate",
//   productNameThin: 'Rio Albo Valpolicella',
//   category: null,
//   productNumberShort: '54040',
//   producerName: "Ca'Rugate",
//   supplierName: 'Solera Sweden AB',
//   isKosher: false,
//   bottleText: 'Flaska',
//   restrictedParcelQuantity: 0,
//   isOrganic: true,
//   isSustainableChoice: false,
//   isClimateSmartPackaging: false,
//   isEthical: false,
//   ethicalLabel: null,
//   isWebLaunch: false,
//   productLaunchDate: '2021-12-06T00:00:00',
//   sellStartTime: '10:00:00',
//   isCompletelyOutOfStock: false,
//   isTemporaryOutOfStock: false,
//   alcoholPercentage: 12.5,
//   volumeText: '375 ml',
//   volume: 375,
//   price: 95,
//   country: 'Italien',
//   originLevel1: 'Venetien',
//   originLevel2: 'Valpolicella',
//   categoryLevel1: 'Vin',
//   categoryLevel2: 'Rött vin',
//   categoryLevel3: null,
//   categoryLevel4: null,
//   customCategoryTitle: 'Rött vin',
//   assortmentText: 'Ordervaror',
//   usage: null,
//   taste: null,
//   tasteSymbols: [],
//   tasteClockGroupBitter: null,
//   tasteClockGroupSmokiness: null,
//   tasteClockBitter: 0,
//   tasteClockFruitacid: 0,
//   tasteClockBody: 0,
//   tasteClockRoughness: 0,
//   tasteClockSweetness: 0,
//   tasteClockSmokiness: 0,
//   tasteClockCasque: 0,
//   assortment: 'BS',
//   recycleFee: 0,
//   isManufacturingCountry: false,
//   isRegionalRestricted: false,
//   packagingLevel1: 'Flaska',
//   isNews: false,
//   images: [],
//   isDiscontinued: false,
//   isSupplierTemporaryNotAvailable: false,
//   sugarContent: 0,
//   sugarContentGramPer100ml: 0,
//   seal: [],
//   vintage: '2020',
//   grapes: [],
//   otherSelections: null,
//   tasteClocks: [],
//   color: null,
//   dishPoints: null
// }

const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:111.0) Gecko/20100101 Firefox/111.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 13.3; rv:111.0) Gecko/20100101 Firefox/111.0',
  'Mozilla/5.0 (X11; Linux x86_64; rv:111.0) Gecko/20100101 Firefox/111.0',
  'Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:111.0) Gecko/20100101 Firefox/111.0',
  'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:111.0) Gecko/20100101 Firefox/111.0',
  'Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:111.0) Gecko/20100101 Firefox/111.0',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 13.3; rv:102.0) Gecko/20100101 Firefox/102.0',
  'Mozilla/5.0 (X11; Linux i686; rv:102.0) Gecko/20100101 Firefox/102.0',
  'Mozilla/5.0 (Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0',
  'Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:102.0) Gecko/20100101 Firefox/102.0',
  'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0',
  'Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_3_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_3_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15',
];

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const mapApiProductToDbProduct = (product: any) => {
  return {
    productId: product.productId,
    productNumber: product.productNumber,
    productNameBold: product.productNameBold,
    productNameThin: product.productNameThin,
    category: product.category,
    productNumberShort: product.productNumberShort,
    producerName: product.producerName,
    supplierName: product.supplierName,
    isKosher: product.isKosher,
    bottleText: product.bottleText,
    restrictedParcelQuantity: product.restrictedParcelQuantity,
    isOrganic: product.isOrganic,
    isSustainableChoice: product.isSustainableChoice,
    isClimateSmartPackaging: product.isClimateSmartPackaging,
    isEthical: product.isEthical,
    ethicalLabel: product.ethicalLabel,
    isWebLaunch: product.isWebLaunch,
    productLaunchDate: product.productLaunchDate,
    sellStartTime: product.sellStartTime,
    isCompletelyOutOfStock: product.isCompletelyOutOfStock,
    isTemporaryOutOfStock: product.isTemporaryOutOfStock,
    alcoholPercentage: product.alcoholPercentage,
    volumeText: product.volumeText,
    volume: product.volume,
    price: product.price,
    country: product.country,
    originLevel1: product.originLevel1,
    originLevel2: product.originLevel2,
    categoryLevel1: product.categoryLevel1,
    categoryLevel2: product.categoryLevel2,
    categoryLevel3: product.categoryLevel3,
    categoryLevel4: product.categoryLevel4,
    customCategoryTitle: product.customCategoryTitle,
    assortmentText: product.assortmentText,
    usage: product.usage,
    taste: product.taste,
    tasteSymbols: product.tasteSymbols,
    tasteClockGroupBitter: product.tasteClockGroupBitter,
    tasteClockGroupSmokiness: product.tasteClockGroupSmokiness,
    tasteClockBitter: product.tasteClockBitter,
    tasteClockFruitacid: product.tasteClockFruitacid,
    tasteClockBody: product.tasteClockBody,
    tasteClockRoughness: product.tasteClockRoughness,
    tasteClockSweetness: product.tasteClockSweetness,
    tasteClockSmokiness: product.tasteClockSmokiness,
    tasteClockCasque: product.tasteClockCasque,
    assortment: product.assortment,
    recycleFee: product.recycleFee,
    isManufacturingCountry: product.isManufacturingCountry,
    isRegionalRestricted: product.isRegionalRestricted,
    packagingLevel1: product.packagingLevel1,
    isNews: product.isNews,
    images: product.images.map((x: any) => `${x.imageUrl}.png`),
    isDiscontinued: product.isDiscontinued,
    isSupplierTemporaryNotAvailable: product.isSupplierTemporaryNotAvailable,
    sugarContent: product.sugarContent,
    sugarContentGramPer100ml: product.sugarContentGramPer100ml,
    seal: product.seal,
    vintage: product.vintage,
    grapes: product.grapes,
    otherSelections: product.otherSelections,
    color: product.color,
    dishPoints: product.dishPoints,
  };
};

interface FetchProps {
  page: number | string;
}
// const fetchProducts = async ({ page }: FetchProps) => {
//   const params = new URLSearchParams({
//     page: page.toString(),
//     size: '30',
//     sortBy: 'Score',
//     sortDirection: 'Ascending',
//     status: 'Active',
//   });

//   const random = userAgents[Math.floor(Math.random() * userAgents.length)];
//   const headers = new Headers();
//   headers.append('User-Agent', random);
//   headers.append('Accept', '*/*');
//   headers.append('Accept-Language', 'en-US,en;q=0.5');
//   headers.append('Accept-Encoding', 'gzip, deflate');
//   headers.append('Access-Control-Allow-Origin', '*');
//   headers.append('Connection', 'keep-alive');
//   headers.append('Content-Type', 'application/json');
//   headers.append('DNT', '1');
//   headers.append('Ocp-Apim-Subscription-Key', 'cfc702aed3094c86b92d6d4ff7a54c84');
//   headers.append('Origin', 'https://www.systembolaget.se');
//   headers.append('Referer', 'https://www.systembolaget.se/');
//   headers.append('Sec-Fetch-Dest', 'empty');
//   headers.append('Sec-Fetch-Mode', 'cors');
//   headers.append('Sec-Fetch-Site', 'same-origin');
//   headers.append('Sec-Fetch-User', '?1');
//   headers.append('Cache-Control', 'max-age=0');

//   const response = await fetch(
//     'https://api-systembolaget.azure-api.net/sb-api-ecommerce/v1/productsearch/search?' + params,
//     { headers, cache: 'no-cache' }
//   );

//   return response.json();
// };

// const addNewProduct = async (product: Product) => {
//   return await prisma.product.upsert({
//     where: { productNumber: product.productNumber, productId: product.productId },
//     update: {},
//     create: mapApiProductToDbProduct(product),
//   });
// };

export const GET = async (request: NextRequest, response: NextResponse) => {
  let count = 0;
  let isTrue = true;
  let page = 0;

  // DIED @ 268
  // START @ 269

  while (isTrue) {
    page += 1;
    console.log(`Fetching page: ${page}`);

    try {
      const pageProducts: Product[] = [];
      const values = await Promise.all([delay(250), fetchProducts({ page })]);
      if (values[1].products) {
        const products: Product[] = values[1].products;
        for (const product of products) {
          count += 1;
          console.log(`Compiling product ${product.id} - Count: ${count}`);

          // const values = await Promise.all([delay(100), addNewProduct(product)]);
          pageProducts.push(product);
          // const value = await addNewProduct(product);
          // console.log(`Added new product: ${product.productNameBold} - ${product.productNameThin} (${value.id})`);

          // readFile('../../products.json', 'utf-8', (error, data) => {
          //   const json: any[] = JSON.parse(data);
          //   json.push(product);
          //   writeFile('../../products.json', JSON.stringify(json), (error) => console.error(error));
          // });
        }

        if (pageProducts.length > 0) {
          console.log(`Trying to add ${pageProducts.length} to database`);
          const result = await prisma.product.createMany({
            data: {
              ...pageProducts,
            },
            skipDuplicates: true,
          });

          console.log(`Successfully added ${result.count} products to database`);
        }
      } else {
        isTrue = false;
      }
    } catch (error) {
      console.error(error);
      isTrue = false;
    }
  }
};
