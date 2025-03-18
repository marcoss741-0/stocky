"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleDashedIcon } from "lucide-react";

import TableDropdownMenu from "./table-dropdown-menu";

export const tableProducts: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: (row) => {
      const product = row.row.original;
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(product.price));
    },
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

const TableColumns = () => {
  return <div></div>;
};

export default TableColumns;
