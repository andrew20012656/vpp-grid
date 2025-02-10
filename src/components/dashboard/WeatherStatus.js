import React from 'react';
import { Html } from '@react-three/drei';

export default function WeatherStatus() {
  return (
    <Html
      style={{
        right: '20px',
        top: '20px',
        pointerEvents: 'none',
        zIndex: 1000,
      }}
      fullscreen
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '20px',
          borderRadius: '10px',
          color: 'white',
          width: '250px',
          backdropFilter: 'blur(5px)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          cursor: 'default',
          pointerEvents: 'auto',
        }}
      >
        <h3 style={{ 
          margin: '0 0 15px 0', 
          borderBottom: '1px solid rgba(255,255,255,0.3)', 
          paddingBottom: '10px',
          fontSize: '1.1em',
          fontWeight: '500'
        }}>
          Weather Status
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Location:</span>
            <span style={{ color: '#4CAF50' }}>Shanghai, China</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Temperature:</span>
            <span style={{ color: '#2196F3' }}>28°C</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Weather:</span>
            <span style={{ color: '#FFC107' }}>Sunny</span>
          </div>
        </div>
      </div>
    </Html>
  );
}
