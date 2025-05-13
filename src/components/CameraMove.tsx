import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";

import * as THREE from "three";

export default function CameraMove({ move }: { move: boolean }) {
  const { camera } = useThree();
  const initialPos = new THREE.Vector3(0, 10, 0);
  const startPos = useRef(new THREE.Vector3(0, 10, 0));
  const finalTargetPos = useRef(new THREE.Vector3(0, 10, 0));
  const targetLook = new THREE.Vector3(0, 0, 0);
  const hasSetTarget = useRef(false);
  const currentLook = useRef(new THREE.Vector3(0, 0, 0));
  const startTime = useRef<number | null>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    startPos.current.set(
      camera.position.x,
      camera.position.y,
      camera.position.z
    );
    // Removed setting finalTargetPos here to avoid early jump
  }, []);

  useEffect(() => {
    if (move && !hasSetTarget.current) {
      startTime.current = performance.now();
      hasSetTarget.current = true;
    }
  }, [move]);

  useFrame(() => {
    if (!hasSetTarget.current || startTime.current === null) {
      camera.lookAt(targetLook);
      return;
    }

    const elapsed = performance.now() - startTime.current;
    const duration = 2500;
    const t = Math.min(elapsed / duration, 1);
    const easeT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    if (!hasStarted.current && t > 0) {
      hasStarted.current = true;

      startPos.current.set(
        camera.position.x,
        camera.position.y,
        camera.position.z
      );
      finalTargetPos.current.set(6, 20, 20);

      return; // skip first frame to avoid jump
    }

    if (!hasStarted.current) return;

    const x = THREE.MathUtils.lerp(
      startPos.current.x,
      finalTargetPos.current.x,
      easeT
    );
    const y = THREE.MathUtils.lerp(
      startPos.current.y,
      finalTargetPos.current.y,
      easeT
    );
    const z = THREE.MathUtils.lerp(
      startPos.current.z,
      finalTargetPos.current.z,
      easeT
    );

    camera.position.set(x, y, z);

    currentLook.current.lerp(targetLook, 0.05);
    camera.lookAt(currentLook.current);
  });

  return null;
}
