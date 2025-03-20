"use server";

import { PlusCircleIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { ComboboxOption } from "../_components/ui/combobox";
import { Sheet, SheetTrigger } from "../_components/ui/sheet";
import { queryProduct } from "../data-access/product/query-product";
import UpsertCheetDialog from "./_components/upsert-cheet-content";

const Sales = async () => {
  const products = await queryProduct();
  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));

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
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <PlusCircleIcon size={20} />
                Nova Venda
              </Button>
            </SheetTrigger>
            <UpsertCheetDialog products={products} data={productOptions} />
          </Sheet>
        </div>

        {/* <DataTable
          columns={tableProducts}
          data={JSON.parse(JSON.stringify(products))}
        /> */}
      </div>
    </>
  );
};

export default Sales;
