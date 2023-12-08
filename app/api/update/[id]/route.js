import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Product from "@/models/product";

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    await connectMongoDB();

    const productUpdated = await Product.findByIdAndUpdate(params.id, body, {
      new: true,
    });
   
    if (!productUpdated)
      return NextResponse.json(
        {
          message: productUpdated,
        },
        {
          status: 404,
        }
      );
    return NextResponse.json({ message: "Produit mis à jour." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
