// // app/api/search-products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import Product from "@/lib/models/product.model";

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query || query.trim() === "") {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    await connectToDB();

    const products = await Product.find({
      title: { $regex: new RegExp(query, "i") }, // case-insensitive match
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
