import React from 'react';

const Settings = () => {
  return (
    <div>
      <h1>Settings</h1>
      <p>Adjust application settings below:</p>
      <div>
        <h2>Notification Settings</h2>
        <label>
          Enable Email Notifications:
          <input type="checkbox" checked />
        </label>
      </div>
      <div>
        <h2>Interface Settings</h2>
        <label>
          Dark Mode:
          <input type="checkbox" />
        </label>
      </div>
      {/* Add more settings here */}
      <button onClick={() => alert('Settings Saved!')}>Save Settings</button>
    </div>
  );
}

export default Settings;
