import React from 'react';
import { SolarPanel } from './SolarPanel';

export function SolarArray({
  rows = 8,
  cols = 12,
  startX = 0,
  startZ = 0,
  scale = 1,
  gapX = 5,
  gapZ = 2.7,
}) {
  const tiltAngle = -Math.PI / 6;
  const heightOffset = 1.0;

  const panels = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      panels.push(
        <group
          key={`panel-${row}-${col}`}
          position={[
            startX + col * (gapX * scale),
            heightOffset,
            startZ + row * (gapZ * scale),
          ]}
          rotation={[-tiltAngle, 0, 0]}
        >
          <SolarPanel scale={scale} />
        </group>
      );
    }
  }

  return <group>{panels}</group>;
}
