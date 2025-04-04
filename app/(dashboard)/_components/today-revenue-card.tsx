import formatCurrency from "@/app/_helpers/currency";
import getTodayRevenue from "@/app/data-access/dashboard/get-today-revenue";
import { DollarSignIcon } from "lucide-react";
import SummaryCards, {
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-cards";

const TodayRevenueCard = async () => {
  const todayRevenueValue = await getTodayRevenue();

  return (
    <>
      <SummaryCards>
        <SummaryCardIcon>
          <DollarSignIcon size={20} />
        </SummaryCardIcon>
        <SummaryCardTitle>Receita Hoje</SummaryCardTitle>
        <SummaryCardValue>{formatCurrency(todayRevenueValue)}</SummaryCardValue>
      </SummaryCards>
    </>
  );
};

export default TodayRevenueCard;
