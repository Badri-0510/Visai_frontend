import React, { useState } from 'react';
import axios from 'axios';

export default function ProductCreate() {
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [name, setProductName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [margin, setMargin] = useState('');
  const [quantity, setQuantity] = useState('');

  // Handle category change
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setSubcategory(''); // Reset subcategory when category changes
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Construct the first three digits of pid based on category and subcategory
    let pidPrefix = '';
    if (category === 'grocery') {
      if (subcategory === 'soap') pidPrefix = '101';
      else if (subcategory === 'atta') pidPrefix = '102';
      else if (subcategory === 'salt') pidPrefix = '103';
      else if (subcategory === 'oil') pidPrefix = '104';
      else if (subcategory === 'beverages') pidPrefix = '105';
    } else if (category === 'stationary') {
      if (subcategory === 'pen') pidPrefix = '201';
      else if (subcategory === 'notebook') pidPrefix = '203';
      else if (subcategory === 'sketchPens') pidPrefix = '204';
    }

    // Ensure the pid is 6 digits (first three digits based on condition and last three digits > 300)
    const pid = pidPrefix + Math.floor(Math.random() * (999 - 301 + 1) + 301); // Random number between 301 and 999

    const productData = {
      pid,
      name,
      brand,
      price,
      margin,
      quantity,
    };

    // Send data to the server
    axios
      .post('http://localhost:8081/api/products/create', productData)
      .then((response) => {
        console.log('Product created successfully:', response.data);
      })
      .catch((error) => {
        console.error('There was an error creating the product:', error);
      });
  };

  return (
    <div className="w-2/3 flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Product</h2>
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-4">
            <label htmlFor="productName" className="block text-gray-700 font-medium mb-2">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Brand Name */}
          <div className="mb-4">
            <label htmlFor="brand" className="block text-gray-700 font-medium mb-2">
              Brand Name
            </label>
            <input
              type="text"
              id="brand"
              placeholder="Enter brand name"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={handleCategoryChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option value="grocery">Grocery</option>
              <option value="stationary">Stationary</option>
            </select>
          </div>

          {/* Subcategory */}
          <div className="mb-4">
            <label htmlFor="subcategory" className="block text-gray-700 font-medium mb-2">
              Subcategory
            </label>
            <select
              id="subcategory"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!category} // Disable subcategory dropdown if no category is selected
            >
              <option value="">Select Subcategory</option>
              {category === 'grocery' && (
                <>
                  <option value="soap">Soap</option>
                  <option value="atta">Atta</option>
                  <option value="salt">Salt</option>
                  <option value="oil">Oil</option>
                  <option value="beverages">Beverages</option>
                </>
              )}
              {category === 'stationary' && (
                <>
                  <option value="pen">Pen</option>
                  <option value="notebook">Notebook</option>
                  <option value="sketchPens">Sketch Pens</option>
                </>
              )}
            </select>
          </div>

          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
              Price (₹)
            </label>
            <input
              type="number"
              id="price"
              placeholder="Enter product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Margin */}
          <div className="mb-4">
            <label htmlFor="margin" className="block text-gray-700 font-medium mb-2">
              Margin (₹)
            </label>
            <input
              type="number"
              id="margin"
              placeholder="Enter margin"
              value={margin}
              onChange={(e) => setMargin(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              placeholder="Enter product quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit and Reset Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Create
            </button>
            <button
              type="reset"
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
