"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

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

interface BarProps {
  data: DashboardData["projectionsVsActuals"];
}

const chartConfig = {
  actual: {
    label: "Actual",
    color: "hsl(var(--chart-1))",
  },
  projection: {
    label: "Projection",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export const ChartBarStacked: React.FC<BarProps> = ({ data }) => {
  // Transform data for the chart - adjust values to match expected scale
  const chartData = data.months.map((month, index) => ({
    month,
    actual: data.values[index],
    projection: data.projectionValues[index] - data.values[index],
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projections vs Actual</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} barSize={20}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={true}
              tickMargin={10}
              domain={[0, 40]}
              tickFormatter={(value) => `${value}M`}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Bar
              dataKey="actual"
              stackId="a"
              fill="var(--chart-1)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="projection"
              stackId="a"
              fill="var(--chart-2)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
