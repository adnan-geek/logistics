import React from "react";
import Chart from "react-apexcharts";

const Analytics = () => {
  // Static data for demonstration
  const months = ["Jan", "Feb", "Mar", "Apr", "May"];
  const shipmentsData = [120, 150, 170, 200, 250];
  const earningsData = [2000, 3000, 4000, 4500, 5000];
  const gasoilData = [300, 350, 400, 450, 500];

  // Chart options
  const shipmentsOptions = {
    chart: { type: "bar", height: 350 },
    series: [{ name: "Shipments", data: shipmentsData }],
    xaxis: { categories: months },
    colors: ["#1E90FF"],
    title: { text: "Monthly Shipments", align: "center" },
  };

  const earningsOptions = {
    chart: { type: "line", height: 350 },
    series: [{ name: "Earnings", data: earningsData }],
    xaxis: { categories: months },
    colors: ["#28a745"],
    title: { text: "Monthly Earnings (USD)", align: "center" },
  };

  const gasoilOptions = {
    chart: { type: "area", height: 350 },
    series: [{ name: "Gasoil Usage (L)", data: gasoilData }],
    xaxis: { categories: months },
    colors: ["#FFA500"],
    title: { text: "Monthly Gasoil Usage", align: "center" },
    fill: { type: "gradient" },
  };

  return (
    <div className="bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Analytics</h1>

      {/* Summary Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-500">Total Shipments</h2>
          <p className="text-3xl font-bold text-blue-500">1,245</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-500">Earnings (USD)</h2>
          <p className="text-3xl font-bold text-green-500">$45,300</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-500">Gasoil Usage</h2>
          <p className="text-3xl font-bold text-yellow-500">2,345 L</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">Monthly Shipments</h2>
          <Chart options={shipmentsOptions} series={shipmentsOptions.series} type="bar" height={350} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">Monthly Earnings</h2>
          <Chart options={earningsOptions} series={earningsOptions.series} type="line" height={350} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow col-span-2">
          <h2 className="text-lg font-semibold text-gray-700">Monthly Gasoil Usage</h2>
          <Chart options={gasoilOptions} series={gasoilOptions.series} type="area" height={350} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
