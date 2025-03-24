"use server";

import Header from "../_components/header";
import { ComboboxOption } from "../_components/ui/combobox";
import { DataTable } from "../_components/ui/data-table";
import { queryProduct } from "../data-access/product/query-product";
import { cachedGetSales } from "../data-access/sales/query-sales";
import CreateSalesButton from "./_components/create-sales-button";
import saleTableColumns from "./_components/table-columns";

const Sales = async () => {
  const products = await queryProduct();
  const sales = await cachedGetSales();
  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));

  const tableData = sales.map((sale) => ({
    ...sale,
    products,
    productsOptions: productOptions,
  }));

  return (
    <>
      <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8 shadow">
        <Header
          title="Vendas"
          subtitle="Gerencie suas vendas"
          rightButton={
            <CreateSalesButton
              productOptions={productOptions}
              products={products}
            />
          }
        />

        <DataTable columns={saleTableColumns} data={tableData} />
      </div>
    </>
  );
};

export default Sales;
