/*import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Product from "@/models/product";

export async function GET(req) {
  try {
    await connectMongoDB();
    
    // Récupérer tous les produits depuis la base de données
    const products = await Product.find();

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error ." },
      { status: 500 }
    );
  }
}
// listing.js

// ... (existing code)*/


// listing.js

// listing.js

// listing.js

// listing.js

import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Product from "@/models/product";

export async function GET(req) {
  try {
    await connectMongoDB();

    // Récupérer tous les produits depuis la base de données
    const products = await Product.find();

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Une erreur s'est produite lors de la récupération des produits." },
      { status: 500 }
    );
  }
}
