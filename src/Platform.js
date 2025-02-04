import { OrbitControls, useHelper, Html } from "@react-three/drei";
import {
  TextureLoader,
  RepeatWrapping,
  Vector3,
  CatmullRomCurve3,
  Spherical,
} from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import { use, useMemo, useState, useEffect, useRef } from "react";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { TransformerGroupSystem } from "./components/TransformerSystem";
import { Wire } from "./components/Wire";
import { BessContainer } from "./components/BessContainer";
import {
  Sky,
  ContactShadows,
  RandomizedLight,
  AccumulativeShadows,
  softShadows,
} from "@react-three/drei";
import * as THREE from "three";
import { createRoot } from "react-dom/client";
import "./styles.css"; // You'll need to create this file
import EquipmentStatus from "./components/EquipmentStatus";
import BessStatus from "./components/BessStatus";
import GridStatus from './components/GridStatus';
import { useCameraTour } from './components/CameraTour';
import { useAutoReset } from './hooks/useAutoReset';

function HighVoltageIsolationGroup({ x, z, endZ }) {
  const fbx = useLoader(FBXLoader, "/models/isolation.FBX");
  const fbx2 = useLoader(FBXLoader, "/models/pillar-group.FBX");

  return (
    <>
      <group name="highVoltageIsolationGroup1">
        <primitive
          object={fbx.clone()}
          name="高压隔离1"
          position={[x + 6, 2, z]}
          scale={[0.001, 0.001, 0.001]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <primitive
          object={fbx.clone()}
          name="高压隔离2"
          position={[x, 2, z + 2]}
          scale={[0.001, 0.001, 0.001]}
        />
        <primitive
          object={fbx.clone()}
          name="高压隔离3"
          position={[x - 6, 2, z]}
          scale={[0.001, 0.001, 0.001]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <primitive
          object={fbx2.clone()}
          name="3pillar"
          position={[x, -11, z + 1]}
          scale={[0.0009, 0.0009, 0.0009]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <Wire
          points={[
            new Vector3(x, 5.5, z + 5.5),
            new Vector3(x, 6, z + 6),
            new Vector3(x, 10, endZ),
          ]}
          radius={0.08}
          animated={true}
          flowDirection={-1}
        />
        <Wire
          points={[
            new Vector3(x - 3, 5.5, z + 5.5),
            new Vector3(x - 3, 6, z + 6),
            new Vector3(x - 3, 10, endZ),
          ]}
          radius={0.08}
          animated={true}
          flowDirection={-1}
        />
        <Wire
          points={[
            new Vector3(x + 3, 5.5, z + 5.5),
            new Vector3(x + 3, 6, z + 6),
            new Vector3(x + 3, 10, endZ),
          ]}
          radius={0.08}
          animated={true}
          flowDirection={-1}
        />
      </group>
    </>
  );
}

function Pillar() {
  const fbx = useLoader(FBXLoader, "/models/pillar.FBX");
  return (
    <>
      <primitive
        object={fbx.clone()}
        name="pillar"
        scale={[0.001, 0.001, 0.001]}
        position={[0, 0, 0]}
      />
    </>
  );
}

function ConnectionTubes() {
  const fbx = useLoader(FBXLoader, "/models/pillar-group.FBX");
  return (
    <>
      <primitive
        object={fbx.clone()}
        name="3pillar"
        scale={[0.001, 0.001, 0.001]}
        position={[0, 0, 0]}
      />
    </>
  );
}
// Remove TransformerGroup and TransformerGroupSystem functions

function IsolationRackGroup({ x, z }) {
  const fbx = useLoader(FBXLoader, "/models/isolation-rack.FBX");
  return (
    <>
      <group name="high-voltage-rack-group">
        <primitive
          object={fbx.clone()}
          name="高压隔离架1"
          position={[x + 41, 0, z]}
          scale={[0.00085, 0.00085, 0.00085]}
          rotation={[0, 0, 0]}
        />
        <primitive
          object={fbx.clone()}
          name="高压隔离架2"
          position={[x, 0, z]}
          scale={[0.00085, 0.00085, 0.00085]}
          rotation={[0, 0, 0]}
        />
        <primitive
          object={fbx.clone()}
          name="高压隔离架3"
          position={[x - 41, 0, z]}
          scale={[0.00085, 0.00085, 0.00085]}
          rotation={[0, 0, 0]}
        />
      </group>
    </>
  );
}

function WireSystem({ towerX }) {
  const wirePositions = [
    // Top wires
    [
      new Vector3(towerX - 5, 12, -65),
      new Vector3(towerX + 2, 16, -79),
      new Vector3(towerX + 9, 31, -105),
    ],
    [
      new Vector3(towerX + 30, 12, -65),
      new Vector3(towerX + 22, 16, -79),
      new Vector3(towerX + 16, 31, -105),
    ],
    // Middle wires
    [
      new Vector3(towerX + 2, 12, -65),
      new Vector3(towerX + 4, 14, -79),
      new Vector3(towerX + 7, 25, -105),
    ],
    [
      new Vector3(towerX + 24, 12, -65),
      new Vector3(towerX + 19, 14, -79),
      new Vector3(towerX + 16, 25, -105),
    ],

    // Bottom wires
    [
      new Vector3(towerX + 16, 12, -65),
      new Vector3(towerX + 16, 12, -79),
      new Vector3(towerX + 16, 18, -105),
    ],
    [
      new Vector3(towerX + 7, 12, -65),
      new Vector3(towerX + 7, 12, -79),
      new Vector3(towerX + 7, 18, -105),
    ],
  ];

  return (
    <group>
      {wirePositions.map((points, index) => (
        <Wire key={index} points={points} animated={true} />
      ))}
    </group>
  );
}

function HighVoltageTower({ startX = 0, startZ = -200 }) {
  const fbx = useLoader(FBXLoader, "/images/high_voltage_tower.fbx");
  const towerSpacing = 42; // spacing between towers

  return (
    <>
      <group name="highVoltageTower">
        {/* Tower 1 */}
        <primitive
          object={fbx.clone()}
          name="高压电塔1"
          position={[startX - towerSpacing, 0, startZ]}
          scale={[0.001, 0.001, 0.001]}
        />
        {/* Tower 2 */}
        <primitive
          object={fbx.clone()}
          name="高压电塔2"
          position={[startX, 0, startZ]}
          scale={[0.001, 0.001, 0.001]}
        />
        {/* Tower 3 */}
        <primitive
          object={fbx.clone()}
          name="高压电塔3"
          position={[startX + towerSpacing, 0, startZ]}
          scale={[0.001, 0.001, 0.001]}
        />
      </group>
      <WireSystem towerX={startX - towerSpacing} />
      <WireSystem towerX={startX} />
      <WireSystem towerX={startX + towerSpacing} />
    </>
  );
}

function Rack() {
  const fbx = useLoader(FBXLoader, "/models/rack2.FBX");
  return (
    <>
      <primitive
        object={fbx.clone()}
        name="rack"
        scale={[10, 10, 10]}
        position={[0, 0, 0]}
      />
    </>
  );
}

function BessContainerGroup({ startX, startZ }) {
  const containerSpacingX = 30; // spacing between containers in X direction

  return (
    <group>
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <BessContainer
          key={`bess-${index}`}
          position={[startX + index * containerSpacingX, 4, startZ]}
          rotation={[0, Math.PI, 0]}
          scale={[0.01, 0.01, 0.01]}
        />
      ))}
    </group>
  );
}

