import { TubeGeometry, CatmullRomCurve3 } from "three";
import { useMemo } from "react";

export function Wire({ points, radius = 0.08 }) {
  const curve = useMemo(() => new CatmullRomCurve3(points), [points]);
  const tubeGeometry = useMemo(
    () => new TubeGeometry(curve, 100, radius, 5, false),
    [curve, radius]
  );

  return (
    <mesh>
      <primitive object={tubeGeometry} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}