import React from 'react';

export const DashboardHeader: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-1">Decision Intelligence Overview</h2>
        <p className="text-sm text-slate-500">
          Monitor performance and analyze decision paths in real-time
        </p>
      </div>
      
    
    </div>
  );
};