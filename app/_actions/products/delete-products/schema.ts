import { z } from "zod";

export const DeleteProductsSchema = z.object({ id: z.string().uuid() });

export type DeleteProductsSchema = z.infer<typeof DeleteProductsSchema>;
