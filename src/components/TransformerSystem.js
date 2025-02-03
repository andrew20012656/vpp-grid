import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { Transformer } from "./transformer";
import { Wire } from "./Wire";
import { Vector3 } from "three";

function TransformerGroup({ x, z }) {
  const fbx = useLoader(FBXLoader, "/models/transformer-rack.FBX");

  return (
    <>
      <group>
        <primitive
          object={fbx.clone()}
          name="变压器架"
          scale={[0.001, 0.001, 0.001]}
          position={[x + 12.5, 0, z]}
        />
        <Transformer
          position={[x - 0.5, 1, z - 3]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[1.3, 1.3, 1.3]}
        />
        <Wire
          points={[
            new Vector3(x - 3, 4, z - 2.05),
            new Vector3(x - 3, 7, z - 2.375),
            new Vector3(x - 3, 10, z - 2.7),
          ]}
          radius={0.04}
        />
        <Wire
          points={[
            new Vector3(x -0.6, 4, z - 2.05),
            new Vector3(x -0.6, 7, z - 2.375),
            new Vector3(x -0.6, 10, z - 2.7),
          ]}
          radius={0.04}
        />
        <Wire
          points={[
            new Vector3(x +1.25, 4, z - 2.05),
            new Vector3(x +1.25, 7, z - 2.375),
            new Vector3(x +1.25, 10, z - 2.7),
          ]}
          radius={0.04}
        />
        <Wire
          points={[
            new Vector3(x -1.5, 3.5, z - 3.5),
            new Vector3(x - 1.5, 7, z - 3),
            new Vector3(x - 1.5, 10, z - 2.7),
          ]}
          radius={0.04}
        />
      </group>
    </>
  );
}

export function TransformerGroupSystem({ startX, z, gap }) {
  return (
    <group>
      {[...Array(6)].map((_, index) => (
        <TransformerGroup key={index} x={startX - index * gap} z={z} />
      ))}
    </group>
  );
}
