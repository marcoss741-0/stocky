"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { formSchema, SCHEMA } from "./schema";

const createProduct = async (data: SCHEMA) => {
  formSchema.parse(data);
  await db.product.create({ data });
  revalidatePath("/products");
};

export default createProduct;
