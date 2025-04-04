import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar2 from '../Components/SearchBar2';

export default function Frequent() {
  // const [data, setData] = useState({ combinations: [] });
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [colors, setColors] = useState([]);
  
  // Vibrant color combinations for gradients
  const vibrantGradients = [
    "from-pink-500 to-purple-300",
    "from-orange-500 to-yellow-300",
    "from-green-500 to-teal-300",
    "from-blue-500 to-indigo-300",
    "from-indigo-500 to-violet-300",
    "from-red-500 to-orange-300",
    "from-rose-500 to-pink-300",
    "from-emerald-500 to-green-300",
    "from-cyan-500 to-blue-300",
    "from-fuchsia-500 to-purple-300",
    "from-yellow-500 to-amber-300",
    "from-sky-500 to-cyan-300",
    "from-purple-500 to-indigo-300",
    "from-amber-500 to-orange-300",
    "from-lime-500 to-emerald-300"
  ];

  // Generate random color array when data loads
  useEffect(() => {
    if (data.combinations && data.combinations.length > 0) {
      const randomColors = data.combinations.map(() => {
        const randomIndex = Math.floor(Math.random() * vibrantGradients.length);
        return vibrantGradients[randomIndex];
      });
      setColors(randomColors);
    }
  }, [data.combinations]);

  // Fetch data from API
  useEffect(() => {
    // setLoading(true);
    // axios.get('/frequent')
    //   .then(response => {
    //     setData(response.data);
    //     setLoading(false);
    //   })
    //   .catch(err => {
    //     console.error('Error fetching product combinations:', err);
    //     setError('Failed to load product combinations');
    //     setLoading(false);
    //   });
    setData({
      "combinations": [
        {
          "confidence": 0.0431,
          "lift": 1.7147,
          "product_name": "Bartlett Pears",
          "support": 0.0116
        },
        {
          "confidence": 0.0967,
          "lift": 1.6342,
          "product_name": "Organic Fuji Apple",
          "support": 0.026
        },
        {
          "confidence": 0.0892,
          "lift": 1.5428,
          "product_name": "Honeycrisp Apple",
          "support": 0.024
        },
        {
          "confidence": 0.0507,
          "lift": 1.5064,
          "product_name": "Broccoli Crown",
          "support": 0.0136
        },
        {
          "confidence": 0.1096,
          "lift": 1.4994,
          "product_name": "Cucumber Kirby",
          "support": 0.0295
        }
      ]
    })
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center pt-10 p-4">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">Frequently Purchased Together</h1>
      
      <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-2xl mb-8">
        <SearchBar2 />
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center w-full p-12">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg shadow">
          {error}
        </div>
      ) : (
        <div className="w-full max-w-2xl">
          {data.combinations.map((item, index) => (
            <div 
              key={index} 
              className={`mb-4 p-6 rounded-xl shadow-lg bg-gradient-to-r ${colors[index] || "from-blue-500 to-blue-300"} transform transition-all duration-300 hover:scale-105`}
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-white">{item.product_name}</h2>
                <div className="bg-white bg-opacity-30 px-3 py-1 rounded-full text-white font-semibold">
                  Lift: {item.lift.toFixed(2)}
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                <div className="text-center">
                  <div className="bg-white bg-opacity-20 rounded-lg p-2 mb-1">
                    <span className="text-white font-bold text-lg">{(item.confidence * 100).toFixed(1)}%</span>
                  </div>
                  <p className="text-white text-sm">Confidence</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-white bg-opacity-20 rounded-lg p-2 mb-1">
                    <span className="text-white font-bold text-lg">{(item.support * 100).toFixed(1)}%</span>
                  </div>
                  <p className="text-white text-sm">Support</p>
                </div>
                
                <div className="text-center">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{Math.round(item.lift * 50)}%</span>
                    </div>
                    <svg className="absolute inset-0" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeDasharray={`${item.lift * 50}, 100`}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <p className="text-white text-sm">Correlation</p>
                </div>
              </div>
            </div>
          ))}
          
          {data.combinations.length === 0 && (
            <div className="bg-white p-8 rounded-xl shadow text-center">
              <p className="text-gray-600">No product combinations found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}