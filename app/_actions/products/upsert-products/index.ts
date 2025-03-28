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
    revalidateTag("get-dashboard");
  });

export default upsertProductsActions;
