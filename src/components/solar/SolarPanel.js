// SolarPanel.js
import React from 'react';

export function SolarPanel({ scale = 1 }) {
  const baseWidth = 4.5;
  const baseHeight = 0.15;
  const baseDepth = 2.25;

  const gridRows = 4;
  const gridCols = 8;
  const gridLineWidth = 0.04;

  const gridMaterial = (
    <meshPhongMaterial
      color="#444444"
      specular="#ffffff"
      shininess={100}
      metalness={0.9}
      reflectivity={1}
    />
  );

  return (
    <group>
      {/* Panel frame */}
      <mesh>
        <boxGeometry
          args={[baseWidth * scale, baseHeight * scale, baseDepth * scale]}
        />
        <meshPhongMaterial color="#666666" />
      </mesh>

      {/* Solar cell surface */}
      <group position={[0, (baseHeight / 2) * scale, 0]}>
        {/* Base surface */}
        <mesh>
          <boxGeometry
            args={[
              baseWidth * 0.97 * scale,
              (baseHeight / 2) * scale,
              baseDepth * 0.93 * scale,
            ]}
          />
          <meshPhongMaterial
            color="#1a237e"
            shininess={100}
            specular="#444444"
          />
        </mesh>

        {/* Grid lines */}
        {Array.from({ length: gridRows - 1 }).map((_, i) => (
          <mesh
            key={`h-${i}`}
            position={[
              0,
              (baseHeight / 2) * scale + 0.001,
              -baseDepth * 0.93 * scale * 0.5 +
                ((baseDepth * 0.93 * scale) / gridRows) * (i + 1),
            ]}
          >
            <boxGeometry
              args={[baseWidth * 0.97 * scale, 0.002, gridLineWidth * scale]}
            />
            {gridMaterial}
          </mesh>
        ))}

        {Array.from({ length: gridCols - 1 }).map((_, i) => (
          <mesh
            key={`v-${i}`}
            position={[
              -baseWidth * 0.97 * scale * 0.5 +
                ((baseWidth * 0.97 * scale) / gridCols) * (i + 1),
              (baseHeight / 2) * scale + 0.001,
              0,
            ]}
          >
            <boxGeometry
              args={[gridLineWidth * scale, 0.002, baseDepth * 0.93 * scale]}
            />
            {gridMaterial}
          </mesh>
        ))}
      </group>
    </group>
  );
}
