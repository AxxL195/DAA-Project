import { scrapeAmazonProduct } from './amazon';
// import { scrapeFlipkartProduct } from './flipkart';

export async function scrapeProduct(url: string) {
    if (url.includes('amazon')) {
        return await scrapeAmazonProduct(url);
    }
    // else if (url.includes('flipkart')) {
        // return await scrapeFlipkartProduct(url);
    // }
     else {
        throw new Error('Unsupported website');
    }
}
