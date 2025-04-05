import cachedGetMostSoldProducts from "@/app/data-access/dashboard/get-most-sold-products";
import MostSoldProductItem, {
  MostSoldProductItemSkeleton,
} from "./most-sold-product-item";
import { Skeleton } from "@/app/_components/ui/skeleton";

const MostSoldProductsCard = async () => {
  const mostSoldProducts = await cachedGetMostSoldProducts(); // Assuming this is a function that fetches the most sold products
  return (
    <>
      <div className="flex h-full flex-col space-y-4 overflow-hidden rounded-xl bg-slate-100 p-6">
        <h2 className="text-xl font-normal text-slate-500">
          Produtos mais vendidos
        </h2>
        <div className="space-y-7 overflow-y-auto">
          {mostSoldProducts.map((product) => (
            <MostSoldProductItem key={product.id} products={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export const MostSoldProductsSkeleton = () => {
  return (
    <Skeleton className="bg-white p-6">
      <div className="space-y-2">
        <div className="h-5 w-[86.26px] rounded-md bg-gray-200" />
        <div className="h-4 w-48 rounded-md bg-gray-200" />
        <MostSoldProductItemSkeleton />
        <MostSoldProductItemSkeleton />
      </div>
    </Skeleton>
  );
};

export default MostSoldProductsCard;
