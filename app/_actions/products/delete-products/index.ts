"use server";

import { db } from "@/app/_lib/prisma";
import { DeleteProductsSchema } from "./schema";
import { revalidateTag } from "next/cache";
import { actionClient } from "@/app/_lib/safe-actions";

const deleteProductsActions = actionClient
  .schema(DeleteProductsSchema)
  .action(async ({ parsedInput: { id } }) => {
    await db.product.delete({ where: { id } });

    revalidateTag("get-products");
    revalidateTag("get-sales");
    revalidateTag("get-dashboard");
  });

export default deleteProductsActions;
