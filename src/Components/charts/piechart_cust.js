import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ endpoint, title }) => {
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

        // Map category "1" to "Grocery" and "2" to "Stationary"
        const categories = data.map((item) =>
          item.category === "1" ? "Grocery" : "Stationary"
        );
        const totalSalesData = data.map((item) => item.totalSales); // Values: total sales

        setChartData({
          labels: categories,
          datasets: [
            {
              label: title,
              data: totalSalesData,
              backgroundColor: [
                "rgba(75, 192, 192, 0.5)",
                "rgba(153, 102, 255, 0.5)",
                "rgba(255, 159, 64, 0.5)",
                "rgba(54, 162, 235, 0.5)",
                "rgba(255, 99, 132, 0.5)",
              ], // You can add more colors if you have more categories
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 99, 132, 1)",
              ], // Matching border color
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching pie chart data:", error);
      });
  }, [endpoint, title]);

  return (
    <div
      style={{
        width: "50%",
        margin: "10px",
        background: "#ffffff",
        padding: "15px",
        borderRadius: "15px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
    
      }}
    >
      <Pie
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: title,
              color: "#003366",
              margin: "5px", // Title color
              font: {
                size: 18, // Medium font size
                weight: "bold", // Bold font
              },
            },
          },
        }}
      />
    </div>
  );
};

export default PieChart;
