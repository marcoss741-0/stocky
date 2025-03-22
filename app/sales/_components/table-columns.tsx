"use client";

import { ColumnDef } from "@tanstack/react-table";

import formatCurrency from "@/app/_helpers/currency";
import { dateFormat } from "@/app/_helpers/date-format";
import { Button } from "@/app/_components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { SalesDTO } from "@/app/data-access/sales/query-sales";

const saleTableColumns: ColumnDef<SalesDTO>[] = [
  {
    accessorKey: "productsName",
    header: "Produtos",
  },

  {
    accessorKey: "totalProducts",
    header: "Quantidade",
    cell: (row) => (
      <>
        <span>{row.row.original.totalProducts}</span>
      </>
    ),
  },
  {
    accessorKey: "totalValue",
    header: "Valor Total",
    cell: (row) => <span>{formatCurrency(row.row.original.totalValue)}</span>,
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({
      row: {
        original: { date },
      },
    }) => <span>{dateFormat(date)}</span>,
  },
  {
    header: "Ações",
    cell: () => (
      <Button variant="ghost">
        <MoreHorizontal size={16} />
      </Button>
    ),
  },
];

export default saleTableColumns;
