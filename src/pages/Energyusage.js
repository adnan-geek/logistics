import React from 'react';

const EnergyUsage = () => {
  return (
    <div>
      <h1>Energy Usage</h1>
      <p>This section provides a detailed look at energy consumption patterns. Useful for monitoring and improving energy efficiency.</p>
      {/* Example energy usage data */}
      <div>
        <h2>Total Energy Consumption</h2>
        <p>1,000 kWh</p>
      </div>
      <div>
        <h2>Peak Usage Times</h2>
        <p>5 PM to 8 PM</p>
      </div>
    </div>
  );
}

export default EnergyUsage;
