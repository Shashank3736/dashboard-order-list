"use client"

import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface ChartPieDonutProps {
  segments: { 
    type: string; 
    amount: number;
  }[];
}


export const ChartPieDonut:React.FC<ChartPieDonutProps> = ({ segments }) => {
  const colors: string[] = [
    '#7dd3fc',
    '#86efac',
    '#a78bfa',
    '#1f2937',
  ];

  const chartData = segments.map((segment) => ({
    segment: segment.type.toLowerCase(),
    amount: segment.amount,
    fill: `var(--color-${segment.type.toLowerCase()})`,
  }))
  
  const chartConfig = {
    amount: {
      label: "Sales ($K)",
    },
    direct: {
      label: "Direct",
      color: colors[0],
    },
    affiliate: {
      label: "Affiliate",
      color: colors[1],
    },
    sponsored: {
      label: "Sponsored",
      color: colors[2],
    },
    "e-mail": {
      label: "E-mail",
      color: colors[3],
    },
  } satisfies ChartConfig

  const totalValue = segments.reduce((sum, segment) => sum + segment.amount, 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Sales by Channel</CardTitle>
        <CardDescription>Sales distribution across channels</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 shrink">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[150px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent
                hideLabel 
                formatter={(value, name) => (
                    <span>
                    {String(name).charAt(0).toUpperCase() + String(name).slice(1)} {((Number(value) / totalValue) * 100).toFixed(2)}%
                    </span>
                )}
              />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="segment"
              innerRadius={30}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="space-y-3 w-full">
          {segments.map((s, i) => (
            <div key={s.type} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors[i % colors.length] }}
                />
                <span className="text-sm">{s.type}</span>
              </div>
              <span className="font-medium text-sm">
                ${s.amount.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}
