"use server";

import Header from "../_components/header";
import formatCurrency from "../_helpers/currency";
import { cachedGetDashboard } from "../data-access/dashboard/query-dashboard";
import MostSoldProductItem from "./_components/most-sold-product-item";
import RevenueChart from "./_components/revenue-chart";
import SummaryCards, {
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./_components/summary-cards";
import {
  BadgeDollarSign,
  DollarSignIcon,
  PackageCheck,
  ShoppingCart,
} from "lucide-react";

const Home = async () => {
  const {
    todayRevenue,
    totalProducts,
    totalSales,
    totalStock,
    totalRevenue,
    totalRevenue14LastDays,
    mostSoldProducts,
  } = await cachedGetDashboard();

  return (
    <>
      <div className="m-8 flex w-full flex-col space-y-8 rounded-lg bg-white p-8 shadow">
        <Header title="Dashboard" subtitle="Últimos 30 dias" />
        <div className="grid grid-cols-2 gap-6">
          <SummaryCards>
            <SummaryCardIcon>
              <DollarSignIcon size={20} />
            </SummaryCardIcon>
            <SummaryCardTitle>Receita Total</SummaryCardTitle>
            <SummaryCardValue>{formatCurrency(totalRevenue)}</SummaryCardValue>
          </SummaryCards>

          <SummaryCards>
            <SummaryCardIcon>
              <DollarSignIcon size={20} />
            </SummaryCardIcon>
            <SummaryCardTitle>Receita Hoje</SummaryCardTitle>
            <SummaryCardValue>{formatCurrency(todayRevenue)}</SummaryCardValue>
          </SummaryCards>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <SummaryCards>
            <SummaryCardIcon>
              <BadgeDollarSign size={20} />
            </SummaryCardIcon>
            <SummaryCardTitle>Vendas Totais</SummaryCardTitle>
            <SummaryCardValue>{totalSales}</SummaryCardValue>
          </SummaryCards>
          <SummaryCards>
            <SummaryCardIcon>
              <PackageCheck size={20} />
            </SummaryCardIcon>
            <SummaryCardTitle>Total em estoque</SummaryCardTitle>
            <SummaryCardValue>{totalStock}</SummaryCardValue>
          </SummaryCards>
          <SummaryCards>
            <SummaryCardIcon>
              <ShoppingCart size={20} />
            </SummaryCardIcon>
            <SummaryCardTitle>Produtos</SummaryCardTitle>
            <SummaryCardValue>{totalProducts}</SummaryCardValue>
          </SummaryCards>
        </div>

        <div className="grid h-[350px] min-h-0 grid-cols-[2fr_1fr] gap-6">
          <div className="flex h-full flex-col space-y-1 overflow-hidden rounded-xl bg-slate-100 p-6">
            <span className="text-xs text-[#00A180]">Últimos 14 dias</span>
            <h1 className="text-3xl font-semibold text-slate-900">Receita</h1>
            <RevenueChart data={totalRevenue14LastDays} />
          </div>

          <div className="flex h-full flex-col space-y-4 overflow-hidden rounded-xl bg-slate-100 p-6">
            <h2 className="text-xl font-normal text-slate-500">
              Produtos mais vendidos
            </h2>
            <div className="space-y-7 overflow-y-auto">
              {mostSoldProducts.map((product) => (
                <MostSoldProductItem key={product.id} products={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
