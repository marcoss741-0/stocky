import { Product } from "@prisma/client";
import { db } from "../../_lib/prisma";

const queryProduct = async (): Promise<Product[]> => {
  return await db.product.findMany({});
};

export default queryProduct;
