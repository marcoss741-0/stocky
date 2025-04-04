import { db } from "@/app/_lib/prisma";

const getTotalProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate a delay
  return await db.product.count({});
};

export default getTotalProducts;
