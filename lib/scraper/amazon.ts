import axios from 'axios';
import * as cheerio from 'cheerio';
import { extractPrice } from '../utils';
import dynamic from 'next/dynamic';
import { extractCurrency } from '../utils';

export async function scrapeAmazonProduct(url:string) {
    if(!url) return;
// curl -i --proxy brd.superproxy.io:33335 --proxy-user brd-customer-hl_b1d318e0-zone-web_unlocker1:95bqsrt7hmo7 -k "https://geo.brdtest.com/welcome.txt?product=unlocker&method=native"

    //bright data proxy configuration
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port =  33335;
    const session_id = (1000000 * Math.random())| 0;
    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
    }

    try{
        const response =  await axios.get(url, options)
        const $ = cheerio.load(response.data)

        //EXTRACT THE PRODUCT TITLE
        const title = $('.a-size-large.product-title-word-break').text().trim();
        const currentPrice= extractPrice(
            $('.a-price.priceToPay'),
        );
           
        const realPrice=  extractPrice(
            $('.a-price.a-text-price .a-offscreen')
        );
    
        // const availability=$('.a-size-medium.a-color-success').text().trim();

        const images = 
            $('#landingImage').attr('data-a-dynamic-image') ||
            '{}'; 

        const imageUrls = Object.keys(JSON.parse(images));

        const currency = extractCurrency($('.a-price-symbol'));

        const discountRate = $('.savingPriceOverride.savingsPercentage').text().replace(/[-%]/g,"");

        //Construct data obnect with scraped information
        const data={
            url,
            title,
            image : imageUrls[0],
            currency: currency || '$',
            currentPrice: Number(currentPrice) || Number(realPrice),
            realPrice : Number(realPrice) || Number(currentPrice),
            priceHistory:[],
            discountRate: Number(discountRate),
            // isOutOfStock : availability,
            lowestPrice: Number(currentPrice) || Number(realPrice),
            highestPrice: Number(realPrice) || Number(currentPrice)
        }
        return data;
        // console.log({title, currentPrice, realPrice, availability,imageUrls,currency,discountRate})

    }catch(error: any){
        throw new Error(`Failed to scrape product : ${error.message}`)
    }
}