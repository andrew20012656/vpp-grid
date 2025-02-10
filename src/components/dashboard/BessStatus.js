import React from 'react';
import './BessStatus.css';

export default function BessStatus() {
  const bessData = [
    { name: "电池总容量", value: 100, unit: "MWh", icon: "battery-full.png" },
    { name: "剩余电量", value: 75, unit: "%", icon: "battery-half.png" },
    { name: "充电功率", value: 2.5, unit: "MW", icon: "power-in.png" },
    { name: "放电功率", value: 1.8, unit: "MW", icon: "power-out.png" },
  ];

  return (
    <div className="bess-card">
      <div className="card-title">
        <div className="title-content">储能系统状态</div>
      </div>
      <div className="card-content">
        {bessData.map((item, index) => (
          <div key={index} className="bess-item">
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