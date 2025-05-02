"use client"

import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { TimeSeriesData } from "../../store/metricsSlice";


// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface OutcomeChartProps {
  outcomeData: TimeSeriesData[];
    color: string;
    dataKey: string;
  }
export const OutcomeChart: React.FC<OutcomeChartProps> = ({ outcomeData, color, dataKey }) =>{
 

  const chartData = {
    labels: outcomeData.map((item) => item.option),
    datasets: [
      {
        label: "Success Rate",
        data: outcomeData.map((item) => item.successRate),
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(153, 102, 255, 0.6)", "rgba(255, 159, 64, 0.6)"],
        borderColor: ["rgb(75, 192, 192)", "rgb(153, 102, 255)", "rgb(255, 159, 64)"],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || ""
            if (label) {
              label += ": "
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + "%"
            }
            return label
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => value + "%",
        },
      },
    },
  }

  return (
    <div className="h-[300px] w-full">
      <Bar data={chartData} options={options} />
    </div>
  )
}
