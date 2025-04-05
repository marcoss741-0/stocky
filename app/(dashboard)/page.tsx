"use server";

import Header from "../_components/header";
import TotalRevenueCard from "./_components/total-revenue-card";
import TodayRevenueCard from "./_components/today-revenue-card";
import TotalSalesCard from "./_components/total-sales-card";
import TotalInStockCard from "./_components/total-in-stock-card";
import TotalProductsCard from "./_components/total-products-card";
import MostSoldProductsCard, {
  MostSoldProductsSkeleton,
} from "./_components/most-sold-products-card";
import Last14DaysRevenueCard from "./_components/last-14-days-revenue-card";
import { Suspense } from "react";
import { SummaryCardSkeleton } from "./_components/summary-cards";
import { Skeleton } from "../_components/ui/skeleton";

const Home = async () => {
  return (
    <>
      <div className="m-8 flex w-full flex-col space-y-8 rounded-lg bg-white p-8 shadow">
        <Header title="Dashboard" subtitle="Últimos 30 dias" />
        <div className="grid grid-cols-2 gap-6">
          <Suspense fallback={<SummaryCardSkeleton />}>
            <TotalRevenueCard />
          </Suspense>

          <Suspense fallback={<SummaryCardSkeleton />}>
            <TodayRevenueCard />
          </Suspense>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <Suspense fallback={<SummaryCardSkeleton />}>
            <TotalSalesCard />
          </Suspense>

          <Suspense fallback={<SummaryCardSkeleton />}>
            <TotalInStockCard />
          </Suspense>

          <Suspense fallback={<SummaryCardSkeleton />}>
            <TotalProductsCard />
          </Suspense>
        </div>

        <div className="grid h-[350px] min-h-0 grid-cols-[2fr_1fr] gap-6">
          <Suspense
            fallback={
              <Skeleton className="bg-white p-6">
                <div className="space-y-2">
                  <div className="h-5 w-[86.26px] rounded-md bg-gray-200" />
                  <div className="h-4 w-48 rounded-md bg-gray-200" />
                </div>
              </Skeleton>
            }
          >
            <Last14DaysRevenueCard />
          </Suspense>

          <Suspense fallback={<MostSoldProductsSkeleton />}>
            <MostSoldProductsCard />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Home;
