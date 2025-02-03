import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Breaker({ position , scale  }) {
  const breaker = useLoader(GLTFLoader, "/models/breaker.glb");
  return (
    <>
      <primitive
        object={breaker.scene}
        position={position}
        scale={scale}
        // children-0-cast-shadow
      />
    </>
  );
}
