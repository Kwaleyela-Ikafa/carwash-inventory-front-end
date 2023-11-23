import React from "react";
import RadarChart from "../charts/RadarChart";
import ColumnChart from "../charts/ColumnChart";
import ServiceChart from "../charts/ServiceChart";
import PaymentMethodChart from "../charts/PaymentMethodChart";

const Dashboard = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="flex justify-evenly items-start gap-4 pl-2 pr-2 mb-4">
        <RadarChart />
        <ColumnChart />
      </div>
      <div className="flex justify-evenly items-start gap-4 pl-2 pr-2 mb-4">
        <ServiceChart />
        <PaymentMethodChart />
      </div>
    </div>
  );
};

export default Dashboard;
