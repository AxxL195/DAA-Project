import { PriceHistoryItem } from "@/types";

export function extractPrice(...elements: any){
    for(const element of elements){
        const priceText = element.text().trim();

        if (priceText) return priceText.replace(/\D/g, '');
    }

    return '';
}

export function extractCurrency(element: any){
    const currencyText = element.text().trim().slice(0,1);
    return currencyText ? currencyText: '';
}

export function getHighestPrice(priceList: PriceHistoryItem[]){
    let highestPrice = priceList[0];

    for(let i=0;i<priceList.length;i++){
        if(priceList[i].price > highestPrice.price){
            highestPrice = priceList[i];
        }
    }

    return highestPrice.price;
}

export function getlowestPrice(priceList : PriceHistoryItem[]){
    let lowestPrice= priceList[0];

    for(let i=0;i<priceList.length;i++){
        if(priceList[i].price < lowestPrice.price){
            lowestPrice= priceList[i];
        }
    }

    return lowestPrice.price;
}

export const formatNumber = (num: number = 0) => {
    return num.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })
}
