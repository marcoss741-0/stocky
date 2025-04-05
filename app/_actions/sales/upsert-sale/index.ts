"use server";

import { db } from "@/app/_lib/prisma";
import { createSaleSchema } from "./schema";
import { revalidateTag } from "next/cache";
import { actionClient } from "@/app/_lib/safe-actions";

const upsertSale = actionClient
  .schema(createSaleSchema)
  .action(async ({ parsedInput: { products, id } }) => {
    const isUpdate = Boolean(id);

    await db.$transaction(async (tx) => {
      if (isUpdate) {
        const existingSale = await tx.sale.findUnique({
          where: { id },
          include: { saleProducts: true },
        });

        if (!existingSale) return;

        await tx.sale.delete({
          where: { id },
        });

        for (const product of existingSale.saleProducts) {
          await tx.product.update({
            where: { id: product.productId },
            data: {
              stock: {
                increment: product.quantity,
              },
            },
          });
        }
      }

      const sale = await tx.sale.create({
        data: {
          date: new Date(),
        },
      });

      for (const product of products) {
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
    revalidateTag("get-sales");

    revalidateTag("get-total-sales");
    revalidateTag("get-total-products");
    revalidateTag("get-total-revenue");
    revalidateTag("get-total-in-stock");
    revalidateTag("get-today-revenue");
    revalidateTag("get-most-sold-products");
    revalidateTag("get-last-14-days-revenue");
  });

export default upsertSale;
