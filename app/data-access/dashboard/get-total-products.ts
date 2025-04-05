"use server";

import { db } from "@/app/_lib/prisma";
import { unstable_cache } from "next/cache";

const getTotalProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate a delay

  return await db.product.count({});
};

export default getTotalProducts;

export const cachedGetTotalProducts = unstable_cache(
  getTotalProducts,
  ["getTotalProducts"],
  {
    tags: ["get-total-products"],
    revalidate: 60,
  },
);
