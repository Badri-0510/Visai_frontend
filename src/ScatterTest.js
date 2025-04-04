import React from "react";
import ScatterPlot from "./Components/charts/ScatterPlot";

const ScatterTest = () => {
  const jsonData = [
    { category: "High Selling", cluster: 1, dept_id: 4, product_id: "24852", product_name: "Banana", sales_count: 50580 },
    { category: "High Selling", cluster: 2, dept_id: 6, product_id: "13176", product_name: "Apple", sales_count: 40230 },
    { category: "Low Selling", cluster: 3, dept_id: 7, product_id: "21137", product_name: "Orange", sales_count: 15000 }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Scatter Plot Testing Page</h2>
      <ScatterPlot data={jsonData} />
    </div>
  );
};

export default ScatterTest;
