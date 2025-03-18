"use server";

import { db } from "@/app/_lib/prisma";
import { revalidateTag } from "next/cache";
import { formSchema, UpsertProductSchema } from "./schema";

const upsertProducts = async (data: UpsertProductSchema) => {
  formSchema.parse(data);

  await db.product.upsert({
    where: { id: data.id || "" },
    update: data,
    create: data,
  });

  revalidateTag("get-products");
};

export default upsertProducts;
