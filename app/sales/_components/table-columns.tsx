"use client";

import { ColumnDef } from "@tanstack/react-table";

import formatCurrency from "@/app/_helpers/currency";
import { dateFormat } from "@/app/_helpers/date-format";
import { SalesDTO } from "@/app/data-access/sales/query-sales";
import UpsertSaleDropdownMenu from "./upsert-sale-dropdown-menu";
import { ProductDTO } from "@/app/data-access/product/query-product";
import { ComboboxOption } from "@/app/_components/ui/combobox";

interface SaleTableColumnsProps extends SalesDTO {
  products: ProductDTO[];
  productsOptions: ComboboxOption[];
}

const saleTableColumns: ColumnDef<SaleTableColumnsProps>[] = [
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
      <UpsertSaleDropdownMenu
        sale={currentSale}
        products={currentSale.products}
        productsOptions={currentSale.productsOptions}
      />
    ),
  },
];

export default saleTableColumns;
