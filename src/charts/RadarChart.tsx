import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const RadarChart: React.FC = () => {
  const [data, setData] = useState<number[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/form_entries");

      const carwashData = response.data;
      const dataPoints = Array(7).fill(0); // Initialize an array with 7 zeros for each day of the week

      carwashData.forEach((entry: any) => {
        const date = new Date(entry.created_at);
        const day = date.getDay();
        dataPoints[day] += 1; // Increment the number of carwash entries for the corresponding day of the week
      });

      setData(dataPoints);
    } catch (error) {
      console.error("Failed to fetch carwash data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    chart: {
      height: 350,
      type: "radar" as const,
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      radar: {
        size: 140,
        polygons: {
          strokeColors: "#e9e9e9",
          fill: {
            colors: ["#f8f8f8", "#fff"],
          },
        },
      },
    },
    title: {
      text: "Car Wash Radar",
    },
    colors: ["#FF4560"],
    markers: {
      size: 4,
      colors: ["#fff"],
      strokeColor: "#FF4560",
      strokeWidth: 2,
    },
    tooltip: {
      y: {
        formatter: function (val: any) {
          return val;
        },
      },
    },
    xaxis: {
      categories: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
    yaxis: {
      tickAmount: 7,
      labels: {
        formatter: function (val: any, i: number) {
          if (i % 2 === 0) {
            return val;
          } else {
            return "";
          }
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full">
      <ReactApexChart
        options={options}
        series={[{ name: "Data", data: data }]}
        type="radar"
        height={350}
      />
    </div>
  );
};

export default RadarChart;
