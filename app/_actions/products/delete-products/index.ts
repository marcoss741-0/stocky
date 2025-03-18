"use server";

import { db } from "@/app/_lib/prisma";
import { DeleteProductsSchema } from "./schema";
import { revalidateTag } from "next/cache";

const DeleteProducts = async ({ id }: DeleteProductsSchema) => {
  DeleteProductsSchema.parse({ id });
  await db.product.delete({ where: { id } });

  revalidateTag("get-products");
};

export default DeleteProducts;
