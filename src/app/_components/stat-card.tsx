import { cn } from '@/lib/utils';
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  delta: number;
  className?: string;
}

const UpwardArrowSVG = () => (
  <svg
    width="13"
    height="8"
    viewBox="0 0 13 8"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.45488 1.60777L13 0L11.6198 5.6061L9.89804 3.9532L7.12069 6.84627C7.02641 6.94448 6.89615 7 6.76 7C6.62385 7 6.49359 6.94448 6.39931 6.84627L4.36 4.72199L1.36069 7.84627C1.16946 8.04547 0.85294 8.05193 0.653735 7.86069C0.454529 7.66946 0.44807 7.35294 0.639307 7.15373L3.99931 3.65373C4.09359 3.55552 4.22385 3.5 4.36 3.5C4.49615 3.5 4.62641 3.55552 4.72069 3.65373L6.76 5.77801L9.17665 3.26067L7.45488 1.60777Z"
    />
  </svg>
);

const DownwardArrowSVG = () => (
  <svg
    width="13"
    height="9"
    viewBox="0 0 13 9"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.3463 0.639307C12.5455 0.830544 12.5519 1.14706 12.3607 1.34627L9.00069 4.84627C8.90641 4.94448 8.77615 5 8.64 5C8.50385 5 8.37359 4.94448 8.27931 4.84627L6.24 2.72199L3.82335 5.23933L5.54513 6.89223L0 8.5L1.38019 2.8939L3.10197 4.5468L5.87931 1.65373C5.97359 1.55552 6.10385 1.5 6.24 1.5C6.37615 1.5 6.50641 1.55552 6.60069 1.65373L8.64 3.77801L11.6393 0.653735C11.8305 0.454529 12.1471 0.44807 12.3463 0.639307Z"
    />
  </svg>
);

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  delta,
  className,
}) => {
  return (
    <div
      className={cn(
        'bg-card h-full w-full space-y-2 rounded-xl border p-8 shadow-sm',
        className
      )}
    >
      <p className="font-medium">{title}</p>
      <div className="flex gap-2">
        <p className="text-2xl font-bold">{value}</p>
        {delta > 0 ? (
          <span className="flex items-center justify-center gap-1 text-xs">
            +{delta}%
            <UpwardArrowSVG />
          </span>
        ) : (
          <span className="flex items-center justify-center gap-1 text-xs">
            {delta}%
            <DownwardArrowSVG />
          </span>
        )}
      </div>
    </div>
  );
};
