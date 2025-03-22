"use server";

import { db } from "@/app/_lib/prisma";
import { createSaleSchema } from "./schema";
import { revalidateTag } from "next/cache";
import { actionClient } from "@/app/_lib/safe-actions";

const createSaleAction = actionClient
  .schema(createSaleSchema)
  .action(async ({ parsedInput: data }) => {
    await db.$transaction(async (tx) => {
      const sale = await tx.sale.create({
        data: {
          date: new Date(),
        },
      });

      for (const product of data.products) {
        const productDB = await db.product.findUnique({
          where: {
            id: product.id,
          },
          select: {
            price: true,
            stock: true,
          },
        });

        if (!productDB) {
          throw new Error("Product not found");
        }

        const productIsOutOfStock = productDB.stock < product.quantity;
        if (productIsOutOfStock) {
          throw new Error("Product out of stock");
        }

        await tx.saleProduct.create({
          data: {
            saleId: sale.id,
            productId: product.id,
            quantity: product.quantity,
            unitPrice: productDB.price,
          },
        });

        await tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            stock: productDB.stock - product.quantity,
          },
        });
      }
    });
    revalidateTag("get-products");
  });

export default createSaleAction;
