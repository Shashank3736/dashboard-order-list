"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { DashboardData } from "@/lib/data"

interface RevenueAreaChartProps {
  data: DashboardData["revenueWeekly"]
}

export const RevenueAreaChart: React.FC<RevenueAreaChartProps> = ({ data }) => {
  const chartData = data.chartData.months.map((month, index) => ({
    month,
    currentWeek: data.chartData.currentWeekLine[index],
    previousWeek: data.chartData.previousWeekLine[index],
  }))
  
  const chartConfig = {
    currentWeek: {
      label: "Current Week",
      color: "var(--chart-1)",
    },
    previousWeek: {
      label: "Previous Week", 
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-6 text-lg font-medium">
          Revenue
          <div className="flex items-center gap-6 text-sm font-normal">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-chart-1"></div>
              <span>Current Week</span>
              <span className="font-medium">${data.currentWeek.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-chart-2"></div>
              <span>Previous Week</span>
              <span className="font-medium">${data.previousWeek.toLocaleString()}</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart
            data={chartData}
            margin={{
              left: 20,
              right: 20,
              top: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid 
              strokeDasharray="none" 
              stroke="hsl(var(--border))" 
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={16}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={16}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(value) => `${value}M`}
              domain={[0, 30]}
              ticks={[0, 10, 20, 30]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              dataKey="currentWeek"
              type="monotone"
              stroke="var(--color-currentWeek)"
              strokeWidth={2}
              dot={false}
              strokeDasharray="none"
            />
            <Line
              dataKey="previousWeek"
              type="monotone"
              stroke="var(--color-previousWeek)"
              strokeWidth={2}
              dot={false}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
