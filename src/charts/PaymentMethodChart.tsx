import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const PaymentMethodChart = () => {
  const [paymentData, setPaymentData] = useState<[string, number][]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/form_entries');
        // Process the data to count payment methods
        const paymentMethods = response.data.reduce(
          (acc: {[key: string]: number}, entry: {p_m: string}) => {
            acc[entry.p_m] = (acc[entry.p_m] || 0) + 1;
            return acc;
          },
          { CH: 0, AM: 0 }
        );
        setPaymentData(Object.entries(paymentMethods));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'pie',
    },
    labels: paymentData.map(([method]) => (method === 'CH' ? 'Cash' : 'Airtel Money')),
    title: {
      text: 'Payment Method Distribution',
      align: 'center',
      margin: 20,
      style: {
        fontSize: '20px',
      },
    },
  };

  const chartSeries = paymentData.map(([, count]) => count);

  return (
    <div className="chart bg-white rounded-lg shadow-lg p-6 w-full">
      <ReactApexChart options={chartOptions} series={chartSeries} type="pie" height={400} />
    </div>
  );
};

export default PaymentMethodChart;
