import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "O nome do produto é obrigatorio" }),

  price: z.number().min(0.01, { message: "O preco do produto é obrigatorio" }),

  stock: z.coerce
    .number()
    .positive({
      message: "O estoque não pode ser negativo",
    })
    .int()
    .min(1, { message: "O estoque do produto é obrigatorio" }),
});

export type SCHEMA = z.infer<typeof formSchema>;
