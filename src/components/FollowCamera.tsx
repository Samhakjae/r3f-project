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

    // Follow x and z
    camera.position.x = targetPos.x + offset.x;
    camera.position.z = targetPos.z + offset.z;
    camera.position.y = offset.y; // 고정된 y

    camera.lookAt(new THREE.Vector3(targetPos.x, 0, targetPos.z)); // 항상 아래를 바라보게
  });

  return null;
};

export default FollowCamera;
