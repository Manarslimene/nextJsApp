import { connectMongoDB } from "@/lib/mongodb";

import { NextResponse } from "next/server";

import Category from "@/models/category";

export async function POST(request) {
  try {
    await connectMongoDB();
    const label = await request.json();
    await Category.create({label});
   
    return NextResponse.json({ message: "Category Ajouter." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error},
      { status: 500 }
    );
  }
}
