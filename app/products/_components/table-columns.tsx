"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const tableProducts: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Preço",
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const product = row.row.original;
      const label = product.stock <= 0 ? "Em Falta" : "Em Estoque";

      return (
        <Badge
          className="w-fit"
          variant={product.stock <= 0 ? "default" : "outline"}
        >
          <li>{label}</li>
        </Badge>
      );
    },
  },
];

const TableColumns = () => {
  return <div></div>;
};

export default TableColumns;
