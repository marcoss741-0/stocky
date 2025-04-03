import ProductStatusBadge from "@/app/_components/product-status-badge";
import formatCurrency from "@/app/_helpers/currency";
import { MostSoldProducts } from "@/app/data-access/dashboard/query-dashboard";

interface MostSoldProductItemProps {
  products: MostSoldProducts;
}

const MostSoldProductItem = ({ products }: MostSoldProductItemProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <ProductStatusBadge status={products.status} />

          <p className="text-[16px] font-semibold">{products.name}</p>
          <p className="text-sm text-slate-500">
            {formatCurrency(products.price)}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">
            {products.totalSold} Vendido(s)
          </p>
        </div>
      </div>
    </>
  );
};

export default MostSoldProductItem;
