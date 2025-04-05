import { PackageCheck } from "lucide-react";
import SummaryCards, {
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-cards";
import cachedGetTotalInStock from "@/app/data-access/dashboard/get-total-in-stock";
import { revalidateTag } from "next/cache";

const TotalInStockCard = async () => {
  const totalStock = await cachedGetTotalInStock();
  revalidateTag("get-total-in-stock");

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
