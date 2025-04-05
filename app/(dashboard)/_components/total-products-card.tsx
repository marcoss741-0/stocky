import { ShoppingCart } from "lucide-react";
import SummaryCards, {
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-cards";
import cachedGetTotalProducts from "@/app/data-access/dashboard/get-total-products";

const TotalProductsCard = async () => {
  const totalProducts = await cachedGetTotalProducts();
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
