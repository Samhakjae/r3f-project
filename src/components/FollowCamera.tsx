import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

const FollowCamera = ({
  targetRef,
}: {
  targetRef: React.RefObject<THREE.Object3D>;
}) => {
  const { camera } = useThree();
  useFrame(() => {
    if (!targetRef.current) return;

    const targetPos = targetRef.current.position.clone();
    const offset = new THREE.Vector3(6, 42, 42); // 유지할 고정 높이
    const desiredPos = new THREE.Vector3(targetPos.x, 0, targetPos.z).add(
      offset
    ); // 수평 위치만 따라감

    // 느리게 수평 따라가는 효과
    camera.position.lerp(desiredPos, 0.05);
    camera.lookAt(new THREE.Vector3(targetPos.x, 0, targetPos.z)); // 항상 아래를 바라보게
  });

  return null;
};

export default FollowCamera;
