"use server";

import { actionClient } from "@/app/_lib/safe-actions";
import { DeleteSaleSchema } from "./schema";
import { db } from "@/app/_lib/prisma";
import { revalidateTag } from "next/cache";

const deleteSalesActions = actionClient
  .schema(DeleteSaleSchema)
  .action(async ({ parsedInput: { id } }) => {
    await db.$transaction(async (tx) => {
      const sale = await tx.sale.findUnique({
        where: { id },
        include: { saleProducts: true },
      });

      if (!sale) {
        throw new Error("Sale not found");
      }

      await tx.sale.delete({ where: { id } });

      for (const product of sale.saleProducts) {
        await tx.product.update({
          where: { id: product.productId },
          data: {
            stock: {
              increment: product.quantity,
            },
          },
        });
      }
    });

    revalidateTag("get-sales");
    revalidateTag("get-dashboard");
    revalidateTag("get-products");
  });

export default deleteSalesActions;
