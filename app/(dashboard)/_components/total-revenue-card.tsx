import formatCurrency from "@/app/_helpers/currency";
import getTotalRevenue from "@/app/data-access/dashboard/get-total-revenue";
import { DollarSignIcon } from "lucide-react";
import SummaryCards, {
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-cards";

const TotalRevenueCard = async () => {
  const totalRevenueValue = await getTotalRevenue();
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
