import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const ServiceChart = () => {
  const [serviceData, setServiceData] = useState<[string, number][]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/form_entries');
        // Process the data to count customers served for each service
        const services = response.data.reduce((acc: {[key: string]: number}, entry: {service: string}) => {
          acc[entry.service] = (acc[entry.service] || 0) + 1;
          return acc;
        }, {});
        setServiceData(Object.entries(services));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: serviceData.map(([service]) => service),
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Number of Customers',
      },
    },
    title: {
      text: 'Number of Customers Served by Service',
      align: 'center',
      margin: 20,
      style: {
        fontSize: '20px',
      },
    },
  };

  const chartSeries = [
    {
      name: 'Customers Served',
      data: serviceData.map(([, count]) => count),
    },
  ];

  return (
    <div className="chart bg-white rounded-lg shadow-lg p-6 w-full">
      <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={400} />
    </div>
  );
};

export default ServiceChart;
