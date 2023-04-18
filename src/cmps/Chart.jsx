import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
// import faker from 'faker';
import { Line } from 'react-chartjs-2';

function BitcoinChart() {
  const [marketPrice, setMarketPrice] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        'https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true'
      );
      const data = await response.json();
      const marketPriceData = data.values.map((value) => value.y);
      setMarketPrice(marketPriceData);
    }
    fetchData();
  }, []);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  const data = {
    labels: Array.from({ length: marketPrice.length }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Market Price',
        data: marketPrice,
        borderColor: '#3e95cd',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        fill: true,
        yAxisID: 'y',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Market Price(USD)',
      },
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom'
      },
      y: {
        type: 'linear',
        position: 'left',
        display: true
      }
    }
  };


  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}

export default BitcoinChart;
