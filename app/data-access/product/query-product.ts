import { Product } from "@prisma/client";
import { db } from "../../_lib/prisma";
import { unstable_cache } from "next/cache";

export interface ProductDTO extends Product {
  status: "Em estoque" | "Fora de estoque";
}

export const queryProduct = async (): Promise<ProductDTO[]> => {
  const products = await db.product.findMany({});

  return products.map((product) => {
    return {
      ...product,
      status: product.stock <= 0 ? "Fora de estoque" : "Em estoque",
    };
  });
};

export const cachedGetProducts = unstable_cache(
  queryProduct,
  ["queryProduct"],
  {
    tags: ["get-products"],
    revalidate: 60,
  },
);
