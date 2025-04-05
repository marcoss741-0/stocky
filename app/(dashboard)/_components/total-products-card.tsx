import { ShoppingCart } from "lucide-react";
import SummaryCards, {
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-cards";
import cachedGetTotalProducts from "@/app/data-access/dashboard/get-total-products";
import { revalidateTag } from "next/cache";

const TotalProductsCard = async () => {
  const totalProducts = await cachedGetTotalProducts();
  revalidateTag("get-total-products");

  return (
    <>
      <SummaryCards>
        <SummaryCardIcon>
          <ShoppingCart size={20} />
        </SummaryCardIcon>
        <SummaryCardTitle>Produtos</SummaryCardTitle>
        <SummaryCardValue>{totalProducts}</SummaryCardValue>
      </SummaryCards>
    </>
  );
};

export default TotalProductsCard;
