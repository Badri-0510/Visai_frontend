import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ endpoint, title }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Fetch data from the backend
    axios
      .get(endpoint)
      .then((response) => {
        const data = response.data;

        const labels = data.map((item) => item[0]); // Labels: days/months
        const salesData = data.map((item) => item[1]); // Values: total sales

        setChartData({
          labels: labels,
          datasets: [
            {
              label: title,
              data: salesData,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
              tension: 0.3,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching chart data:", error);
      });
  }, [endpoint, title]);

  return (
    <div
      style={{
        width: "50%",
        margin: "10px",
        background: "#ffffff",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
      }}
    >
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "bottom"},
            title: {
              display: true,
              text: title,
              color: "#0052cc", // Title color
              font: {
                size: 16, // Medium font size
                weight: "bold", // Bold font
              },
            },
          },
        }}
      />
    </div>
  );
};

export default LineChart;