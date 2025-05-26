import { useRef, useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Group } from "three";
import { useAnimations } from "@react-three/drei";
import * as THREE from "three";

const models = [
  "/models/kyungyung/kyungyung_first.glb",
  "/models/kyungyung/kyungyung_second.glb",
  "/models/kyungyung/kyungyung_third.glb",
];

export default function Department(props: any) {
  const gltf = useLoader(GLTFLoader, "/models/kyungyung/kyungyung_first.glb");
  const gltf2 = useLoader(GLTFLoader, "/models/kyungyung/kyungyung_second.glb");
  const group = useRef<Group>(null);
  const group2 = useRef<Group>(null);
  const { actions } = useAnimations(gltf.animations, group);
  const { actions: actions2 } = useAnimations(gltf2.animations, group2);
  const [startSecond, setStartSecond] = useState(false);
  const [startThird, setStartThird] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (actions) {
        if (actions) {
          Object.values(actions).forEach((action) => {
            action.reset();
            action.setLoop(THREE.LoopOnce, 1);
            action.clampWhenFinished = true;
            action.fadeIn(0.5).play();
          });
        }
        if (actions2) {
          Object.values(actions2).forEach((action) => {
            action?.reset();
            action.setLoop(THREE.LoopOnce, 1);
            action.clampWhenFinished = true;
            action.fadeIn(0.5).play();
          });
        }
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <primitive object={gltf.scene} ref={group} position={[-30, -0.01, 0]} />

      <primitive object={gltf2.scene} ref={group2} position={[15, -0.02, 0]} />
    </>
  );
}
