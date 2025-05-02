import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { TimeSeriesData } from '../../store/metricsSlice';
import { format } from 'date-fns';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface MetricsChartProps {
  data: TimeSeriesData[];
  color: string;
  dataKey: string;
}

export const MetricsChart: React.FC<MetricsChartProps> = ({ data, color, dataKey }) => {

  const labels = data.map((item) => format(new Date(item.timestamp), 'MMM d, h:mm a'));
  const values = data.map((item) => item.value);
  
  const chartData = {
    labels,
    datasets: [
      {
        label: dataKey,
        data: values,
        borderColor: color,
        backgroundColor: `${color}20`,
        tension: 0.4,
        fill: true,
        pointRadius: 2,
        pointBackgroundColor: color,
        pointBorderColor: 'white',
        pointBorderWidth: 1,
        pointHoverRadius: 4,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: '#f1f5f9',
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          font: {
            size: 10,
          },
        },
      },
    },
  };
  
  return (
    <div className="h-64">
      <Line data={chartData} options={options as any} />
    </div>
  );
};