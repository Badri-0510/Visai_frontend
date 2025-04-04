import React, { useEffect, useState } from "react";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const ClusterChart = () => {
  const [clusterData, setClusterData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8081/api/analysis/cluster-data")
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(item => ({
          product_id: item.product_id,
          sales_count: item.sales_count,
          cluster: item.Cluster
        }));
        setClusterData(formattedData);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  // Define colors for each cluster
  const clusterColors = {
    0: "#FFA500", // Mid Selling (Orange)
    1: "#008000", // High Selling (Green)
    2: "#FF0000"  // Slow Selling (Red)
  };

  // Split data into different clusters
  const midSelling = clusterData.filter(d => d.cluster === 0);
  const highSelling = clusterData.filter(d => d.cluster === 1);
  const slowSelling = clusterData.filter(d => d.cluster === 2);

  return (
    <ResponsiveContainer width={800} height={400}>
      <ScatterChart>
        <CartesianGrid />
        <XAxis type="number" dataKey="product_id" name="Product ID" />
        <YAxis type="number" dataKey="sales_count" name="Sales Count" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />

        {/* Scatter plots for each cluster */}
        <Scatter name="Mid Selling" data={midSelling} fill={clusterColors[0]} />
        <Scatter name="High Selling" data={highSelling} fill={clusterColors[1]} />
        <Scatter name="Slow Selling" data={slowSelling} fill={clusterColors[2]} />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ClusterChart;
