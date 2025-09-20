import React from 'react';
import { DashboardData } from '@/lib/data';
import { StatCard } from "./stat-card"
import { ChartBarStacked } from './mini-bar-chart';
import { RevenueAreaChart } from './revenue-area-chart';
import { RevenueByLocation } from './revenue-by-location';
import { ChartPieDonut } from './donut';

type ResultProps = {
  data: DashboardData;
};

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
      <div className="col-span-1 md:col-span-2 row-span-2">
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
      <div className="col-span-1 md:col-span-2 lg:col-span-3 row-span-2">
        <RevenueAreaChart data={data.revenueWeekly} />
      </div>

      {/* Revenue by location */}
      <div className="col-span-1 row-span-2">
        <RevenueByLocation locations={data.revenueByLocation.locations} />
      </div>

      {/* Total Sales donut */}
      <div className="col-span-1 row-span-2 lg:hidden">
        {/* <Donut segments={data.totalSales.segments} /> */}
        <ChartPieDonut segments={data.totalSales.segments} />
      </div>

      {/* Top Selling Products */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 row-span-2">
        <TopSellingTable rows={data.topSellingProducts} />
      </div>

      {/* Total Sales donut */}
      <div className="col-span-1 row-span-2 hidden lg:block">
        {/* <Donut segments={data.totalSales.segments} /> */}
        <ChartPieDonut segments={data.totalSales.segments} />
      </div>
    </div>
  );
};

export default Result;