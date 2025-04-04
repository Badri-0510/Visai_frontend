import React, { useState } from "react";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import { MdCategory, MdOutlineLeaderboard } from "react-icons/md";
import { BiGitBranch } from "react-icons/bi";
import { RiShoppingCartFill } from "react-icons/ri";

export default function ClusterItem() {
  const [productId, setProductId] = useState(""); 
  const [clusterData, setClusterData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClusterData = async () => {
    if (!productId.trim()) {
      setError("⚠️ Please enter a valid Product ID.");
      return;
    }

    setLoading(true);
    setError(null);
    setClusterData(null);

    try {
      const response = await axios.get(`http://localhost:8081/api/analysis/cluster/${productId}`);
      setClusterData(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.response?.status === 404 ? "❌ Product not found." : "⚠️ Failed to load cluster data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") fetchClusterData();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-blue-500 p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">📊 Product Sales Clustering</h1>

      {/* Search Input */}
      <div className="flex items-center space-x-3 mb-6 bg-white shadow-md rounded-lg p-2">
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter Product ID..."
          className="p-3 text-lg border-none outline-none rounded-lg flex-1 bg-transparent"
        />
        <button
          onClick={fetchClusterData}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg flex items-center gap-2 font-medium hover:bg-blue-700 transition disabled:bg-gray-400"
          disabled={loading}
        >
          <AiOutlineSearch size={20} />
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Display Messages */}
      {loading && <div className="text-gray-800 animate-pulse">🔄 Searching for product...</div>}
      {error && <div className="text-red-600 font-semibold">{error}</div>}

      {/* Cluster Data - Beautiful Card */}
      {clusterData && (
        <div className="bg-white bg-opacity-80 backdrop-blur-md shadow-xl rounded-lg p-6 w-full max-w-xl border-l-4 border-blue-500">
          {/* Card Header */}
          <div className="bg-blue-500 text-white p-4 rounded-t-lg text-center">
            <h2 className="text-2xl font-bold">{clusterData.product_name}</h2>
            <p className="text-sm opacity-80">Product ID: {clusterData.product_id}</p>
          </div>

          {/* Card Content */}
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <MdCategory size={24} className="text-blue-600" />
              <p className="text-lg font-medium">Category: <span className="font-bold">{clusterData.category}</span></p>
            </div>
            <div className="flex items-center gap-3">
              <BiGitBranch size={24} className="text-green-600" />
              <p className="text-lg font-medium">Cluster ID: <span className="font-bold">{clusterData.cluster}</span></p>
            </div>
            <div className="flex items-center gap-3">
              <MdOutlineLeaderboard size={24} className="text-purple-600" />
              <p className="text-lg font-medium">Department ID: <span className="font-bold">{clusterData.dept_id}</span></p>
            </div>
            <div className="flex items-center gap-3">
              <RiShoppingCartFill size={24} className="text-red-600" />
              <p className="text-lg font-medium">Sales Count: <span className="font-bold">{clusterData.sales_count}</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
