

import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Category from "@/models/category";

export async function GET(req) {
  try {
    await connectMongoDB();

    // Récupérer tous les produits depuis la base de données
    const categories = await Category.find();

    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Une erreur s'est produite lors de la récupération des categories." },
      { status: 500 }
    );
  }
}
