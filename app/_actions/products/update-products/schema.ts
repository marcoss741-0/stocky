import { z } from "zod";

export const UpdateProductsSchema = z.object({
  id: z.string().uuid().optional(),

  name: z
    .string()
    .trim()
    .min(1, { message: "O nome do produto é obrigatorio" }),

  price: z.number().min(0.01, { message: "O preço do produto é obrigatorio" }),

  stock: z.coerce
    .number()
    .positive({
      message: "O estoque não pode ser negativo",
    })
    .int()
    .min(1, { message: "O estoque do produto é obrigatorio" }),
});

export type UpdateProductsSchema = z.infer<typeof UpdateProductsSchema>;
