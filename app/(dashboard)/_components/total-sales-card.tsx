import { BadgeDollarSign } from "lucide-react";
import SummaryCards, {
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-cards";
import getTotalSales from "@/app/data-access/dashboard/get-total-sales";

const TotalSalesCard = async () => {
  const totalSales = await getTotalSales();
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
