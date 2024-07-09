import React from 'react';
import { Bar } from 'react-chartjs-2';

function BarChart({ data }) {
  const chartData = {
    labels: data.map(d => d.range),
    datasets: [
      {
        label: '# of Items',
        data: data.map(d => d.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div>
      <h2>Bar Chart</h2>
      <Bar data={chartData} />
    </div>
  );
}

export default BarChart;
