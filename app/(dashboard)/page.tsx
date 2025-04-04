"use server";

import Header from "../_components/header";
import TotalRevenueCard from "./_components/total-revenue-card";
import TodayRevenueCard from "./_components/today-revenue-card";
import TotalSalesCard from "./_components/total-sales-card";
import TotalInStockCard from "./_components/total-in-stock-card";
import TotalProductsCard from "./_components/total-products-card";
import MostSoldProductsCard from "./_components/most-sold-products-card";
import Last14DaysRevenueCard from "./_components/last-14-days-revenue-card";

const Home = async () => {
  return (
    <>
      <div className="m-8 flex w-full flex-col space-y-8 rounded-lg bg-white p-8 shadow">
        <Header title="Dashboard" subtitle="Últimos 30 dias" />
        <div className="grid grid-cols-2 gap-6">
          <TotalRevenueCard />

          <TodayRevenueCard />
        </div>
        <div className="grid grid-cols-3 gap-6">
          <TotalSalesCard />

          <TotalInStockCard />

          <TotalProductsCard />
        </div>

        <div className="grid h-[350px] min-h-0 grid-cols-[2fr_1fr] gap-6">
          <Last14DaysRevenueCard />

          <MostSoldProductsCard />
        </div>
      </div>
    </>
  );
};

export default Home;
