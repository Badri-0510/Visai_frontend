import React, { useState, useEffect } from "react";
import SearchBar from "../../Components/SearchBar";
import { MdDelete, MdModeEdit, MdCheckCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]); // State to store product data
  const [editingProduct, setEditingProduct] = useState(null); // State to track which product is being edited
  const navigate = useNavigate();

  // Fetch all products from the backend
  const fetchAllProducts = () => {
    axios
      .get("http://localhost:8081/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  };

  // Fetch a single product by pid
  const fetchProductById = (pid) => {
    axios
      .get(`http://localhost:8081/api/products/${pid}`)
      .then((response) => {
        setProducts([response.data]); // Display only the searched product
      })
      .catch((err) => {
        console.error("Error fetching product by ID:", err);
        alert("Product not found");
      });
  };

  // Initial fetch of all products
  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Delete product function
  const deleteProduct = (pid) => {
    axios
      .delete(`http://localhost:8081/api/products/delete/${pid}`)
      .then(() => {
        setProducts(products.filter((product) => product.pid !== pid)); // Remove the deleted product from state
        alert("Product deleted successfully!");
      })
      .catch((err) => {
        console.error("Error deleting product:", err);
        alert("Error deleting product");
      });
  };

  // Start editing a product
  const startEditing = (product) => {
    setEditingProduct({ ...product }); // Copy product to editable state
  };

  // Save the edited product
  const saveEditedProduct = () => {
    axios
      .put(`http://localhost:8081/api/products/update/${editingProduct.pid}`, editingProduct) // Update the product by pid
      .then((response) => {
        // Update the product list after successful update
        setProducts(
          products.map((product) =>
            product.pid === editingProduct.pid ? editingProduct : product
          )
        );
        setEditingProduct(null); // Exit edit mode
        alert("Product updated successfully!");
      })
      .catch((err) => {
        console.error("Error updating product:", err);
        alert("Error updating product");
      });
  };

  // Handle input changes
  const handleInputChange = (e, field) => {
    setEditingProduct({
      ...editingProduct,
      [field]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex justify-between align-middle flex-row">
        <h1 className="w-1/4 p-3 font-medium text-3xl text-white">
          Stock Management
        </h1>
        <div className="w-3/4 ml-3">
          <SearchBar onSearch={fetchProductById} onClear={fetchAllProducts} />
        </div>
      </div>

      {/* Add Product Button */}
      <div>
        <button
          className="bg-green-700 p-4 rounded-md text-white font-medium"
          onClick={() => navigate("/createproduct")}
        >
          Create Product
        </button>
      </div>

      {/* Product Listings */}
      <div className="flex justify-center align-middle">
        <table className="w-full m-4 border-collapse text-white">
          <thead className="p-5">
            <tr className="text-lg border-b-gray-100 text-black bg-slate-50 rounded-md">
              <th>PId</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Margin</th>
              <th>Quantity</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody className="text-center font-medium p-2">
            {/* Map over products to display each product */}
            {products.map((product) => (
              <tr
                key={product.pid}
                className="border border-b-white border-l-0 border-r-0"
              >
                <td>{product.pid}</td>
                <td>
                  {/* Editable Name */}
                  {editingProduct && editingProduct.pid === product.pid ? (
                    <input
                      type="text"
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      className="w-1/2 p-1 border border-gray-300 rounded-md text-black" // Smaller width and padding
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td>
                  {/* Editable Brand */}
                  {editingProduct && editingProduct.pid === product.pid ? (
                    <input
                      type="text"
                      value={editingProduct.brand}
                      onChange={(e) => handleInputChange(e, "brand")}
                      className="w-1/2 p-1 border border-gray-300 rounded-md text-black"
                    />
                  ) : (
                    product.brand
                  )}
                </td>
                <td>
                  {/* Editable Price */}
                  {editingProduct && editingProduct.pid === product.pid ? (
                    <input
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) => handleInputChange(e, "price")}
                      className="w-1/2 p-1 border border-gray-300 rounded-md text-black"
                    />
                  ) : (
                    // Ensure that price is a number before calling toFixed
                    !isNaN(product.price) ? product.price.toFixed(2) : "N/A"
                  )}
                </td>
                <td>
                  {/* Editable Margin */}
                  {editingProduct && editingProduct.pid === product.pid ? (
                    <input
                      type="number"
                      value={editingProduct.margin}
                      onChange={(e) => handleInputChange(e, "margin")}
                      className="w-1/2 p-1 border border-gray-300 rounded-md text-black"
                    />
                  ) : (
                    // Ensure that margin is a number before calling toFixed
                    !isNaN(product.margin) ? product.margin.toFixed(2) : "N/A"
                  )}
                </td>
                <td>
                  {/* Editable Quantity */}
                  {editingProduct && editingProduct.pid === product.pid ? (
                    <input
                      type="number"
                      value={editingProduct.quantity}
                      onChange={(e) => handleInputChange(e, "quantity")}
                      className="w-1/2 p-1 border border-gray-300 rounded-md text-black"
                    />
                  ) : (
                    product.quantity
                  )}
                </td>
                <td className="p-2 flex justify-around">
                  {/* Edit Button */}
                  {editingProduct && editingProduct.pid === product.pid ? (
                    <MdCheckCircle
                      className="text-green-500 cursor-pointer"
                      onClick={saveEditedProduct} // Save edited product
                    />
                  ) : (
                    <MdModeEdit
                      className="text-blue-500 cursor-pointer"
                      onClick={() => startEditing(product)} // Start editing the product
                    />
                  )}
                  <MdDelete
                    className="text-red-500 cursor-pointer"
                    onClick={() => deleteProduct(product.pid)} // Delete product
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
