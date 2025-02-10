import { useLoader } from "@react-three/fiber";
import { useState } from "react";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from 'three';
import { BessDetail } from './BessDetail';

const BessContainer = ({ position = [0, 0, 0], rotation = [0, 0, Math.PI/2], scale = [1, 1, 1], name = "BESS" }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [hovered, setHovered] = useState(false);
  const fbx = useLoader(FBXLoader, "/models/bess-container3.fbx");

  // Mock initial data
  const containerData = {
    name,
    temperature: "28.5",
    voltage: "400.0",
    current: "50.0",
    powerOutput: "500.0",
    efficiency: "90.0",
    status: "Operational"
  };

  // Calculate bounding box dimensions
  const bbox = new THREE.Box3().setFromObject(fbx);
  const size = bbox.getSize(new THREE.Vector3());

  const handleInteraction = (type, e) => {
    e.stopPropagation();
    if (type === 'click') {
      setShowDetails(true);
    } else if (type === 'over') {
      setHovered(true);
      document.body.style.cursor = 'pointer';
    } else if (type === 'out') {
      setHovered(false);
      document.body.style.cursor = 'auto';
    }
  };

  return (
    <>
      <group position={position} rotation={rotation} scale={scale}>
        <primitive
          object={fbx.clone()}
          name={name}
        />
        {/* Visible bounding box */}
        <mesh
          onClick={(e) => handleInteraction('click', e)}
          onPointerOver={(e) => handleInteraction('over', e)}
          onPointerOut={(e) => handleInteraction('out', e)}
        >
          <boxGeometry args={[size.x * 1.4, size.y * 1.4, size.z * 1.4]} />
          <meshBasicMaterial 
            color={hovered ? "#ff0000" : "#00ff00"}
            transparent
            opacity={0}
            // wireframe={true}
          />
        </mesh>
      </group>
      {showDetails && (
        <BessDetail 
          containerData={containerData}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
}

export { BessContainer };
export default BessContainer;

