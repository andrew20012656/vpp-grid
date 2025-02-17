import React, { useState, useEffect } from "react";
import "./RegionalStats.css"; // Create or copy styles similar to EquipmentStatus.css

const RegionalStats = ({ regionId }) => {
  const [stats, setStats] = useState({
    frequency: 50,
    currentLoad: 0,
    generation: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        frequency: (50 + Math.random()).toFixed(2),
        currentLoad: (200+Math.random() ).toFixed(0),
        generation: (200+Math.random() ).toFixed(0)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [regionId]);

  return (
    <div className="equipment-card">
      <h3>Regional Grid Stats for {regionId}</h3>
      <p>Grid Frequency: {stats.frequency} Hz</p>
      <p>Current Load: {stats.currentLoad} GW</p>
      <p>Generation: {stats.generation} GW</p>
    </div>
  );
};

export default RegionalStats;
