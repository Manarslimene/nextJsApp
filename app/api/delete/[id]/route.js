// Fichier: pages/api/delete/route.js

import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Product from "@/models/product";

export async function DELETE(request, { params }) {
  await connectMongoDB();
  try {
    const productDeleted = await Product.findByIdAndDelete(params.id);

    if (!productDeleted)
      return NextResponse.json(
        {
          message: "Product not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json( {
      message: "Product deleted with successful",
    },
    {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
 
}
