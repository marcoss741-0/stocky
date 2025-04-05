import ProductStatusBadge from "@/app/_components/product-status-badge";
import formatCurrency from "@/app/_helpers/currency";
import { MostSoldProductsDto } from "@/app/data-access/dashboard/get-most-sold-products";

interface MostSoldProductItemProps {
  products: MostSoldProductsDto;
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

export const MostSoldProductItemSkeleton = () => {
  return (
    <div className="flex items-center justify-between pt-5">
      <div className="space-y-2">
        <div className="h-[22px] w-[91.23px] rounded-md bg-gray-200" />
        <div className="h-6 w-[91.23px] rounded-md bg-gray-200" />
        <div className="h-6 w-[105px] rounded-md bg-gray-200" />
      </div>
      <div>
        <div className="h-5 w-[86.26px] rounded-md bg-gray-200" />
      </div>
    </div>
  );
};

export default MostSoldProductItem;
