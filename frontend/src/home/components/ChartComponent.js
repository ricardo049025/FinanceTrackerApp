import React from 'react';
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import './ChartComponent.css';

const ChartComponent = ({ title, labels, Incomes, expenses}) => {
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Incomes',
        data: Incomes.map(x => x.totalAmount),
        borderColor: 'green',
        backgroundColor: 'green',
      },
      {
        label: 'Expenses',
        data: expenses.map(x => x.totalAmount),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  return (
    <React.Fragment>
      { Incomes && expenses && (
        <div className="chart">
          <strong>{title}</strong>
          <Line data={data}/>
        </div>
      )}
    </React.Fragment>
  );

};

export default ChartComponent;
