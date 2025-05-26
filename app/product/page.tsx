// app/products/page.tsx
import SearchBarDB from "@/components/SearchBarDB";

export default function ProductsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Products</h1>
      <SearchBarDB />
    </div>
  );
}
