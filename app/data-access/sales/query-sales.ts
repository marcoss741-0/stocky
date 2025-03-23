"use server";

import { db } from "@/app/_lib/prisma";
import { unstable_cache } from "next/cache";

interface SalesProductDTO {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  productName: string;
}

export interface SalesDTO {
  id: string;
  productsName: string;
  totalProducts: number;
  totalValue: number;
  date: Date;
  saleProducts: SalesProductDTO[];
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
    saleProducts: sale.saleProducts.map(
      (saleProduct): SalesProductDTO => ({
        productId: saleProduct.productId,
        name: saleProduct.product.name,
        price: Number(saleProduct.product.price),
        quantity: saleProduct.quantity,
        productName: saleProduct.product.name,
      }),
    ),
  }));
};

export const cachedGetSales = unstable_cache(querySales, ["querySales"], {
  tags: ["get-sales"],
  revalidate: 60,
});
