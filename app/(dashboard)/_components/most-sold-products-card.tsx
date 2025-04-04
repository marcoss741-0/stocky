import getMostSoldProducts from "@/app/data-access/dashboard/get-most-sold-products";
import MostSoldProductItem from "./most-sold-product-item";

const MostSoldProductsCard = async () => {
  const mostSoldProducts = await getMostSoldProducts(); // Assuming this is a function that fetches the most sold products
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

export default MostSoldProductsCard;
