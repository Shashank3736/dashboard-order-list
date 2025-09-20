'use client';

import { getDashboardData } from "@/lib/actions";
import { DashboardData } from "@/lib/data";
import { useEffect, useState } from "react";
import Loading from "./_components/loading";
import Result from "./_components/result";

export default function Home() {
  const [data, setData] = useState<DashboardData>();

  useEffect(() => {
    getDashboardData().then(res => setData(res));
  },[])
  return (
    <main className="p-4">
      <p className="pb-4 font-medium">eCommerce</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
        {data ? (
          <Result data={data} />
        ): (
          <Loading />
        )}
      </div>
    </main>
  );
}
