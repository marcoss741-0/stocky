import { Product } from "@prisma/client";
import { db } from "../../_lib/prisma";
import { unstable_cache } from "next/cache";

export const queryProduct = async (): Promise<Product[]> => {
  return await db.product.findMany({});
};

export const cachedGetProducts = unstable_cache(
  queryProduct,
  ["queryProduct"],
  {
    tags: ["get-products"],
    revalidate: 60,
  },
);
