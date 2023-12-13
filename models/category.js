import mongoose, { Schema } from "mongoose";

let Category;

try {
  // Try to get the existing model, if it has already been defined
  Category = mongoose.model("Category");
} catch (error) {
  // If the model does not exist, define and create it
  const CategorySchema = new Schema(
    {
      label: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

  Category = mongoose.model("Category", CategorySchema);
}

export default Category;
