"use server";

import { db } from "@/app/_lib/prisma";
import { UpdateProductsSchema } from "./schema";
import { revalidateTag } from "next/cache";

const UpdateProducts = async ({
  id,
  name,
  price,
  stock,
}: UpdateProductsSchema) => {
  UpdateProductsSchema.parse({ id, name, price, stock });
  await db.product.update({ where: { id }, data: { name, price, stock } });

  revalidateTag("get-products");
};

export default UpdateProducts;
