import { useFrame, useThree } from "@react-three/fiber";
import { RefObject } from "react";
import * as THREE from "three";

export default function CameraFollower({
  targetRef,
}: {
  targetRef: React.RefObject<THREE.Object3D>;
}) {
  const { camera } = useThree();
  const cameraOffset = new THREE.Vector3(0, 5, -10);

  useFrame(() => {
    if (!targetRef.current) return;

    const targetPosition = targetRef.current.position.clone();
    const desiredPosition = targetPosition.clone().add(cameraOffset);

    camera.position.lerp(desiredPosition, 0.1);
    camera.lookAt(targetPosition);
  });

  return null;
}
