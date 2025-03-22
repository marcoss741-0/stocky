import { z } from "zod";

export const DeleteSaleSchema = z.object({
  id: z.string().uuid(),
});
