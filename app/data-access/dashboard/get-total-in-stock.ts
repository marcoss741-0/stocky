import { db } from "@/app/_lib/prisma";

const getTotalInStock = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate a delay
  const totalInStock = await db.product.aggregate({
    _sum: { stock: true },
  });

  return Number(totalInStock._sum.stock);
};

export default getTotalInStock;
