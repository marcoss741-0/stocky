"use server";

import "server-only"; // This is required to use server-only modules in a server component
import { db } from "@/app/_lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import dayjs from "dayjs";
import { unstable_cache } from "next/cache";

export interface DayTotalRevenueDto {
  day: string;
  totalRevenue: number;
}

const getLast14DaysRevenue = async (): Promise<DayTotalRevenueDto[]> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const today = dayjs().endOf("day").toDate();
  const last14Days = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(
    (day) => {
      return dayjs(today).subtract(day, "day");
    },
  );
  const totalLast14DaysRevenue: DayTotalRevenueDto[] = [];
  for (const day of last14Days) {
    const dayTotalRevenue = await db.$queryRawUnsafe<
      { totalRevenue: Decimal }[]
    >(
      `
      SELECT SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") as "totalRevenue"
      FROM "SaleProduct"
      JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
      WHERE "Sale"."date" >= $1 AND "Sale"."date" <= $2;
      `,
      day.startOf("day").toDate(),
      day.endOf("day").toDate(),
    );
    totalLast14DaysRevenue.push({
      day: day.format("DD/MM"),
      totalRevenue: Number(dayTotalRevenue[0].totalRevenue),
    });
  }
  return totalLast14DaysRevenue;
};

export default getLast14DaysRevenue;

export const cachedGetLast14DaysRevenue = unstable_cache(
  getLast14DaysRevenue,
  ["cachedGetLast14DaysRevenue"],
  { tags: ["get-last-14-days-revenue"], revalidate: 60 },
);
