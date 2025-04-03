import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register the necessary Chart.js components
ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function ProductAnalytics() {
  const [subcategoryId, setSubcategoryId] = useState('');
  const [analysisData, setAnalysisData] = useState([]);
  const [marginData, setMarginData] = useState([]);

  // Function to handle subcategory selection
  const handleSubcategoryChange = (e) => {
    const subcategory = e.target.value;
    setSubcategoryId(subcategory);

    // Fetch product analysis and margin data
    fetchProductAnalysis(subcategory);
    fetchProductMargin(subcategory);
  };

  // Fetch product analysis data
  const fetchProductAnalysis = async (subcategory) => {
    try {
      const response = await axios.get(`http://localhost:8081/api/analysis/subcategory/${subcategory}`);
      setAnalysisData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching product analysis data:', error);
    }
  };

  // Fetch product margin data
  const fetchProductMargin = async (subcategory) => {
    try {
      const response = await axios.get(`http://localhost:8081/api/analysis/submargin/${subcategory}`);
      setMarginData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching product margin data:', error);
    }
  };

  // Prepare data for the bar charts
  const prepareChartData = (data, type) => {
    const labels = data.map(item => item.name);  // Get the names of the products
    const values = data.map(item => type === 'purchase' ? item.totalQuantity : item.totalMargin); // Map to either purchase quantity or profit

    return {
      labels,
      datasets: [
        {
          label: type === 'purchase' ? 'Purchase Quantity' : 'Profit',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.5)', // Light teal color
          borderColor: 'rgba(75, 192, 192, 1)', // Darker teal color for border
          borderWidth: 1,
        }
      ],
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {},
      title: {
        display: true,
        
      },
    },
  };

  return (
    <div>
      <h2
        style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#FDFDFD',
          marginBottom: '30px',
        }}
      >
        Product Analytics
      </h2>
  
      {/* Subcategory Selection Input */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center', // Horizontally center the dropdown
          marginBottom: '30px', // Add some space below
        }}
      >
        <select
          onChange={handleSubcategoryChange}
          style={{
            padding: '10px 15px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            backgroundColor: '#f4f6f9',
            color: '#333',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            width: '200px',
            transition: '0.3s',
          }}
        >
          <option value="">Select Subcategory</option>
          <option value="101">Soap</option>
          <option value="102">Atta</option>
          <option value="103">Salt</option>
          <option value="104">Oil</option>
          <option value="105">Beverages</option>
          <option value="201">Pen</option>
          <option value="203">Notebook</option>
          <option value="204">Sketch Pens</option>
        </select>
      </div>
  
      {/* Graph Section */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        {/* Graph 1: Name vs Purchase Quantity */}
        {analysisData && analysisData.length > 0 && (
          <div
            style={{
              backgroundColor: '#FFFF',
              padding: '15px',
              marginBottom: '30px',
              borderRadius: '16px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              width: '80%',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <h3 style={{ fontWeight: 'bold', padding: 10 }}>Product vs Purchase Quantity</h3>
            </div>
            <Bar options={options} data={prepareChartData(analysisData, 'purchase')} />
          </div>
        )}
  
        {/* Graph 2: Name vs Profit */}
        {marginData && marginData.length > 0 && (
          <div
            style={{
              backgroundColor: '#FFFF',
              padding: '15px',
              borderRadius: '16px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              width: '80%',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <h3 style={{ fontWeight: 'bold', padding: 10 }}>Product vs Profit</h3>
            </div>
            <Bar options={options} data={prepareChartData(marginData, 'profit')} />
          </div>
        )}
      </div>
    </div>
  );
  
}
