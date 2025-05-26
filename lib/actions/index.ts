"use server"

import { revalidatePath } from "next/cache";
import { scrapeAmazonProduct } from "../scraper/amazon";
// import { scrapeFlipkartProduct } from "../scraper/flipkart";
import { connectToDB } from "../mongoose";
import Product from "../models/product.model";
import { getHighestPrice, getlowestPrice } from "../utils";


export async function scrapeAndStoreProdcut(productUrl: string) {
    if(!productUrl) return ;

    try{
        await connectToDB();
        let scrapedProduct; 

        if(productUrl.includes('amazon')) {
            scrapedProduct = await scrapeAmazonProduct(productUrl);
        }
        // } else if(productUrl.includes('flipkart')) {
            // scrapedProduct = await scrapeFlipkartProduct(productUrl);
         else {
            throw new Error('Unsupported website for scraping');
        }

        if(!scrapedProduct) return ;

        let product = scrapedProduct;

        const existingProduct = await Product.find({url: scrapedProduct.url});

        if(existingProduct){
            const updatedPriceHistory : any= [
                // ...(Array.isArray(existingProduct.priceHistory) ? existingProduct.priceHistory : []),
                { price: scrapedProduct.currentPrice}
            ]

            product = {
                ...scrapedProduct,
                // priceHistory: updatedPriceHistory,
                lowestPrice: getlowestPrice(updatedPriceHistory),
                highestPrice: getHighestPrice(updatedPriceHistory),
                // averagePrice: getAveragePrice(updatedPriceHistory),
            }
        }

        const newProduct = await Product.findOneAndUpdate(
            { url : scrapedProduct.url },
            product ,
            { upsert: true, new :true }
        );

        revalidatePath(`/products/${newProduct._id}`);
        
    }catch(error : any){
        throw new Error(`Failed to create/update product: ${error.message}`)
    }
}


export async function getProductById(productId : string){
    try{
        await connectToDB();

        const product = await Product.findOne({_id: productId});

        if(!product) return null;

        return product;
        
    }catch(error){
        console.error('Failed to fetch product by ID: ',error);
        return null;
    }
}

export async function getAllProducts(){
    try{
        await connectToDB();

        const products = await Product.find();

        return products;
        
    }catch (error) {
        console.log(error);
    }
}

export async function getProductByTitle(title: string) {
  try {
    await connectToDB();

    const product = await Product.findOne({
      title: { $regex: new RegExp(title, "i") }, // case-insensitive partial match
    });

    return product;
  } catch (error) {
    console.error("Failed to fetch product by title:", error);
    return null;
  }
}


export async function getProductByUrl(url: string) {
  try {
    await connectToDB();

    const product = await Product.findOne({ url });

    return product;
  } catch (error) {
    console.error("Failed to fetch product by URL:", error);
    return null;
  }
}


export async function createProductFromUrl(url: string) {
  try {
    await scrapeAndStoreProdcut(url);

    const product = await getProductByUrl(url); // fetch the newly stored product
    return product;
  } catch (error) {
    console.error("Failed to create product from URL:", error);
    return null;
  }
}
