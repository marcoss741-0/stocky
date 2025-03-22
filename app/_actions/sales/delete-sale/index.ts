"use server";

import { actionClient } from "@/app/_lib/safe-actions";
import { DeleteSaleSchema } from "./schema";
import { db } from "@/app/_lib/prisma";
import { revalidateTag } from "next/cache";

const deleteSalesActions = actionClient
  .schema(DeleteSaleSchema)
  .action(async ({ parsedInput: { id } }) => {
    await db.sale.delete({ where: { id } });

    revalidateTag("get-sales");
  });

export default deleteSalesActions;
