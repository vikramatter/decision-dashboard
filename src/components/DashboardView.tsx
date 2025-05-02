import React from 'react';
import { Workflow } from '../store/workflowsSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { MetricsCard } from './metrics/MetricsCard';
import { DashboardHeader } from './metrics/DashboardHeader';
import {MetricsChart} from './metrics/MetricsChart';
import {OutcomeChart} from './metrics/OutcomeChart';

interface DashboardViewProps {
  workflows: Workflow[];
}
const outcomeData=[
  { option: "Option A", successRate: 60 },
  { option: "Option B", successRate: 40 },
  { option: "Option C", successRate: 25 },
]
export const DashboardView: React.FC<DashboardViewProps> = ({ workflows }) => {
  const { metrics } = useSelector((state: RootState) => state.metrics);
  
  return (
    <div className="space-y-6">
      <DashboardHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.slice(0, 3).map((metric) => (
          <MetricsCard
            key={metric.id}
            title={metric.name}
            value={metric.value}
            
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Revenue Trends </h3>
          <MetricsChart
         
            data={metrics[0].timeSeriesData}
            color="#3B82F6"
            dataKey="value"
          />
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Decision Outcomes</h3>
          <OutcomeChart

         outcomeData={outcomeData}
            color="#F97316"
            dataKey="value"
          />
        </div>
      </div>
      
      
    </div>
  );
};