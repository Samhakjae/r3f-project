import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const FollowCamera = ({
  targetRef,
}: {
  targetRef: React.RefObject<THREE.Object3D>;
}) => {
  const { camera } = useThree();
  useFrame(() => {
    if (!targetRef.current) return;

    const targetPos = targetRef.current.position.clone();
    const offset = new THREE.Vector3(6, 30, 35); // 유지할 고정 높이
    const isMobile = window.innerWidth <= 900;
    const targetPosition = isMobile
      ? { x: 6, y: 50, z: 55 } // 모바일용
      : { x: 6, y: 30, z: 35 }; // 데스크탑용

    // Follow x and z
    camera.position.x = targetPos.x + targetPosition.x;
    camera.position.z = targetPos.z + targetPosition.z;
    camera.position.y = targetPosition.y; // 고정된 y

    camera.lookAt(new THREE.Vector3(targetPos.x, 0, targetPos.z)); // 항상 아래를 바라보게
  });

  return null;
};

export default FollowCamera;
