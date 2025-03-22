"use client";

import { ColumnDef } from "@tanstack/react-table";

import formatCurrency from "@/app/_helpers/currency";
import { dateFormat } from "@/app/_helpers/date-format";
import { SalesDTO } from "@/app/data-access/sales/query-sales";
import UpsertSaleDropdownMenu from "./upsert-sale-dropdown-menu";

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
    cell: ({ row: { original: currentSale } }) => (
      <UpsertSaleDropdownMenu sale={currentSale} />
    ),
  },
];

export default saleTableColumns;
