import { db } from "@/app/_lib/prisma";

const getTotalSales = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate a delay
  return await db.sale.count({});
};

export default getTotalSales;
