import prisma from '@/lib/prisma';
import { Product } from '@prisma/client';
import { writeFile } from 'fs';
import { NextRequest, NextResponse } from 'next/server';

// const mapApiProductToDbProduct = (product: any) => {
//   return {
//     productId: product.productId,
//     productNumber: product.productNumber,
//     productNameBold: product.productNameBold,
//     productNameThin: product.productNameThin,
//     category: product.category,
//     productNumberShort: product.productNumberShort,
//     producerName: product.producerName,
//     supplierName: product.supplierName,
//     isKosher: product.isKosher,
//     bottleText: product.bottleText,
//     restrictedParcelQuantity: product.restrictedParcelQuantity,
//     isOrganic: product.isOrganic,
//     isSustainableChoice: product.isSustainableChoice,
//     isClimateSmartPackaging: product.isClimateSmartPackaging,
//     isEthical: product.isEthical,
//     ethicalLabel: product.ethicalLabel,
//     isWebLaunch: product.isWebLaunch,
//     productLaunchDate: product.productLaunchDate,
//     sellStartTime: product.sellStartTime,
//     isCompletelyOutOfStock: product.isCompletelyOutOfStock,
//     isTemporaryOutOfStock: product.isTemporaryOutOfStock,
//     alcoholPercentage: product.alcoholPercentage,
//     volumeText: product.volumeText,
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
//     tasteSymbols: product.tasteSymbols,
//     tasteClockGroupBitter: product.tasteClockGroupBitter,
//     tasteClockGroupSmokiness: product.tasteClockGroupSmokiness,
//     tasteClockBitter: product.tasteClockBitter,
//     tasteClockFruitacid: product.tasteClockFruitacid,
//     tasteClockBody: product.tasteClockBody,
//     tasteClockRoughness: product.tasteClockRoughness,
//     tasteClockSweetness: product.tasteClockSweetness,
//     tasteClockSmokiness: product.tasteClockSmokiness,
//     tasteClockCasque: product.tasteClockCasque,
//     assortment: product.assortment,
//     recycleFee: product.recycleFee,
//     isManufacturingCountry: product.isManufacturingCountry,
//     isRegionalRestricted: product.isRegionalRestricted,
//     packagingLevel1: product.packagingLevel1,
//     isNews: product.isNews,
//     images: product.images.map((x: any) => `${x.imageUrl}.png`),
//     isDiscontinued: product.isDiscontinued,
//     isSupplierTemporaryNotAvailable: product.isSupplierTemporaryNotAvailable,
//     sugarContent: product.sugarContent,
//     sugarContentGramPer100ml: product.sugarContentGramPer100ml,
//     seal: product.seal,
//     vintage: product.vintage,
//     grapes: product.grapes,
//     otherSelections: product.otherSelections,
//     color: product.color,
//     dishPoints: product.dishPoints,
//   };
// };

export const GET = async (request: NextRequest, response: NextResponse) => {
  return new Response(null, { status: 200 });
  // const baseUrl = 'https://api-extern.systembolaget.se/sb-api-ecommerce/v1/productsearch/search?size=30';
  // let updatedProducts = [];
  // let products: Product[] = [];

  // const fetchOptions = {
  //   method: 'GET',
  //   headers: {
  //     accept: 'application/json',
  //     'access-control-allow-origin': '*',
  //     'ocp-apim-subscription-key': 'cfc702aed3094c86b92d6d4ff7a54c84',
  //     Referer: 'https://www.systembolaget.se/',
  //   },
  // };

  // const urlParams = [
  //   '&assortmentText=S%C3%A4song',
  //   '&assortmentText=Tillf%C3%A4lligt%20sortiment',
  //   '&assortmentText=Webblanseringar',
  //   '&assortmentText=Fast%20sortiment',
  //   '&assortmentText=Lokalt%20%26%20Sm%C3%A5skaligt',
  //   '&assortmentText=Presentartiklar',
  //   '&assortmentText=Ordervaror&price.max=250',
  //   '&assortmentText=Ordervaror&price.min=251',
  // ];

  // for (const param of urlParams) {
  //   const url = baseUrl + param;
  //   console.log(`Starting: ${url}`);

  //   for (let i = 1; i < 500; i++) {
  //     await fetch(`${url}&page=${i}`, fetchOptions)
  //       .then((res) => res.json())
  //       .then((json) => {
  //         if (i > json['metadata']['nextPage'] && json['metadata']['nextPage'] > 0) {
  //           console.log('Aborted, something is wrong...');
  //           console.log('Last page: ' + json['metadata']['nextPage']);
  //         } else if (json['metadata']['nextPage'] == -1) {
  //           products = products.concat(json['products']);
  //           console.log('Done after ' + i + ' pages');
  //           i = 10000;
  //         } else {
  //           products = products.concat(json['products']);
  //         }
  //       })
  //       .catch((error) => console.error('Error', error));
  //   }
  // }

  // const newProductNum = products.length;
  // let dupCount = 0;
  // let foundIds: string[] = [];

  // for (let i = products.length - 1; i >= 0; i--) {
  //   let product = products[i];
  //   if (foundIds.includes(product.productNumber as string)) {
  //     products.splice(i, 1);
  //     dupCount++;
  //     continue;
  //   } else {
  //     foundIds.push(product.productNumber as string);
  //   }
  // }

  // console.log(`Found: ${newProductNum} products`);
  // console.log(`Duplicates: ${dupCount} products`);

  // writeFile('data/products.json', JSON.stringify(products, null, 2), (err) => {
  //   if (err) {
  //     throw err;
  //   }
  // });
};
