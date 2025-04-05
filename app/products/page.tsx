import { DataTable } from "../_components/ui/data-table";
import { tableProducts } from "./_components/table-columns";
import { cachedGetProducts } from "../data-access/product/query-product";
import AddProductsButton from "./_components/add-products-button";
import Header from "../_components/header";

const ProductsPage = async () => {
  const products = await cachedGetProducts();
  return (
    <div className="m-8 w-full space-y-8 overflow-auto rounded-lg bg-white p-8 shadow">
      <Header
        title="Produtos"
        subtitle="Gerencie seus produtos"
        rightButton={<AddProductsButton />}
      />

      <DataTable
        columns={tableProducts}
        data={JSON.parse(JSON.stringify(products))}
      />
    </div>
  );
};

export default ProductsPage;
