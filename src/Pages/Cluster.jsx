import React from "react";
import ClusterChart from "../Components/charts/ClusterChart";

export default function Cluster() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Product Sales Clustering</h1>
      <p className="text-lg text-gray-600 max-w-2xl text-center mb-6">
        This scatter chart visualizes products based on their sales performance, categorizing them into 
        <span className="text-orange-500 font-semibold"> Mid Selling</span>, 
        <span className="text-green-600 font-semibold"> High Selling</span>, and 
        <span className="text-red-500 font-semibold"> Slow Selling</span> clusters.
      </p>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <ClusterChart />
      </div>
    </div>
  );
}
