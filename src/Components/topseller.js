import React, { useEffect, useState } from "react";
import axios from "axios";
import'./topseller.css';
import { color } from "chart.js/helpers";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://localhost:8081/api/transactions/top-sellers")
      .then((response) => {
        setTopSellers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching top sellers:", error);
      });
  }, []);

  return (
    <div style={styles.container}>
      
      <div style={styles.scrollContainer} className="scroll-container">
      <h2 style={styles.title}>Top Sellers</h2>
        {topSellers.map((item, index) => (
          <tr key={index} style={styles.box}>
            <td style={styles.pid}>{item[0]}</td>
            <td style={styles.spacer}></td> {/* Spacer for 5px gap */}
            <td style={styles.name}>{item[1]}</td>
          </tr>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "95%",
    margin: "0 auto",
    textAlign: "center",
    
  },
  title: {
    marginBottom: "5px",
    color: "#003366",
    fontSize: "18px",
    fontWeight: "bold"
  },
  
  scrollContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxHeight: "300px",
    overflowY: "auto", 
    border: "1px solid #ddd",
    borderRadius: "15px",
    padding: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
    backgroundColor:"#ffff"
  },
  box: {
    width: "90%",
    padding: "8px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
    textAlign: "left",
    display: "flex", // Flex for row alignment
    alignItems: "center",
  },
  pid: {
    fontSize: "14px",
    color: "#555",
  },
  spacer: {
    width: "5px", // Spacer between pid and name
  },
  name: {
    fontSize: "14px",
    color: "#333",
  },
 

};

export default TopSellers;
