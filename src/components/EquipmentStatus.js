
import React from 'react';
import './EquipmentStatus.css';

const EquipmentStatus = () => {
  const equipmentData = [
    { name: "变压器220KV", value: 12, unit: "台", icon: "sensor-error.png" },
    { name: "开关柜35KV", value: 6, unit: "台", icon: "charge.png" },
    // { name: "接地变110V", value: 1545, unit: "台", icon: "team.png" },
    // { name: "电缆110V", value: 767, unit: "回", icon: "charge.png" },
    // { name: "GIS 220V间隔", value: 342, unit: "个", icon: "sensor-error.png" },
    {name: "储能柜", value: 6, unit: "台", icon: "team.png"},
  ];

  return (
    <div className="equipment-card">
      <div className="card-title">
        <div className="title-content">主设备规模</div>
      </div>
      <div className="card-content">
        {equipmentData.map((item, index) => (
          <div key={index} className="equipment-item">
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
};

export default EquipmentStatus;