"use server";

import { db } from "@/app/_lib/prisma";
import { createSaleSchema, CreateSaleSchemaType } from "./schema";
import { revalidateTag } from "next/cache";

const createSale = async (data: CreateSaleSchemaType) => {
  createSaleSchema.parse(data);

  const sale = await db.sale.create({
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

    await db.saleProduct.create({
      data: {
        saleId: sale.id,
        productId: product.id,
        quantity: product.quantity,
        unitPrice: productDB.price,
      },
    });

    await db.product.update({
      where: {
        id: product.id,
      },
      data: {
        stock: productDB.stock - product.quantity,
      },
    });
  }

  revalidateTag("get-products");
};

export default createSale;
