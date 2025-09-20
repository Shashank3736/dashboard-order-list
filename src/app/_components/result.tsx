import React from 'react';
import { DashboardData } from '@/lib/data';
import { StatCard } from "./stat-card"
import { ChartBarStacked } from './mini-bar-chart';
import { RevenueAreaChart } from './revenue-area-chart';
import { RevenueByLocation } from './revenue-by-location';

type ResultProps = {
  data: DashboardData;
};

/**
 * Lightweight widgets and SVG charts to visually match the provided dashboard.
 * This component renders multiple grid items that participate in the parent grid.
 * page.tsx wraps Result inside "grid grid-cols-4 grid-rows-4", so we use "contents"
 * to let each card act as a direct grid child.
 */

const TopSellingTable = ({
  rows,
}: {
  rows: Array<{ name: string; price: number; quantity: number; amount: number }>;
}) => {
  const money = (v: number) =>
    v.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm w-full h-full">
      <p className="pb-3 font-medium">Top Selling Products</p>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-muted-foreground">
            <tr className="border-b">
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Price</th>
              <th className="py-2 pr-4">Quantity</th>
              <th className="py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.name} className={i !== rows.length - 1 ? 'border-b' : ''}>
                <td className="py-3 pr-4">{r.name}</td>
                <td className="py-3 pr-4">{money(r.price)}</td>
                <td className="py-3 pr-4">{r.quantity}</td>
                <td className="py-3">{money(r.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Donut = ({ segments }: { segments: Array<{ type: string; amount: number }> }) => {
  const total = segments.reduce((a, b) => a + b.amount, 0);
  
  const colors = [
    '#7dd3fc',
    '#86efac',  
    '#a78bfa',
    '#1f2937',
  ] as const;
  
  const size = 200;
  const r = 75;
  const strokeWidth = 20;
  const c = 2 * Math.PI * r;

  let offset = 0;

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm w-full h-full">
      <h3 className="text-lg font-semibold mb-6">Total Sales</h3>
      <div className="flex flex-col items-center">
        {/* Donut Chart */}
        <div className="relative mb-6">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
            <g transform={`translate(${size / 2}, ${size / 2})`}>
              {segments.map((s, i) => {
                const portion = s.amount / total;
                const strokeDasharray = `${portion * c} ${c}`;
                const el = (
                  <circle
                    key={s.type}
                    r={r}
                    fill="none"
                    stroke={colors[i % colors.length]}
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={-offset}
                    transform="rotate(-90)"
                    strokeLinecap="round"
                  />
                );
                offset += portion * c;
                return el;
              })}
            </g>
          </svg>
        </div>
        
        {/* Legend */}
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
      </div>
    </div>
  );
};

const Result: React.FC<ResultProps> = ({ data }) => {
  return (
    <div className="contents">
      {/* Row 1 small stats */}
      <div className="col-span-1 row-span-1">
        <StatCard 
          title="Customers" 
          value={data.customers.total.toLocaleString()} 
          delta={data.customers.growth} 
          className='bg-primary-blue text-black' />
      </div>
      <div className="col-span-1 row-span-1">
        <StatCard title="Orders" value={data.orders.total.toLocaleString()} delta={data.orders.growth} />
      </div>

      {/* Projections vs Actuals top-right big card */}
      <div className="col-span-2 row-span-2">
        <ChartBarStacked data={data.projectionsVsActuals} />
      </div>

      <div className="col-span-1 row-span-1">
        <StatCard title="Revenue" value={`$${data.revenue.total.toLocaleString()}`} delta={data.revenue.growth} />
      </div>
      <div className="col-span-1 row-span-1">
        <StatCard 
        title="Growth" 
        value={`${data.growth.percentage}%`} 
        delta={data.growth.change} 
        className='bg-primary-purple text-black'
        />
      </div>

      {/* Revenue line chart - big wide card */}
      <div className="col-span-2 lg:col-span-3 row-span-2">
        <RevenueAreaChart data={data.revenueWeekly} />
      </div>

      {/* Revenue by location */}
      <div className="col-span-1 row-span-2">
        <RevenueByLocation locations={data.revenueByLocation.locations} />
      </div>

      {/* Top Selling Products */}
      <div className="col-span-2 lg:col-span-3 row-span-2">
        <TopSellingTable rows={data.topSellingProducts} />
      </div>

      {/* Total Sales donut */}
      <div className="col-span-1 row-span-2">
        <Donut segments={data.totalSales.segments} />
      </div>
    </div>
  );
};

export default Result;