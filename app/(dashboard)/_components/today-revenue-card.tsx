import formatCurrency from "@/app/_helpers/currency";
import cachedTodayRevenue from "@/app/data-access/dashboard/get-today-revenue";
import { DollarSignIcon } from "lucide-react";
import SummaryCards, {
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-cards";
import { revalidateTag } from "next/cache";

const TodayRevenueCard = async () => {
  const todayRevenueValue = await cachedTodayRevenue();
  revalidateTag("get-today-revenue");

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
