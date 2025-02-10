import React, { useState, useEffect } from 'react';
import './GridStatus.css';

export default function GridStatus() {
  const [frequency, setFrequency] = useState(50.02);
  const [powerOutput, setPowerOutput] = useState(45.8);

  useEffect(() => {
    const interval = setInterval(() => {
      // Random fluctuation ±0.05 Hz around 50 Hz
      const newFrequency = 50 + (Math.random() - 0.5) * 0.1;
      // Random fluctuation ±0.3 MW around 45.8 MW
      const newPowerOutput = 45.8 + (Math.random() - 0.5) * 0.6;
      
      setFrequency(Number(newFrequency.toFixed(2)));
      setPowerOutput(Number(newPowerOutput.toFixed(1)));
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const gridData = [
    { name: "并网电压", value: 220, unit: "kV", icon: "voltage.png" },
    { name: "输出功率", value: powerOutput, unit: "MW", icon: "power-output.png" },
    { name: "电网频率", value: frequency, unit: "Hz", icon: "frequency.png" },
    { name: "功率因数", value: 0.95, unit: "cosφ", icon: "power-factor.png" },
  ];

  return (
    <div className="grid-card">
      <div className="card-title">
        <div className="title-content">电网运行状态</div>
      </div>
      <div className="card-content">
        {gridData.map((item, index) => (
          <div key={index} className="grid-item">
            <div className="item-label">
              <img src={`/images/${item.icon}`} alt={item.name} />
              <span>{item.name}</span>
            </div>
            <div className="item-value">
              <span className="value-number">{item.value}</span>
              <span className="value-unit">（{item.unit}）</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}