import { useTexture } from "@react-three/drei";

export default function Floor() {
  const texture = useTexture("/floor/floor.png"); // public 폴더 기준 경로

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
      position={[35, 0.1, 35]}
    >
      <planeGeometry args={[120, 120]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
