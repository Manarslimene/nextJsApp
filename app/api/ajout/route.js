import { connectMongoDB } from "@/lib/mongodb";

import { NextResponse } from "next/server";

import Product from "@/models/product";

export async function POST(req) {
  try {
    const {name } = await req.json();
   
    await connectMongoDB();
    await Product.create({ name });

    return NextResponse.json({ message: "Produit Ajouter." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message},
      { status: 500 }
    );
  }
}
