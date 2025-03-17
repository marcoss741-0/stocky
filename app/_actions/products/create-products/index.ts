"use server";

import { db } from "@/app/_lib/prisma";
import { revalidateTag } from "next/cache";
import { formSchema, SCHEMA } from "./schema";

const createProduct = async (data: SCHEMA) => {
  formSchema.parse(data);
  await db.product.create({ data });

  revalidateTag("get-products");
};

export default createProduct;
