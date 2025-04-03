import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Orders() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/orders")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log("Error in Fetching the data" + err);
      });
  }, []);

  return (
    <div className="text-black">
      <div className="bg-lightblue-700">
        <h1 className="text-2xl font-bold p-4 text-center text-white" >RECENT ORDERS</h1>
      </div>
      <div className="overflow-x-auto p-4">
        <table className="table-auto w-full border-collapse shadow-lg">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th className="border border-blue-300 px-6 py-3">Order ID</th>
              <th className="border border-blue-300 px-6 py-3">Customer Name</th>
              <th className="border border-blue-300 px-6 py-3">Phone Number</th>
              <th className="border border-blue-300 px-6 py-3">Points</th>
              <th className="border border-blue-300 px-6 py-3">Datetime</th>
              <th className="border border-blue-300 px-6 py-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order, index) => (
              <tr
                key={order.oid}
                className={`${
                  index % 2 === 0 ? "bg-blue-50" : "bg-white"
                } hover:bg-blue-100 transition duration-200`}
              >
                <td className="border border-blue-300 px-6 py-3 text-center">{order.oid}</td>
                <td className="border border-blue-300 px-6 py-3 text-center">{order.customer.name}</td>
                <td className="border border-blue-300 px-6 py-3 text-center">{order.customer.phoneNumber}</td>
                <td className="border border-blue-300 px-6 py-3 text-center">{order.customer.points}</td>
                <td className="border border-blue-300 px-6 py-3 text-center">{new Date(order.datetime).toLocaleString()}</td>
                <td className="border border-blue-300 px-6 py-3 text-center">₹{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
