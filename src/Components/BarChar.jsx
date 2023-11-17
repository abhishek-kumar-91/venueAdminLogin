import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

function BarChar({ chartData }) {
  const options = {
    scales: {
      x: {
        type: 'category',
        ticks: {
          color: '#FFFFFF',
        },
        grid: {
          color: '#FFFFFF',
        },
      },
      y: [
        {
          ticks: {
            color: '#FFFFFF',
          },
          grid: {
            color: '#FFFFFF',
          },
        },
      ],
    },
    plugins: {
      drawBorder: (chart) => {
        const ctx = chart.ctx;
        const xAxis = chart.scales['x'];
        const yAxis = chart.scales['y'][0];

        // Draw left vertical line
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(xAxis.left, yAxis.top);
        ctx.lineTo(xAxis.left, yAxis.bottom);
        ctx.strokeStyle = '#FFFFFF'; // Set your desired border color
        ctx.lineWidth = 2; // Set your desired border width
        ctx.stroke();
        ctx.restore();

        // Draw bottom horizontal line
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(xAxis.left, yAxis.bottom);
        ctx.lineTo(xAxis.right, yAxis.bottom);
        ctx.strokeStyle = '#FFFFFF'; // Set your desired border color
        ctx.lineWidth = 2; // Set your desired border width
        ctx.stroke();
        ctx.restore();
      },
    },
  };


  return <Bar data={chartData} options={options} />;
}

export default BarChar;
