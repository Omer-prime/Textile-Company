// src/lib/validators/auth.ts
import { z } from "zod";
export const ForgotSchema = z.object({ email: z.string().email() });
export const ResetSchema = z.object({
  token: z.string().min(10),
  password: z.string().min(6),
});
