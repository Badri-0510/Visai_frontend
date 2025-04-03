import React, { useEffect, useState } from 'react';

import axios from 'axios';

export default function Bill() {
  const [data, setData] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // Fetch products for inventory
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/products")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log("Error in Fetching the data" + err);
      });
  }, []);

  // State for cart and total
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Add item to cart
  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.pid === item.pid);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.pid === item.pid
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    setTotal(total + item.price);
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    const item = cart.find((cartItem) => cartItem.pid === itemId);
    if (item) {
      setTotal(total - item.price * item.quantity);
      setCart(cart.filter((cartItem) => cartItem.pid !== itemId));
    }
  };

  // Handle order and transaction submission
  // const handleSubmit = async () => {
  //   try {
  //     // Check if customer exists based on phone number
  //     const response = await axios.get(`http://localhost:8081/api/customers`);
  //     const existingCustomer = response.data.find(customer => customer.phoneNumber === customerPhone);

  //     if (existingCustomer) {
  //       // Customer exists, update their points
  //       await axios.put(`http://localhost:8081/api/customers/${existingCustomer.id}`, {
  //         points: existingCustomer.points + 100,
  //       });
  //       alert("Points added successfully!");

  //       console.log("existing customer")
  //       console.log(existingCustomer);
  
  //       // After creating the new customer, create an order and transactions
  //       const orderResponse = await axios.post("http://localhost:8081/orders", {
  //         total: total,
  //         datetime: new Date().toISOString(),
  //         customer: existingCustomer.data, // Using the custom data for the new customer
  //       });

  //       console.log("order response is:")
  //       console.log(orderResponse)

  //       console.log("prod")
  //       if (orderResponse.status === 201||orderResponse.status === 200) {
  //         for (let product of cart) {
  //           console.log(product)
  //           // Create a transaction for each product in the cart
  //           await axios.post("http://localhost:8081/api/transactions", {
  //             oid: orderResponse.data.oid,
  //             pid: product.pid,
  //             purchaseQuantity: product.quantity,
  //           });
  //         }
  //         alert("Order and Transactions created successfully!");
  //       } else {
  //         alert("Failed to create order.");
  //       }

  //     } else {
  //       // Customer does not exist, create a new customer
  //       const newCustomer = {
  //         name: customerName,
  //         phoneNumber: customerPhone,
  //         points: 100,
  //       };

  //       const custom = await axios.post("http://localhost:8081/api/customers", newCustomer);
  //       console.log(custom)
  //       alert("New customer created with 100 points!");
         
  //       // After creating the new customer, create an order and transactions
  //       const orderResponse = await axios.post("http://localhost:8081/orders", {
  //         total: total,
  //         datetime: new Date().toISOString(),
  //         customer: custom.data, // Using the custom data for the new customer
  //       });

  //       console.log("order response is:")
  //       console.log(orderResponse)

  //       console.log("prod")
  //       if (orderResponse.status === 201||orderResponse.status === 200) {
  //         for (let product of cart) {
  //           console.log(product)
  //           // Create a transaction for each product in the cart
  //           await axios.post("http://localhost:8081/api/transactions", {
  //             oid: orderResponse.data.oid,
  //             pid: product.pid,
  //             purchaseQuantity: product.quantity,
  //           });
  //         }

  //         alert("Order and Transactions created successfully!");
  //       } else {
  //         alert("Failed to create order.");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error occurred while processing the customer:", error);
  //     alert("Error occurred while processing the customer.");
  //   }
  // };
  const handleSubmit = async () => {
    try {
      // Check if customer exists based on phone number
      const response = await axios.get(`http://localhost:8081/api/customers`);
      const existingCustomer = response.data.find(customer => customer.phoneNumber === customerPhone);
  
      if (existingCustomer) {
        console.log("Existing customer:", existingCustomer);
  
        // Customer exists, update their points
        const updateResponse = await axios.put(`http://localhost:8081/api/customers/${existingCustomer.id}`, {
          points: existingCustomer.points + 100,
        });
        console.log("Update response:", updateResponse); // Log the update response
  
        if (updateResponse.status === 200) {
          alert("Points added successfully!");
          // After updating points, create an order and transactions
          const orderResponse = await axios.post("http://localhost:8081/api/orders", {
            total: total,
            datetime: new Date().toISOString(),
            customer: existingCustomer, // Using the existing customer
          });
  
          if (orderResponse.status === 201 || orderResponse.status === 200) {
            for (let product of cart) {
              await axios.post("http://localhost:8081/api/transactions", {
                oid: orderResponse.data.oid,
                pid: product.pid,
                purchaseQuantity: product.quantity,
              });
            }
            alert("Order and Transactions created successfully!");
          } else {
            alert("Failed to create order.");
          }
        } else {
          alert("Failed to update points.");
        }
      } else {
        // Customer does not exist, create a new customer
        const newCustomer = {
          name: customerName,
          phoneNumber: customerPhone,
          points: 100,
        };
  
        const custom = await axios.post("http://localhost:8081/api/customers", newCustomer);
        alert("New customer created with 100 points!");
  
        // After creating the new customer, create an order and transactions
        const orderResponse = await axios.post("http://localhost:8081/api/orders", {
          total: total,
          datetime: new Date().toISOString(),
          customer: custom.data, // Using the custom data for the new customer
        });
  
        if (orderResponse.status === 201 || orderResponse.status === 200) {
          for (let product of cart) {
            await axios.post("http://localhost:8081/api/transactions", {
              oid: orderResponse.data.oid,
              pid: product.pid,
              purchaseQuantity: product.quantity,
            });
          }
          alert("Order and Transactions created successfully!");
        } else {
          alert("Failed to create order.");
        }
      }
    } catch (error) {
      console.error("Error occurred while processing the customer:", error);
      alert("Error occurred while processing the customer.");
    }
  };
  
  // Handle customer name and phone number change
  const handleNameChange = (event) => {
    setCustomerName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setCustomerPhone(event.target.value);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="flex flex-row justify-around">
        <h1 className="w-1/3 text-3xl font-bold bg-slate-500 text-white rounded-lg text-center mb-6 p-5">
          Billing Page
        </h1>
       
      </div>

      {/* Customer Details Section */}
      <div className="bg-gray-200 shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Customer Details</h2>
        <div className="flex justify-between items-center">
          <div className="w-1/2 pr-4">
            <label className="block text-sm font-medium mb-2" htmlFor="customerName">
              Name:
            </label>
            <input
              id="customerName"
              type="text"
              value={customerName}
              onChange={handleNameChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter customer name"
            />
          </div>
          <div className="w-1/2 pl-4">
            <label className="block text-sm font-medium mb-2" htmlFor="customerPhone">
              Phone:
            </label>
            <input
              id="customerPhone"
              type="text"
              value={customerPhone}
              onChange={handlePhoneChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter phone number"
            />
          </div>
        </div>
      </div>

      {/* Billing and Inventory Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inventory Section */}
        <div className="shadow-md rounded-lg p-4 text-white font-medium bg-gray-800">
          <h2 className="text-2xl font-bold mb-4 border-b-2 pb-2 text-center">Inventory</h2>
          <div className="h-[400px] overflow-y-scroll">
            {data.map((item) => (
              <div
                key={item.pid}
                className="flex justify-between items-center mb-3 border-b pb-2"
              >
                <div>
                  <span className="text-lg">{item.name}</span>
                  <p className="text-sm text-gray-300">₹{item.price}</p>
                </div>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Add To Bill
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="bg-gray-200 shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4 text-center">Bill</h2>
          <div className="h-[400px] overflow-y-scroll">
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <>
                {cart.map((cartItem) => (
                  <div
                    key={cartItem.pid}
                    className="flex justify-between items-center mb-3 border-b pb-2"
                  >
                    <div>
                      <span className="text-lg">{cartItem.name}</span>
                      <p className="text-sm text-gray-500">
                        ₹{cartItem.price} x {cartItem.quantity}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(cartItem.pid)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
          {cart.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mt-4">Total: ₹{total}</h3>
              <button className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleSubmit}>
                Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
