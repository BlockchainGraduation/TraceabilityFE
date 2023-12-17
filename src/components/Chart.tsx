import React from 'react';
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
import { Line } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function Chart({
  data,
  label,
  type = 'product',
}: {
  type: 'product' | 'transaction';
  label?: string;
  data: StatisticalUserType;
}) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: label || 'Bảng thống kê',
      },
    },
    scales: {
      y: {
        min: 0,
      },
    },
  };
  const statistiacal =
    type === 'product'
      ? data?.month_product || {}
      : data?.month_transaction || {};
  const labels = Object.keys(statistiacal as any).map((key) => key);

  const statisticalData = {
    labels,
    datasets: [
      {
        label: type === 'product' ? 'Sản phẩm' : 'Giao dịch',
        data: Object.values(statistiacal as any).map((value) => value),
        borderColor:
          type === 'product' ? 'rgb(255, 99, 132)' : 'rgb(61, 106, 184)',
        backgroundColor:
          type === 'product'
            ? 'rgba(255, 99, 132, 0.5)'
            : 'rgb(61, 106, 184, 0.5)',
      },
    ],
  };
  return <Line options={options} data={statisticalData} />;
}
