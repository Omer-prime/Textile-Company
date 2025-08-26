import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  image: z.string().url().optional(),
});

export const ProductSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  categoryId: z.string().min(1),
  categorySlug: z.string().min(1),
  subcategory: z.string().optional(),
  description: z.string().optional(),
  image: z.string().url().optional(),
  sizes: z.array(z.string()).default([]),
  variants: z.array(z.object({
    colorName: z.string().optional(),
    colorHex: z.string().optional(),
    images: z.array(z.object({
      url: z.string().url(),
      alt: z.string().optional(),
      sortOrder: z.number().optional(),
    })).default([]),
  })).default([]),
});

export const TestimonialSchema = z.object({
  name: z.string().min(1),
  avatar: z.string().url().optional(),
  rating: z.number().int().min(1).max(5).default(5),
  review: z.string().min(1),
});

export const FeatureSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  iconKey: z.string().optional(),
  order: z.number().int().optional(),
});

export const FeaturedSchema = z.object({
  productIds: z.array(z.string()).default([]),
  title: z.string().optional(),
});

export const LoginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });
export const ForgotSchema = z.object({ email: z.string().email() });
export const ResetSchema = z.object({ token: z.string(), password: z.string().min(6) });
