import { db } from "@/app/_lib/prisma";

const getTotalRevenue = async (): Promise<number> => {
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
