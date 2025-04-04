"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import formatCurrency from "@/app/_helpers/currency";
import { DayTotalRevenue } from "@/app/data-access/dashboard/get-last-14-days-revenue";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

interface RevenueChartProps {
  data: DayTotalRevenue[];
}

const chartConfig: ChartConfig = {
  totalRevenue: {
    label: "Receita",
    color: "#50C878",
  },
} satisfies ChartConfig;

const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <>
      <ChartContainer config={chartConfig} className="min-h-0 w-full">
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            tickMargin={8}
            axisLine={false}
          />
          <ChartTooltip
            content={<ChartTooltipContent />}
            formatter={(x) => formatCurrency(Number(x))}
          />
          <Bar dataKey="totalRevenue" radius={4} className="fill-slate-900" />
        </BarChart>
      </ChartContainer>
    </>
  );
};

export default RevenueChart;
