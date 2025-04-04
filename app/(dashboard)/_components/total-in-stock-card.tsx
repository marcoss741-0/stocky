import { PackageCheck } from "lucide-react";
import SummaryCards, {
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-cards";
import getTotalInStock from "@/app/data-access/dashboard/get-total-in-stock";

const TotalInStockCard = async () => {
  const totalStock = await getTotalInStock(); // Replace with actual data fetching logic
  return (
    <>
      <SummaryCards>
        <SummaryCardIcon>
          <PackageCheck size={20} />
        </SummaryCardIcon>
        <SummaryCardTitle>Total em estoque</SummaryCardTitle>
        <SummaryCardValue>{totalStock}</SummaryCardValue>
      </SummaryCards>
    </>
  );
};

export default TotalInStockCard;
