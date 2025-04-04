import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ScatterPlot = ({ data = [] }) => {
  if (!Array.isArray(data)) {
    console.error("ScatterPlot received invalid data:", data);
    return <p>Error: Data format is incorrect!</p>;
  }

  const clusterColors = {
    1: "#FF5733", // Red
    2: "#33FF57", // Green
    3: "#3357FF", // Blue
  };

  // Map product names to numeric X values
  const uniqueProducts = [...new Set(data.map(item => item.product_name))];
  const productMapping = Object.fromEntries(uniqueProducts.map((name, index) => [name, index + 1]));

  // Transform data to include the mapped X values
  const transformedData = data.map(item => ({
    ...item,
    xValue: productMapping[item.product_name], // Assign numeric X position
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart>
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="xValue"
          name="Product"
          domain={[0, uniqueProducts.length + 1]}
          tickFormatter={(tick) => uniqueProducts[tick - 1] || ""}
        />
        <YAxis type="number" dataKey="sales_count" name="Sales Count" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />

        {[1, 2, 3].map((cluster) => (
          <Scatter
            key={cluster}
            name={`Cluster ${cluster}`}
            data={transformedData.filter((item) => item.cluster === cluster)}
            fill={clusterColors[cluster]}
          />
        ))}
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterPlot;
