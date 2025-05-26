// import axios from 'axios';
// import * as cheerio from 'cheerio';
// import { extractPrice } from '../utils';
// import dynamic from 'next/dynamic';
// import { extractCurrency } from '../utils';
// import https from 'https';

// export async function scrapeFlipkartProduct(url:string) {
//     if(!url) return;
// // curl -i --proxy brd.superproxy.io:33335 --proxy-user brd-customer-hl_b1d318e0-zone-web_unlocker1:95bqsrt7hmo7 -k "https://geo.brdtest.com/welcome.txt?product=unlocker&method=native"

//     //bright data proxy configuration
//     const username = String(process.env.BRIGHT_DATA_USERNAME).trim();
//     const password = String(process.env.BRIGHT_DATA_PASSWORD).trim();
//     const port =  33335;
//     const session_id = (1000000 * Math.random())| 0;

//     const proxyConfig = {
//         host: 'brd.superproxy.io',
//         port: port,
//         auth: {
//             username: `${username}-session-${session_id}`,
//             password: password,
//         }
//     };

//     try{
//         const response = await axios.get(url, {
//         headers: {
//             'User-Agent':
//             'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36',
//         },
//         // httpsAgent: proxyAgent,
//         proxy:proxyConfig,
//         maxRedirects: 5,
//         httpsAgent: new https.Agent({
//             rejectUnauthorized:false,
//         }),
//         });

//         const $ = cheerio.load(response.data)

//         //EXTRACT THE PRODUCT TITLE
//         const title = $('.VU-ZEz').text().trim();

//         const currentPrice= extractPrice(
//             $('.Nx9bqj.CxhGGd'),
//         );
           
//         const realPrice=  extractPrice(
//             $('.yRaY8j.A6+E6v')
//         );
    
//         // const availability=$('.a-size-medium.a-color-success').text().trim();

//        const srcset = $('.DByuf4.IZexXJ.jLEJ7H').attr('srcset') || '';
//         const imageUrls = srcset
//             .split(',')
//             .map((s) => s.trim().split(' ')[0])
//             .filter(Boolean);
//         const image = imageUrls[0] || '';

//         const currency = extractCurrency($('.a-price-symbol'));

//         const discountRate = $('.UkUFwK.WW8yVX').text().replace(/[-%]/g,"");

//         //Construct data obnect with scraped information
//         const data={
//             url,
//             title,
//             image : imageUrls[0],
//             currency: currency || '$',
//             currentPrice: Number(currentPrice) || Number(realPrice),
//             realPrice : Number(realPrice) || Number(currentPrice),
//             priceHistory:[],
//             discountRate: Number(discountRate),
//             // isOutOfStock : availability,
//             lowestPrice: Number(currentPrice) || Number(realPrice),
//             highestPrice: Number(realPrice) || Number(currentPrice)
//         }
//         return data;
//         // console.log({title, currentPrice, realPrice, availability,imageUrls,currency,discountRate})

//     }catch(error: any){
//         throw new Error(`Failed to scrape product : ${error.message}`)
//     }
// }