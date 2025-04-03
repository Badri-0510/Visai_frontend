import React from 'react'

export default function ProductEdit() {
  return (
    <div className=" w-2/3 flex justify-center items-center min-h-screen"> 
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 ">Create Product</h2>
      <form>
        {/* Product Name */}
        <div className="mb-4">
          <label
            htmlFor="productName"
            className="block text-gray-700 font-medium mb-2"
          >
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            placeholder="Enter product name"
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
         {/* Brand Name */}
        <div className='mb-4'>
           <label 
           htmlFor="Enter "
           className='block text-gray-700 font-medium mb-2"'
           >Brand Name</label>
           <input type="text" id="brand" placeholder='Enter brand name'
           className='w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500' />
        </div>
  
        {/* Price */}
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 font-medium mb-2"
          >
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            placeholder="Enter product price"
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
           {/* Margin */}
        <div className='mb-4'>
           <label 
           htmlFor="Enter "
           className='block text-gray-700 font-medium mb-2"'
           >Brand Name</label>
           <input type="text" id="brand" placeholder='Enter brand name'
           className='w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500' />
        </div>
  
        {/* Quantity */}
        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block text-gray-700 font-medium mb-2"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            placeholder="Enter product quantity"
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
  )
}
