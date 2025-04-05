"use server";

import "server-only"; // This is required to use server-only modules in a server component
import { db } from "@/app/_lib/prisma";
import { unstable_cache } from "next/cache";

const getTotalSales = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return await db.sale.count({});
};

export default getTotalSales;

export const cachedGetTotalSales = unstable_cache(
  getTotalSales,
  ["getTotalSales"],
  {
    tags: ["get-total-sales"],
    revalidate: 60,
  },
);
