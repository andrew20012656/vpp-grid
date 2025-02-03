import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const BessContainer = ({ position = [0, 0, 0], rotation = [0, 0, Math.PI/2], scale = [1, 1, 1] }) => {
  const fbx = useLoader(FBXLoader, "/models/bess-container2.fbx");

  return (
    <group>
      <primitive
        object={fbx.clone()}
        name="BESS容器"
        position={position}
        rotation={rotation}
        scale={scale}
      />
    </group>
  );
}

export { BessContainer };
export default BessContainer;

