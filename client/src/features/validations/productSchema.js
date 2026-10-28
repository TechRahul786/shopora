import { z } from "zod";

const imageSchema = z
  .custom(
    (file) =>
      typeof File !== "undefined" && file instanceof File,
    { message: "Please select a product image." }
  )
  .refine(
    (file) => file.size <= 5 * 1024 * 1024,
    "Image size must be less than 5 MB."
  )
  .refine(
    (file) =>
      ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    "Only JPG, PNG, and WEBP images are allowed."
  );

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Product name must contain at least 3 characters.")
    .max(100, "Product name cannot exceed 100 characters."),

  price: z
    .string()
    .min(1, "Price is required.")
    .refine(
      (value) => Number.isFinite(Number(value)) && Number(value) > 0,
      "Price must be greater than 0."
    ),

  description: z
    .string()
    .trim()
    .min(10, "Description must contain at least 10 characters.")
    .max(2000, "Description cannot exceed 2000 characters."),

  category: z
    .string()
    .trim()
    .min(1, "Please enter a category."),

  stock: z
    .string()
    .min(1, "Stock quantity is required.")
    .refine(
      (value) =>
        /^\d+$/.test(value) && Number.isSafeInteger(Number(value)),
      "Stock must be a non-negative integer."
    ),

  image: imageSchema,

  ratings: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        (Number.isFinite(Number(value)) &&
          Number(value) >= 0 &&
          Number(value) <= 5),
      "Rating must be between 0 and 5."
    ),

  numReviews: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        (/^\d+$/.test(value) &&
          Number.isSafeInteger(Number(value))),
      "Number of reviews must be a non-negative integer."
    ),
});