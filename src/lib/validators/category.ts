// src/lib/validators/category.ts
import { z } from "zod";
export const CategoryUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().optional(),
  image: z.string().url().optional(),
});
