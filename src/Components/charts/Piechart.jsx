import React from 'react';
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Legend,
  Tooltip,
  Title,
  ArcElement,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
// Register the required chart.js components
ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function PieChart() {
  // Configuration options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: 'Attendance Distribution',
        font: {
          size: 18,
        },
      },
    },
  };

  // Data for the chart
  const data = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        label: 'Attendance',
        data: [150, 50], // Example data (adjust based on requirements)
        backgroundColor: ['rgba(54, 162, 235, 0.7)', 'rgba(255, 99, 132, 0.7)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return <Pie options={options} data={data} />;
}
