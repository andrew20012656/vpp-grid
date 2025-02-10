import React from 'react';
import { Html } from '@react-three/drei';

const BessDetail = ({ containerData, onClose }) => {
  const panelStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',
    padding: '20px',
    borderRadius: '10px',
    border: '1px solid #30ff30',
    width: '300px',
    boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
    zIndex: 1000,
    fontFamily: 'Arial, sans-serif'
  };

  const headerStyle = {
    color: '#30ff30',
    borderBottom: '2px solid #30ff30',
    paddingBottom: '10px',
    marginBottom: '15px',
    fontSize: '18px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#30ff30',
    cursor: 'pointer',
    fontSize: '20px'
  };

  const dataRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '8px 0',
    fontSize: '14px'
  };

  const labelStyle = {
    color: '#30ff30'
  };

  const valueStyle = {
    color: '#fff'
  };

  return (
    <Html>
      <div style={panelStyle}>
        <div style={headerStyle}>
          <span>{containerData.name} Details</span>
          <button style={closeButtonStyle} onClick={onClose}>×</button>
        </div>
        <div style={dataRowStyle}>
          <span style={labelStyle}>Temperature:</span>
          <span style={valueStyle}>{containerData.temperature}°C</span>
        </div>
        <div style={dataRowStyle}>
          <span style={labelStyle}>Voltage:</span>
          <span style={valueStyle}>{containerData.voltage}V</span>
        </div>
        <div style={dataRowStyle}>
          <span style={labelStyle}>Current:</span>
          <span style={valueStyle}>{containerData.current}A</span>
        </div>
        <div style={dataRowStyle}>
          <span style={labelStyle}>Power Output:</span>
          <span style={valueStyle}>{containerData.powerOutput}kW</span>
        </div>
        <div style={dataRowStyle}>
          <span style={labelStyle}>Efficiency:</span>
          <span style={valueStyle}>{containerData.efficiency}%</span>
        </div>
        <div style={dataRowStyle}>
          <span style={labelStyle}>Status:</span>
          <span style={valueStyle}>{containerData.status}</span>
        </div>
      </div>
    </Html>
  );
};

export { BessDetail };
export default BessDetail;
