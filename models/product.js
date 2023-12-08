import mongoose, { Schema } from "mongoose";

let Product;

try {
  // Try to get the existing model, if it has already been defined
  Product = mongoose.model("Product");
} catch (error) {
  // If the model does not exist, define and create it
  const ProductSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      prix: {
        type: Number,
        required: true,
      },
      cat: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

  Product = mongoose.model("Product", ProductSchema);
}

export default Product;
