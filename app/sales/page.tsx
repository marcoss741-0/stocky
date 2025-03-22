"use server";

import { ComboboxOption } from "../_components/ui/combobox";
import { DataTable } from "../_components/ui/data-table";
import { queryProduct } from "../data-access/product/query-product";
import { cachedGetSales } from "../data-access/sales/query-sales";
import CreateSalesButton from "./_components/create-sales-button";
import saleTableColumns from "./_components/table-columns";

const Sales = async () => {
  const products = await queryProduct();
  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));

  const sales = await cachedGetSales();

  return (
    <>
      <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8 shadow">
        <div className="flex w-full items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-[#00A180]">Vendas Realizadas</span>
            <h1 className="text-3xl font-bold text-slate-900">
              Gestão de Vendas
            </h1>
          </div>
          <CreateSalesButton
            productOptions={productOptions}
            products={products}
          />
        </div>

        <DataTable
          columns={saleTableColumns}
          data={JSON.parse(JSON.stringify(sales))}
        />
      </div>
    </>
  );
};

export default Sales;
