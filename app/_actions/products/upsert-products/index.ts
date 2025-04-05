"use server";

import { db } from "@/app/_lib/prisma";
import { revalidateTag } from "next/cache";
import { formSchema } from "./schema";
import { actionClient } from "@/app/_lib/safe-actions";

const upsertProductsActions = actionClient
  .schema(formSchema)
  .action(async ({ parsedInput: { id, ...data } }) => {
    await db.product.upsert({
      where: { id: id || "" },
      update: data,
      create: data,
    });

    revalidateTag("get-products");
    revalidateTag("get-sales");

    revalidateTag("get-total-sales");
    revalidateTag("get-total-products");
    revalidateTag("get-total-revenue");
    revalidateTag("get-total-in-stock");
    revalidateTag("get-today-revenue");
    revalidateTag("get-most-sold-products");
    revalidateTag("get-last-14-days-revenue");
  });

export default upsertProductsActions;
