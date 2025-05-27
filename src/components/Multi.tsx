import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Group } from "three";
import * as THREE from "three";

export default function Multi() {
  const gltf = useGLTF("/models/multi/muti-act1.glb");
  const group = useRef<Group>(null);
  const { actions } = useAnimations(gltf.animations, group);

  useEffect(() => {
    if (actions) {
      const action = Object.values(actions);
      action.forEach((action) => {
        action.reset();
        action.time = 0.01;
        action.setLoop(THREE.LoopRepeat);
        action.clampWhenFinished = true;
        action.fadeIn(0.5).play();
      });
    }
  }, []);

  return (
    <>
      <primitive
        object={gltf.scene}
        ref={group}
        position={[20, 2, 20]}
        rotation={[0, -Math.PI / 2, 0]}
      />
    </>
  );
}
