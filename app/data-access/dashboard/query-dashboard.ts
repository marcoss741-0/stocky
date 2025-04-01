"use server";

import { db } from "@/app/_lib/prisma";
import { unstable_cache } from "next/cache";
import dayjs from "dayjs";

export interface DayTotalRevenue {
  day: string;
  totalRevenue: number;
}

interface DashboardDto {
  totalProducts: number;
  totalStock: number;
  totalSales: number;
  totalRevenue: number;
  todayRevenue: number;
  totalRevenue14LastDays: DayTotalRevenue[];
}

export const getDashboard = async (): Promise<DashboardDto> => {
  // const today = dayjs().endOf("day").toDate();
  const last14Days = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((day) =>
    dayjs().subtract(day, "day").endOf("day"),
  );

  const totalRevenue14LastDays: DayTotalRevenue[] = [];
  for (const day of last14Days) {
    const dayTotalRevenue = await db.$queryRawUnsafe<DayTotalRevenue[]>(
      `SELECT SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") as "totalRevenue" FROM "SaleProduct"
      JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
      WHERE "Sale"."date" >= $1 AND "Sale"."date" <= $2`,
      day.startOf("day").toDate(),
      day.endOf("day").toDate(),
    );

    totalRevenue14LastDays.push({
      day: day.format("DD/MM"),
      totalRevenue: dayTotalRevenue[0]?.totalRevenue,
    });
  }

  const totalProductsPromise = db.product.count({});

  const todayRevenueQuery = `
    SELECT SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") as "todayRevenue"
    FROM "SaleProduct"
    JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
    WHERE "Sale"."date" >= $1 AND "Sale"."date" <= $2;
  `;
  const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
  const endOfDay = new Date(new Date().setHours(23, 59, 59, 999));
  const todayRevenuePromise = await db.$queryRawUnsafe<
    { todayRevenue: number }[]
  >(todayRevenueQuery, startOfDay, endOfDay);

  const totalSalesPromise = db.sale.count({});

  const totalStockPromise = db.product.aggregate({
    _sum: { stock: true },
  });

  //await new Promise((resolve) => setTimeout(resolve, 3500));
  const totalRevenueQuery = `
    SELECT SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") as "totalRevenue"
    FROM "SaleProduct"
    JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id";
  `;
  const totalRevenuePromise =
    await db.$queryRawUnsafe<{ totalRevenue: number }[]>(totalRevenueQuery);

  const [totalProducts, todayRevenue, totalSales, totalStock, totalRevenue] =
    await Promise.all([
      totalProductsPromise,
      todayRevenuePromise,
      totalSalesPromise,
      totalStockPromise,
      totalRevenuePromise,
    ]);

  return {
    totalRevenue: Number(totalRevenue[0]?.totalRevenue ?? 0),

    todayRevenue: Number(todayRevenue[0]?.todayRevenue ?? 0),
    totalProducts,
    totalSales,
    totalStock: Number(totalStock._sum.stock),
    totalRevenue14LastDays,
  };
};

export const cachedGetDashboard = unstable_cache(
  getDashboard,
  ["getDashboard"],
  {
    tags: ["get-dashboard"],
    revalidate: 60,
  },
);
