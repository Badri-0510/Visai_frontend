import React, { useState, useEffect } from 'react';
import LineChart from '../Components/charts/linechart_cust';
import TopSellers from '../Components/topseller';
import TopProfit from '../Components/topprofit';
import PieChart from '../Components/charts/piechart_cust';

export default function ShopAnalytics() {
  const [selectedMonth, setSelectedMonth] = useState("11"); // Default month is November (11)
  const [endpoint, setEndpoint] = useState(`http://localhost:8081/api/orders/monthly-sales?month=${selectedMonth}`);
  
  const handleMonthChange = (event) => {
    const newMonth = event.target.value;
    setSelectedMonth(newMonth);
    setEndpoint(`http://localhost:8081/api/orders/monthly-sales?month=${newMonth}`);
  };

  useEffect(() => {
    // This useEffect can be used if you want to fetch data when the component is mounted or when the selected month changes
  }, [selectedMonth]);

  return (
    <div>
      <h1 style={styles.title}>Shop Analytics</h1>
      <div style={styles.dropdown}>
        <label htmlFor="month-selector" style={{color: "#003366",
    fontSize: "15px",
    fontWeight: "bold"}}>Select Month: </label>
        <select
          id="month-selector"
          value={selectedMonth}
          onChange={handleMonthChange}
          style={styles.dropdownSelect}
        >
          {/* Add all months in the dropdown */}
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
      <div style={styles.content}>
        <div style={styles.left}>
          <LineChart 
            endpoint={endpoint} // Pass the dynamic endpoint
            title="Monthly Sale Analysis"
          />
          <PieChart endpoint="http://localhost:8081/api/transactions/sales-by-category" title="Category Sale Analysis" />
        </div>
        <div style={styles.right}>
          <TopSellers />
          <TopProfit />
        </div>
      </div>
    </div>
  );
}

const styles = {
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: "#FFFF",
    fontSize: "25px",
    fontWeight: "bold"
  },
  content: {
    display: 'flex',
  },
  left: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    justifyContent: 'center',  // Vertically centers the content
  alignItems: 'center', 
  },
  right: {
    width: '25%', // Adjust the width as needed
    display: 'flex',
    flexDirection: 'column',
    gap: '20px', // Space between TopSellers and TopProfit
  },
  dropdown: {
    textAlign: 'left',
    marginBottom: '20px',
    
  },
  dropdownSelect: {
    padding: '5px',
    fontSize: '15px',
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
    border: "1px solid #ddd",
    borderRadius: "8px",
  }
};
