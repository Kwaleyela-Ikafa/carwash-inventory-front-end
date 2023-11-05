import React from "react";
import RadarChart from "../charts/RadarChart";
import ColumnChart from "../charts/ColumnChart";

const Dashboard = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {/* Add your dashboard content here */}
      <div className="flex justify-evenly items-start gap-4 pl-2 pr-2 mb-4">
        <RadarChart />
        <ColumnChart />
      </div>
    </div>
  );
};

export default Dashboard;
