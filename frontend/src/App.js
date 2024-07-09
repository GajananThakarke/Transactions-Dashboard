import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';

function App() {
  const [month, setMonth] = useState(3); // Default to March
  const [data, setData] = useState({
    transactions: [],
    statistics: {},
    barChart: [],
    pieChart: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/combined', { params: { month } });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [month]);

  return (
    <div className="App">
      <h1>Transactions Dashboard</h1>
      <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {new Date(0, i).toLocaleString('en', { month: 'long' })}
          </option>
        ))}
      </select>
      <TransactionsTable transactions={data.transactions} />
      <Statistics statistics={data.statistics} />
      <BarChart data={data.barChart} />
      <PieChart data={data.pieChart} />
    </div>
  );
}

export default App;
