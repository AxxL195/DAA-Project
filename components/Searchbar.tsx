"use client"

import { scrapeAndStoreProdcut } from "@/lib/actions";
import { FormEvent, useState } from "react";

const isValidProductUrl = (url: string) => {
    try {
        const parsedURL = new URL(url);
        const hostname = parsedURL.hostname.toLowerCase();

        //check if the hostname contains amazon.com 
        if (
            hostname.includes('amazon.com') ||
            hostname.includes('amazon.') ||
            hostname.endsWith('amazon') ||
            hostname.includes('flipkart.com') ||
            hostname.includes('flipkart.') ||
            hostname.endsWith('flipkart')
        ) {
            return true;
        }
    } catch (error) {
        return false;
    }

    return false;
}
const Searchbar = () => {
    const [searchPrompt, setsearchPrompt] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isValidLink = isValidProductUrl(searchPrompt);

        if (!isValidLink) return alert('Please provide a valid Amazon or Flipkart link')

        try {
            setisLoading(true);

            //Scrape
            const product = await scrapeAndStoreProdcut(searchPrompt);
        } catch (error) {
            console.log(error);
        } finally {
            setisLoading(false);
        }
    }
    return (
        <form
            className='flex flex-wrap gap-4 mt-12'
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                value={searchPrompt}
                onChange={(e) => setsearchPrompt(e.target.value)}
                placeholder="Enter product link"
                className="searchbar-input"

            />
            <button
                type="submit"
                className="searchbar-btn"
                disabled={searchPrompt=== ''}
            >
                {isLoading ? 'Searching...' : 'Search'}
            </button>
        </form>
    )
}

export default Searchbar

