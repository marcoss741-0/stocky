"use server";

import Header from "../_components/header";
import formatCurrency from "../_helpers/currency";
import { getDashboard } from "../data-access/dashboard/query-dashboard";
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
  } = await getDashboard();

  return (
    <>
      <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8 shadow">
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

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-1 rounded-xl bg-slate-100 p-6">
            <span className="text-xs text-[#00A180]">Últimos 14 dias</span>
            <h1 className="text-3xl font-semibold text-slate-900">Receita</h1>
            <RevenueChart data={totalRevenue14LastDays} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
