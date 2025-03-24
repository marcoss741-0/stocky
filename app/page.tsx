"use client";

import { BarChart, CartesianGrid, XAxis } from "recharts";
import { Bar } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./_components/ui/card";

import { ChartConfig, ChartContainer } from "@/app/_components/ui/chart";
import { Button } from "./_components/ui/button";
import {
  BellRing,
  Check,
  CircleDollarSign,
  DollarSign,
  PackageCheckIcon,
  ShoppingCart,
} from "lucide-react";
import { cn } from "./_lib/utils";
import { Switch } from "./_components/ui/switch";
import Header from "./_components/header";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#00A180",
  },
} satisfies ChartConfig;

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

type CardProps = React.ComponentProps<typeof Card>;

const Home = ({ className, ...props }: CardProps) => {
  return (
    <>
      <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8 shadow">
        <Header title="Dashboard" subtitle="Últimos 30 dias" />

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>
                <DollarSign />
              </CardTitle>
              <CardDescription>Receita Total</CardDescription>
            </CardHeader>
            <CardContent>
              <h1 className="text-2xl font-bold">R$ 1.200,00</h1>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <DollarSign />
              </CardTitle>
              <CardDescription>Receitas Hoje</CardDescription>
            </CardHeader>
            <CardContent>
              <h1 className="text-2xl font-bold">R$ 300,00</h1>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card className="h-[144px]">
            <CardHeader>
              <CardTitle>
                <CircleDollarSign />
              </CardTitle>
              <CardDescription>Vendas Totais</CardDescription>
            </CardHeader>
            <CardContent>
              <h1 className="text-2xl font-bold">1.040</h1>
            </CardContent>
          </Card>

          <Card className="h-[144px]">
            <CardHeader>
              <CardTitle>
                <PackageCheckIcon />
              </CardTitle>
              <CardDescription>Total em estoque</CardDescription>
            </CardHeader>
            <CardContent>
              <h1 className="text-2xl font-bold">29.000</h1>
            </CardContent>
          </Card>

          <Card className="h-[144px]">
            <CardHeader>
              <CardTitle>
                <ShoppingCart />
              </CardTitle>
              <CardDescription>Produtos</CardDescription>
            </CardHeader>
            <CardContent>
              <h1 className="text-2xl font-bold">300</h1>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between">
          <ChartContainer config={chartConfig} className="h-[250px] w-[732px]">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 12)}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            </BarChart>
          </ChartContainer>
          <div>
            <Card className={cn("w-[380px]", className)} {...props}>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>You have 3 unread messages.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center space-x-4 rounded-md border p-4">
                  <BellRing />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm leading-none font-medium">
                      Push Notifications
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Send notifications to device.
                    </p>
                  </div>
                  <Switch />
                </div>
                <div>
                  {notifications.map((notification, index) => (
                    <div
                      key={index}
                      className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                    >
                      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                      <div className="space-y-1">
                        <p className="text-sm leading-none font-medium">
                          {notification.title}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {notification.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Check /> Mark all as read
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
