import React, { useState } from "react";

export default function SearchBar({ onSearch, onClear }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm) {
      onSearch(searchTerm); // Trigger search
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    onClear(); // Clear search and fetch all products
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        className="p-2 border rounded-l-md"
        placeholder="Search by PID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded-r-md"
        onClick={handleSearch}
      >
        Search
      </button>
      <button
        className="bg-gray-300 text-black p-2 ml-2 rounded-md"
        onClick={handleClear}
      >
        Clear
      </button>
    </div>
  );
}
