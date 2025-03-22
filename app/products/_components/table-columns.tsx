"use client";

import { Badge } from "@/app/_components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { CircleDashedIcon } from "lucide-react";

import TableDropdownMenu from "./table-dropdown-menu";
import formatCurrency from "@/app/_helpers/currency";
import { ProductDTO } from "@/app/data-access/product/query-product";

export const tableProducts: ColumnDef<ProductDTO>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: (row) => formatCurrency(Number(row.row.original.price)),
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
      const label = product.stock <= 0 ? "Fora de estoque" : "Em estoque";

      return (
        <Badge
          className="w-fit gap-1"
          variant={product.stock <= 0 ? "outline" : "default"}
        >
          <CircleDashedIcon size={16} />
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: (row) => <TableDropdownMenu row={row.row.original} />,
  },
];
