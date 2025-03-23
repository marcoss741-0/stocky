import * as z from "zod";

export const createSaleSchema = z.object({
  id: z.string().uuid().optional(),

  products: z.array(
    z.object({
      id: z.string().uuid(),
      quantity: z.number().int().positive(),
    }),
  ),
});

export type CreateSaleSchemaType = z.infer<typeof createSaleSchema>;
