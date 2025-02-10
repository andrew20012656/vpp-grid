import React from 'react';

export function WeatherCard() {
  return (
    <div
      style={{
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '15px',
        borderRadius: '8px',
        color: 'white',
        minWidth: '200px',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <div style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>
        Shanghai, China
      </div>
      <div style={{ fontSize: '24px', marginBottom: '8px' }}>
        28°C
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '8px' }}>☀️</span>
        <span>Sunny</span>
      </div>
    </div>
  );
}
