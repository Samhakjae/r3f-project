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

export default function Kyungyung(props: any) {
  const gltf = useLoader(GLTFLoader, "/models/kyungyung/kyungyung_first.glb");
  const gltf2 = useLoader(GLTFLoader, "/models/kyungyung/kyungyung_second.glb");
  const gltf3 = useLoader(GLTFLoader, "/models/kyungyung/kyungyung_third.glb");
  const group = useRef<Group>(null);
  const group2 = useRef<Group>(null);
  const group3 = useRef<Group>(null);
  const { actions } = useAnimations(gltf.animations, group);
  const { actions: actions2 } = useAnimations(gltf2.animations, group2);
  const { actions: actions3 } = useAnimations(gltf3.animations, group3);
  const [startSecond, setStartSecond] = useState(false);
  const [startThird, setStartThird] = useState(false);
  const [showThird, setShowThird] = useState(false);

  useEffect(() => {
    if (actions) {
      const firstActions = Object.values(actions);
      let finishedCount = 0;
      const total = firstActions.length;

      firstActions.forEach((action) => {
        action.reset();
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
        action.fadeIn(0.5).play();
        action.getMixer().addEventListener("finished", () => {
          finishedCount++;
          if (finishedCount === total) {
            setStartSecond(true);
          }
        });
      });
    }
  }, []);

  useEffect(() => {
    if (startSecond && actions2) {
      const secondActions = Object.values(actions2);
      let finishedCount = 0;
      const total = secondActions.length;

      secondActions.forEach((action) => {
        action.reset();
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
        action.fadeIn(0.5).play();
        action.getMixer().addEventListener("finished", () => {
          finishedCount++;
          if (finishedCount === total) {
            setStartThird(true);
          }
        });
      });
    }
  }, [startSecond]);

  useEffect(() => {
    setTimeout(() => {
      if (actions3) {
        const thirdActions = Object.values(actions3);
        thirdActions.forEach((action) => {
          action.reset();
          action.setLoop(THREE.LoopOnce, 1);
          action.clampWhenFinished = true;
          action.fadeIn(0.5).play();
          setShowThird(true);
        });
      }
    }, 3000);
  }, []);

  return (
    <>
      <primitive object={gltf.scene} ref={group} position={[70, -0.01, 30]} />
      {startSecond ? (
        <primitive
          object={gltf2.scene}
          ref={group2}
          position={[70, -0.02, 30]}
        />
      ) : null}

      {showThird ? (
        <primitive
          object={gltf3.scene}
          ref={group3}
          position={[70, -0.02, 30]}
        />
      ) : null}
    </>
  );
}
