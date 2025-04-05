"use server";

import { db } from "@/app/_lib/prisma";
import { unstable_cache } from "next/cache";

const getTotalInStock = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const totalInStock = await db.product.aggregate({
    _sum: { stock: true },
  });

  return Number(totalInStock._sum.stock);
};

export default getTotalInStock;

export const cachedGetTotalInStock = unstable_cache(
  getTotalInStock,
  ["getTotalInStock"],
  {
    tags: ["get-total-in-stock"],
    revalidate: 60,
  },
);
