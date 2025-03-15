import { DataTable } from "../_components/ui/data-table";
import { tableProducts } from "./_components/table-columns";
import queryProduct from "../data-access/product/query-product";
import AddProductsButton from "./_components/add-products-button";

const ProductsPage = async () => {
  const products = await queryProduct();
  return (
    <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8 shadow">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs text-[#00A180]">Gestão de Produtos</span>
          <h1 className="text-3xl font-bold text-slate-900">Produtos</h1>
        </div>
        <AddProductsButton />
      </div>

      <DataTable
        columns={tableProducts}
        data={JSON.parse(JSON.stringify(products))}
      />
    </div>
  );
};

export default ProductsPage;
