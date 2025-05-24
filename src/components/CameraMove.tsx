import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import JEASINGS from "jeasings";

export default function CameraMove({ move }: { move: boolean }) {
  const { camera } = useThree();
  const hasSetTarget = useRef(false);

  useEffect(() => {
    if (move && !hasSetTarget.current) {
      hasSetTarget.current = true;

      new JEASINGS.JEasing(camera.position)
        .to({ x: 6, y: 38, z: 38 }, 3000)
        .easing(JEASINGS.Cubic.Out)
        .start();

      const lookTarget = new THREE.Vector3(0, 0, 0);
      new JEASINGS.JEasing(lookTarget)
        .to({ x: 0, y: 0, z: 0 }, 2500)
        .onUpdate(() => {
          camera.lookAt(lookTarget);
        })
        .start();
    }
  }, [move]);

  useFrame(() => {
    JEASINGS.update();
  });

  return null;
}
