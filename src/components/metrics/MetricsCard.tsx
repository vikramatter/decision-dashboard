import React from 'react';

interface MetricsCardProps {
  title: string;
  value: number;


}

export const MetricsCard: React.FC<MetricsCardProps> = ({ title, value }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm">
      <h3 className="text-sm font-medium text-slate-500 mb-1">{title}</h3>
      <div className="flex items-end justify-between">
        <div className="text-2xl font-semibold">
          {value.toLocaleString(undefined, { 
            maximumFractionDigits: 2,
            minimumFractionDigits: value % 1 === 0 ? 0 : 2
          })}
        </div>
        
        
      </div>
    </div>
  );
};