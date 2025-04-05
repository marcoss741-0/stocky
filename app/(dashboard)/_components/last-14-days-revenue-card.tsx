import { cachedGetLast14DaysRevenue } from "@/app/data-access/dashboard/get-last-14-days-revenue";
import RevenueChart from "./revenue-chart";

const Last14DaysRevenueCard = async () => {
  const totalRevenue14LastDays = await cachedGetLast14DaysRevenue();
  return (
    <>
      <div className="flex h-full flex-col space-y-1 overflow-hidden rounded-xl bg-slate-100 p-6">
        <span className="text-xs text-[#00A180]">Últimos 14 dias</span>
        <h1 className="text-3xl font-semibold text-slate-900">Receita</h1>
        <RevenueChart data={totalRevenue14LastDays} />
      </div>
    </>
  );
};

export default Last14DaysRevenueCard;
