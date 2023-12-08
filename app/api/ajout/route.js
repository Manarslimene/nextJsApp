import { connectMongoDB } from "@/lib/mongodb";

import { NextResponse } from "next/server";

import Product from "@/models/product";

export async function POST(request) {
  const requestBody = await request.json();

  try {
    await connectMongoDB();
    const { name, prix, cat } = requestBody;
    await Product.create({ name, prix, cat });

    return NextResponse.json({ message: "Produit Ajouter." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message},
      { status: 500 }
    );
  }
}
