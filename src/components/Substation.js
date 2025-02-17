import { OrbitControls, useHelper } from "@react-three/drei";
import {
  TextureLoader,
  RepeatWrapping,
  Vector3,
  Spherical,
} from "three";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useState, useRef, useEffect } from "react";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { TransformerGroupSystem } from "./TransformerSystem";
import { Wire } from "./common/Wire";
import { BessContainer } from "./BessContainer";
import {
  Sky,
} from "@react-three/drei";
import * as THREE from "three";
import "./platform_style.css"; // You'll need to create this file
import { useCameraTour } from './CameraTour';
import { useAutoReset } from '../hooks/useAutoReset';
import { SolarArray } from './solar/SolarArray';
import { Dashboard } from "./dashboard/Dashboard";

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
  const containerSpacingX = 30;
  const containerSpacingZ = 20;

  return (
    <group>
      {[0, 1].map((row) => (
        [0, 1, 2].map((col) => (
          <BessContainer
            key={`bess-${row}-${col}`}
            name={`BESS Container ${row * 3 + col + 1}`}
            position={[
              startX + col * containerSpacingX, 
              4, 
              startZ + row * containerSpacingZ
            ]}
            rotation={[0, Math.PI, 0]}
            scale={[0.01, 0.01, 0.01]}
          />
        ))
      ))}
    </group>
  );
}

function TransformerToBessWires({ transformerStartX, transformerZ, bessStartX, bessZ, flowDirection = 1 }) {
  const transformerSpacing = 40;
  const containerSpacingX = 30;
  const containerSpacingZ = 20;
  
  return (
    <group>
      {/* Connect transformers 4-6 (indices 3-5) to BESS containers */}
      {[3, 4, 5].map((transformerIndex) => {
        const transformerPos = new Vector3(
          transformerStartX + (transformerIndex * 20), 
          6, 
          transformerZ
        );
        
        // Each transformer connects to two adjacent BESS containers
        const bessIndex = transformerIndex - 3; // Map 3,4,5 to 0,1,2 for BESS connections
        return [0, 1].map((row) => {
          const bessPos = new Vector3(
            10 + (bessIndex * containerSpacingX),
            4,
            0 + (row * containerSpacingZ)
          );
          
          const midPoint1 = new Vector3(
            transformerPos.x,
            transformerPos.y + 2,
            transformerPos.z + 10
          );
          
          const midPoint2 = new Vector3(
            (transformerPos.x + bessPos.x) / 2,
            5,
            (transformerPos.z + bessPos.z) / 2
          );

          return (
            <group key={`transformer-bess-wire-${transformerIndex}-${row}`}>
              <Wire
                points={[transformerPos, midPoint1, midPoint2, bessPos]}
                radius={0.08}
                animated={true}
                flowDirection={flowDirection}
              />
              {[-0.8, 0.8].map((offset, i) => (
                <Wire
                  key={`side-wire-${i}`}
                  points={[
                    new Vector3(transformerPos.x + offset, transformerPos.y, transformerPos.z),
                    new Vector3(midPoint1.x + offset, midPoint1.y, midPoint1.z),
                    new Vector3(midPoint2.x + offset, midPoint2.y, midPoint2.z),
                    new Vector3(bessPos.x + offset, bessPos.y, bessPos.z)
                  ]}
                  radius={0.08}
                  animated={true}
                  flowDirection={flowDirection}
                />
              ))}
            </group>
          );
        });
      })}
    </group>
  );
}

// Add this configuration near the Platform component
const ISOLATION_GROUP_CONFIG = {
  startX: 62, // leftmost X position
  startZ: -65,
  spacing: 21, // gap between groups
  count: 6, // total number of groups
  transformerZ: -30 // target Z position for wires
};

function SolarToTransformerWires({ solarStartX, solarStartZ, transformerStartX, transformerZ }) {
  const trunkHeight = 8;
  const branchHeight = 6;
  
  return (
    <group>
      {/* Main trunk wire running parallel to solar arrays */}
      <Wire
        points={[
          new Vector3(solarStartX - 5, trunkHeight, solarStartZ + 15),
          new Vector3(solarStartX + 55, trunkHeight, solarStartZ + 15),
        ]}
        radius={0.12}
        animated={true}
      />

      {/* Branch wires connecting solar arrays to trunk */}
      {[0, 1, 2].map((row) => (
        <Wire
          key={`solar-branch-${row}`}
          points={[
            new Vector3(solarStartX + (row * 20), branchHeight, solarStartZ),
            new Vector3(solarStartX + (row * 20), trunkHeight, solarStartZ + 15),
          ]}
          radius={0.08}
          animated={true}
        />
      ))}

      {/* Connection wires from trunk to first three transformers */}
      {[0, 1, 2].map((index) => (
        <Wire
          key={`trunk-transformer-${index}`}
          points={[
            new Vector3(solarStartX + (index * 20), trunkHeight, solarStartZ + 15),
            new Vector3(transformerStartX + (index * 20), 6, transformerZ),
          ]}
          radius={0.1}
          animated={true}
        />
      ))}
    </group>
  );
}

export default function Substation({ districtId, initialCameraPosition }) {
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

  const { camera } = useThree()

  useEffect(() => {
    if (initialCameraPosition) {
      camera.position.copy(initialCameraPosition.position)
      if (initialCameraPosition.target) {
        camera.lookAt(initialCameraPosition.target)
      }
      camera.updateProjectionMatrix()
    }
  }, [])

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
        <planeGeometry args={[300, 300, 10]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      <HighVoltageTower startX={0} startZ={-200} />
      {/* <HighVoltageTower startX={0} startZ={0} /> */}

      <SolarArray
        rows={6}
        cols={10}
        startX={-100}  // Moved to left side
        startZ={0}     // Aligned with BESS containers
        scale={1.5}
        gapX={5.5}
        gapZ={3}
      />

      <SolarToTransformerWires
        solarStartX={-80}
        solarStartZ={0}
        transformerStartX={transformerGroup_startX - 90}
        transformerZ={transformerGroup_startZ}
      />

      {Array.from({ length: ISOLATION_GROUP_CONFIG.count }).map((_, index) => (
        <HighVoltageIsolationGroup
          key={`isolation-group-${index}`}
          x={ISOLATION_GROUP_CONFIG.startX - (index * ISOLATION_GROUP_CONFIG.spacing)}
          z={ISOLATION_GROUP_CONFIG.startZ}
          endZ={ISOLATION_GROUP_CONFIG.transformerZ - (index < 2 ? 4 : 3)}
        />
      ))}

      <IsolationRackGroup x={-13} z={ISOLATION_GROUP_CONFIG.startZ + 5} />
      <TransformerGroupSystem
        startX={transformerGroup_startX + 10}
        z={transformerGroup_startZ}
        gap={20}
      />

      <Rack />
      <BessContainerGroup 
        startX={10} 
        startZ={0}     // First row position
      />
      <TransformerToBessWires
        transformerStartX={transformerGroup_startX - 90}
        transformerZ={transformerGroup_startZ}
        bessStartX={-60}
        bessZ={0}
        flowDirection={-1}
      />
      
      {/* <TransformerGroupSystem
        startX={transformerGroup_startX + 10}
        z={transformerGroup2_Z}
        gap={20}
        flowDirection={-1}
      /> */}
      <Dashboard 
        isAnimating={isAnimating}
        onToggleAnimation={toggleAnimation}
        onStartTour={startTour}
        onQuickMove={() => quickMove(
          new Vector3(-140, 110, 90),
          new Vector3(0, 5, 0)
        )}
      />
    </>
  );
}
