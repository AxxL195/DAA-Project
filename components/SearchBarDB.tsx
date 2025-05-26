"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  _id: string;
  title: string;
  image: string;
  currentPrice: number;
  currency: string;
  url: string;
};

const SearchBarDB = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);

    const res = await fetch("/api/search-products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.products) {
      setResults(data.products);
    } else {
      alert(data.error || "No products found.");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search for a product like MacBook..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 rounded">
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="space-y-4">
        {results.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded shadow-md flex items-center gap-4"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-20 h-20 object-contain"
            />
            <div className="flex-1">
              <p className="text-lg font-semibold">{product.title}</p>
              <p className="text-gray-600">
                {product.currency} {product.currentPrice}
              </p>
              <a
                href={`/product/${product._id}`}
                className="text-blue-500 underline"
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBarDB;
