import formatCurrency from "@/app/_helpers/currency";
import cachedGetTotalRevenue from "@/app/data-access/dashboard/get-total-revenue";
import { DollarSignIcon } from "lucide-react";
import SummaryCards, {
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-cards";
import { revalidateTag } from "next/cache";

const TotalRevenueCard = async () => {
  const totalRevenueValue = await cachedGetTotalRevenue();
  revalidateTag("get-total-revenue");

  return (
    <>
      <SummaryCards>
        <SummaryCardIcon>
          <DollarSignIcon size={20} />
        </SummaryCardIcon>
        <SummaryCardTitle>Receita Total</SummaryCardTitle>
        <SummaryCardValue>{formatCurrency(totalRevenueValue)}</SummaryCardValue>
      </SummaryCards>
    </>
  );
};

export default TotalRevenueCard;
