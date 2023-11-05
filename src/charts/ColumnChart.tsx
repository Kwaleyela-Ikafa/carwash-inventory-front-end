import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

interface FormEntryData {
    customer_name: string;
    contact: string;
    service: string;
    vehicle: string;
    cleaner: string;
    share: string;
    price: number;
    p_m: string;
    cashier: string;
    created_at: string | number | Date;
}

const ColumnChart: React.FC = () => {
  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<FormEntryData[]>('http://localhost:3000/form_entries');
        const monthlyData = generateMonthlyData(response.data);
        setChartData(monthlyData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const generateMonthlyData = (data: FormEntryData[]): number[] => {
    const monthlySales: number[] = new Array(12).fill(0);

    data.forEach((entry) => {
      const entryDate = new Date(entry.created_at);
      const month = entryDate.getMonth();
      const price = entry.price;
      monthlySales[month] += price;
    });

    return monthlySales;
  };

  const options: ApexCharts.ApexOptions = {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return `$${val.toFixed(2)}`;
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#304758'],
      },
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      position: 'top',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    title: {
      text: 'Total Sales per Month',
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#444',
      },
    },
  };

  return (
    <div className="chart bg-white rounded-lg shadow-lg p-6 w-full">
      <ReactApexChart options={options} series={[{ name: 'Sales', data: chartData }]} type="bar" height={350} />
    </div>
  );
};

export default ColumnChart;
