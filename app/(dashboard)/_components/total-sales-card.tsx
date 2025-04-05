import { BadgeDollarSign } from "lucide-react";
import SummaryCards, {
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-cards";
import cachedGetTotalSales from "@/app/data-access/dashboard/get-total-sales";
import { revalidateTag } from "next/cache";

const TotalSalesCard = async () => {
  const totalSales = await cachedGetTotalSales();
  revalidateTag("get-total-sales");
  return (
    <>
      <SummaryCards>
        <SummaryCardIcon>
          <BadgeDollarSign size={20} />
        </SummaryCardIcon>
        <SummaryCardTitle>Vendas Totais</SummaryCardTitle>
        <SummaryCardValue>{totalSales}</SummaryCardValue>
      </SummaryCards>
    </>
  );
};

export default TotalSalesCard;
