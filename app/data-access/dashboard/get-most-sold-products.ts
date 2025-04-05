"use server";

import "server-only"; // This is required to use server-only modules in a server component
import { db } from "@/app/_lib/prisma";
import { ProductStatus } from "../product/query-product";
import { unstable_cache } from "next/cache";

export interface MostSoldProductsDto {
  name: string;
  totalSold: number;
  price: number;
  id: string;
  status: ProductStatus;
}

const getMostSoldProducts = async (): Promise<MostSoldProductsDto[]> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
  const endOfDay = new Date(new Date().setHours(23, 59, 59, 999));

  const mostSoldProductsQuery = `
    SELECT SUM("SaleProduct"."quantity") as "totalSold", "Product"."price", "Product"."stock", "Product"."name", "Product"."id"
    FROM "SaleProduct" 
    JOIN "Product" ON "SaleProduct"."productId" = "Product"."id"
    GROUP BY "Product"."name", "Product"."price", "Product"."stock", "Product"."id"
    ORDER BY "totalSold" DESC
    LIMIT 6;
  `;

  const mostSoldProducts = await db.$queryRawUnsafe<
    {
      name: string;
      totalSold: number;
      stock: number;
      price: number;
      id: string;
    }[]
  >(mostSoldProductsQuery, startOfDay, endOfDay);

  return mostSoldProducts.map((product) => ({
    name: product.name,
    totalSold: Number(product.totalSold),
    price: Number(product.price),
    id: product.id,
    status: product.stock <= 0 ? "Fora de estoque" : "Em estoque",
  }));
};

export default getMostSoldProducts;

export const cachedGetMostSoldProducts = unstable_cache(
  getMostSoldProducts,
  ["getMostSoldProducts"],
  {
    tags: ["get-most-sold-products"], // Cache invalidation tags
    revalidate: 10,
  },
);
