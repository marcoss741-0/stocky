"use server";

import { db } from "@/app/_lib/prisma";
import { unstable_cache } from "next/cache";

export interface SalesDTO {
  id: string;
  productsName: string;
  totalProducts: number;
  totalValue: number;
  date: Date;
}

export const querySales = async (): Promise<SalesDTO[]> => {
  const sales = await db.sale.findMany({
    include: {
      saleProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return sales.map((sale) => ({
    id: sale.id,
    date: sale.date,
    productsName: sale.saleProducts
      .map((saleProduct) => saleProduct.product.name)
      .join(" - "),
    totalProducts: sale.saleProducts.reduce(
      (acc, saleProduct) => acc + saleProduct.quantity,
      0,
    ),
    totalValue: sale.saleProducts.reduce(
      (acc, saleProduct) =>
        acc + Number(saleProduct.product.price) * saleProduct.quantity,
      0,
    ),
  }));
};

export const cachedGetSales = unstable_cache(querySales, ["querySales"], {
  tags: ["get-sales"],
  revalidate: 60,
});
