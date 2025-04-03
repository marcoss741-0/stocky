"use client";

import { ColumnDef } from "@tanstack/react-table";

import TableDropdownMenu from "./table-dropdown-menu";
import formatCurrency from "@/app/_helpers/currency";
import { ProductDTO } from "@/app/data-access/product/query-product";
import ProductStatusBadge from "@/app/_components/product-status-badge";

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
    cell: ({ row: { original: product } }) => {
      const label = product.stock <= 0 ? "Fora de estoque" : "Em estoque";

      return <ProductStatusBadge status={label} />;
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: (row) => <TableDropdownMenu row={row.row.original} />,
  },
];
