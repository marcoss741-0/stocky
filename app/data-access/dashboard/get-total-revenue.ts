"use server";

import "server-only"; // This is required to use server-only modules in a server component
import { db } from "@/app/_lib/prisma";
import { unstable_cache } from "next/cache";

const getTotalRevenue = async (): Promise<number> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const totalRevenueQuery = `
      SELECT SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") as "totalRevenue"
      FROM "SaleProduct"
      JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id";
    `;
  const totalRevenue =
    await db.$queryRawUnsafe<{ totalRevenue: number }[]>(totalRevenueQuery);

  return Number(totalRevenue[0]?.totalRevenue || 0);
};

export default getTotalRevenue;

export const cachedGetTotalRevenue = unstable_cache(
  getTotalRevenue,
  ["getTotalRevenue"],
  {
    tags: ["get-total-revenue"],
    revalidate: 60,
  },
);