function SolarPanel({ scale = 1 }) {
  const baseWidth = 4.5;
  const baseHeight = 0.15;
  const baseDepth = 2.25;

  // Grid configuration
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

        {/* Horizontal grid lines */}
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

        {/* Vertical grid lines */}
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

function SolarArray({
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

export default function Platform() {
  let isolationGroup_x_left = 62;
  let isolationAndRackGroup_z = -65;
  let isolationGroup_gap = 21;
  let transformerGroup_startX = 50;
  let transformerGroup_startZ = -30;
  let transformerGroup2_Z = 30;
  const texture = useLoader(TextureLoader, "/images/水泥地面.png");
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.offset.set(0, 0);
  texture.repeat.set(180, 180);
  const directionalLight = useRef();
  useHelper(directionalLight, THREE.DirectionalLightHelper, 5); // Size parameter added (5)

  const initialSunPosition = useMemo(() => new Vector3(0, 1000, 0), []);
  const [sunPosition, setSunPosition] = useState(initialSunPosition);
  const spherical = useMemo(() => new Spherical(), []);
  const lastUpdate = useRef(0);
  const frameSkip = 100; // Update every 5 frames
  const rotationSpeed = 0.1; // Adjust speed (lower = slower)
  const [isAnimating, setIsAnimating] = useState(true);
  const { startTour, quickMove } = useCameraTour();
  const handleCameraMovement = useAutoReset(quickMove, 3000);

  useFrame(({ clock }) => {
    if (!isAnimating) return; // Skip animation if turned off

    if (Math.floor(clock.getElapsedTime() * 60) % frameSkip !== 0) return;

    const currentTime = clock.getElapsedTime() * rotationSpeed;
    if (currentTime - lastUpdate.current < 0.016) return;

    // Modified angle calculations for correct sun arc
    const theta = Math.PI; // Fixed horizontal angle (points south)
    const phi = (currentTime % (Math.PI * 2)) + Math.PI / 4; // Vertical rotation (add offset to start above horizon)

    spherical.set(1000, phi, theta);
    const newPosition = new Vector3().setFromSpherical(spherical);

    if (!newPosition.equals(sunPosition)) {
      setSunPosition(newPosition);
      lastUpdate.current = currentTime;
    }
  });

  const toggleAnimation = () => {
    if (isAnimating) {
      // Reset sun position when stopping
      setSunPosition(initialSunPosition.clone());
      lastUpdate.current = 0;
    }
    setIsAnimating(!isAnimating);
  };

  return (
    <>
      <OrbitControls 
        onChange={handleCameraMovement}
        onStart={handleCameraMovement}
      />
      <directionalLight
        ref={directionalLight}
        position={sunPosition.clone().multiplyScalar(0.2)}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <ambientLight intensity={0.5} />

      <Sky sunPosition={sunPosition} />
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]}>
        <planeGeometry args={[300, 360, 10]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      <HighVoltageTower startX={0} startZ={-200} />
      <HighVoltageTower startX={0} startZ={0} />

      <SolarArray
        rows={6}
        cols={10}
        startX={-20}
        startZ={50}
        scale={1.5}
        gapX={5.5}
        gapZ={3}
      />

      <HighVoltageIsolationGroup
        x={isolationGroup_x_left}
        z={isolationAndRackGroup_z}
        endZ={transformerGroup_startZ - 4}
      />
      <HighVoltageIsolationGroup
        x={isolationGroup_x_left - isolationGroup_gap}
        z={isolationAndRackGroup_z}
        endZ={transformerGroup_startZ - 4}
      />
      <HighVoltageIsolationGroup
        x={isolationGroup_x_left - 2 * isolationGroup_gap}
        z={isolationAndRackGroup_z}
        endZ={transformerGroup_startZ - 3}
      />
      <HighVoltageIsolationGroup
        x={isolationGroup_x_left - 3 * isolationGroup_gap}
        z={isolationAndRackGroup_z}
        endZ={transformerGroup_startZ - 3}
      />
      <HighVoltageIsolationGroup
        x={isolationGroup_x_left - 4 * isolationGroup_gap}
        z={isolationAndRackGroup_z}
        endZ={transformerGroup_startZ - 3}
      />
      <HighVoltageIsolationGroup
        x={isolationGroup_x_left - 5 * isolationGroup_gap}
        z={isolationAndRackGroup_z}
        endZ={transformerGroup_startZ - 3}
      />
      <IsolationRackGroup x={-13} z={isolationAndRackGroup_z + 5} />
      <TransformerGroupSystem
        startX={transformerGroup_startX + 10}
        z={transformerGroup_startZ}
        gap={20}
      />

      <Rack />
      <BessContainerGroup startX={-60} startZ={0} />

      <TransformerGroupSystem
        startX={transformerGroup_startX + 10}
        z={transformerGroup2_Z}
        gap={20}
        flowDirection={-1}
      />
      {/* <Pillar /> */}
      <Html
        style={{
          position: "fixed",
          // top: '-100px',
          right: "20px",
          pointerEvents: "none",
        }}
        fullscreen
      >
        <button
          onClick={toggleAnimation}
          style={{
            padding: "8px 16px",
            background: isAnimating ? "#ff4444" : "#44ff44",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            pointerEvents: "auto",
          }}
        >
          {isAnimating ? "Stop Sun" : "Start Sun"}
        </button>
      </Html>
      <Html
        style={{
          position: "fixed",
          right: "40px",
          bottom: "20px",
          pointerEvents: "none",
        }}
        fullscreen
      >
        <button
          onClick={startTour}
          style={{
            padding: "8px 16px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            pointerEvents: "auto",
            marginLeft: "100px"
          }}
        >
          Start Tour
        </button>
        <button
          onClick={() => quickMove(
            new Vector3(-140, 110, 90),
            new Vector3(0, 5, 0)
          )}
          style={{
            padding: "8px 16px",
            background: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            pointerEvents: "auto",
            marginLeft: "10px"
          }}
        >
          Overview
        </button>
      </Html>
      <Html
        fullscreen
        style={{
          position: "fixed",
          left: "0px",
          top: "40px",
          // transform: "translateX(-%)",
          // zIndex: 1000,
        }}
        center
      >
        <EquipmentStatus />
        <BessStatus />
        <GridStatus />
      </Html>
    </>
  );
}
