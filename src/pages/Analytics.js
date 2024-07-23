import React from 'react';

const Analytics = () => {
  return (
    <div>
      <h1>Analytics Dashboard</h1>
      <p>Welcome to the Analytics Dashboard. Here you can view all the important metrics to help you understand the performance and usage of the system.</p>
      {/* Example of an analytics metric */}
      <div>
        <h2>Total Users</h2>
        <p>500</p>
      </div>
      <div>
        <h2>Monthly Active Users</h2>
        <p>300</p>
      </div>
      <div>
        <h2>Retention Rate</h2>
        <p>85%</p>
      </div>
    </div>
  );
}

export default Analytics;
