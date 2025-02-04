import { TubeGeometry, CatmullRomCurve3, Color } from "three";
import { useRef, useMemo } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

const ElectricFlowMaterial = shaderMaterial(
  { 
    time: 0, 
    color: new Color(0x00ffff),
    flowDirection: 1.0  // Make sure flowDirection is initialized here
  },
  `
  varying vec2 vUv;
  uniform float time;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  `
  varying vec2 vUv;
  uniform float time;
  uniform float flowDirection;
  uniform vec3 color;
  
  void main() {
    float wave = sin(vUv.x * 20.0 + time * 5.0 * flowDirection) * 0.5 + 0.5;
    vec3 glow = color * wave;
    gl_FragColor = vec4(glow, 1.0);
  }
  `
);

// Register the custom material
extend({ ElectricFlowMaterial });

export function Wire({ points, radius = 0.08, animated = false, flowDirection = 1 }) {
  const materialRef = useRef();
  const curve = useMemo(() => new CatmullRomCurve3(points), [points]);
  const tubeGeometry = useMemo(
    () => new TubeGeometry(curve, 100, radius, 5, false),
    [curve, radius]
  );

  useFrame(({ clock }) => {
    if (animated && materialRef.current) {
      materialRef.current.time = clock.elapsedTime;  // Changed from uniforms.time.value
      materialRef.current.flowDirection = flowDirection;  // Changed from uniforms.flowDirection.value
    }
  });

  return (
    <mesh>
      <primitive object={tubeGeometry} />
      {animated ? (
        <electricFlowMaterial 
          ref={materialRef} 
          attach="material"
          flowDirection={flowDirection}
          color={new Color(0x00ffff)} 
        />
      ) : (
        <meshStandardMaterial color="gray" />
      )}
    </mesh>
  );
}