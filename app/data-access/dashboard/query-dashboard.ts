import { db } from "@/app/_lib/prisma";
import { unstable_cache } from "next/cache";

interface DashboardDto {
  totalProducts: number;
  totalStock: number;
  totalSales: number;
  totalRevenue: number;
  todayRevenue: number;
}

export const getDashboard = async (): Promise<DashboardDto> => {
  const totalProductsPromise = db.product.count({});

  const todayRevenuePromise = db.saleProduct.aggregate({
    _sum: { unitPrice: true, quantity: true },
    where: {
      createdAt: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        lte: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    },
  });

  const totalSalesPromise = db.sale.count({});

  const totalStockPromise = db.product.aggregate({
    _sum: { stock: true },
  });

  const totalRevenuePromise = db.saleProduct.aggregate({
    _sum: { unitPrice: true, quantity: true },
  });

  const [totalProducts, todayRevenue, totalSales, totalStock, totalRevenue] =
    await Promise.all([
      totalProductsPromise,
      todayRevenuePromise,
      totalSalesPromise,
      totalStockPromise,
      totalRevenuePromise,
    ]);

  return {
    totalRevenue: Number(
      Number(totalRevenue._sum.unitPrice ?? 0) *
        Number(todayRevenue._sum.quantity ?? 0),
    ),
    todayRevenue: Number(
      Number(todayRevenue._sum.unitPrice ?? 0) *
        Number(todayRevenue._sum.quantity ?? 0),
    ),
    totalProducts,
    totalSales,
    totalStock: Number(totalStock._sum.stock),
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
