"use server";

import "server-only"; // This is required to use server-only modules in a server component
import { db } from "@/app/_lib/prisma";
import { unstable_cache } from "next/cache";

const getTodayRevenue = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const todayRevenueQuery = `
      SELECT SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") as "todayRevenue"
      FROM "SaleProduct"
      JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
      WHERE "Sale"."date" >= $1 AND "Sale"."date" <= $2;
    `;
  const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
  const endOfDay = new Date(new Date().setHours(23, 59, 59, 999));
  const todayRevenue = await db.$queryRawUnsafe<{ todayRevenue: number }[]>(
    todayRevenueQuery,
    startOfDay,
    endOfDay,
  );

  return Number(todayRevenue[0]?.todayRevenue ?? 0);
};

export default getTodayRevenue;

export const cachedTodayRevenue = unstable_cache(
  getTodayRevenue,
  ["getTodayRevenue"],
  {
    tags: ["get-today-revenue"],
    revalidate: 60,
  },
);
