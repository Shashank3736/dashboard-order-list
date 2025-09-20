import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import React from "react";

interface RevenueByLocationProps {
  locations: Array<{ city: string; amount: number }>;
}

export const RevenueByLocation:React.FC<RevenueByLocationProps> = ({ locations }) => {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm w-full h-full">
      <p className="font-medium">Revenue by Location</p>
      <Image src={'/worldmap.png'} alt="world map" width={154} height={82} className="w-full" />
      <div className="mt-4 space-y-3">
        {locations.map((l) => (
          <div key={l.city} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm">{l.city}</span>
              <span className="text-sm">{l.amount}K</span>
            </div>
            <Progress value={l.amount} />
          </div>
        ))}
      </div>
    </div>
  );
};