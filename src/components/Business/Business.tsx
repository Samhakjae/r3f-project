import { useRef, useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Group } from "three";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const models = [
  "/models/kyungyung/kyungyung_first.glb",
  "/models/kyungyung/kyungyung_second.glb",
  "/models/kyungyung/kyungyung_third.glb",
];

export default function Business(props: { showAnimation: boolean }) {
  const gltf = useGLTF("/models/kyungyung/kyungyung_1.glb");
  const gltf2 = useGLTF("/models/kyungyung/kyungyung_2.glb");
  const gltf3 = useGLTF("/models/kyungyung/kyungyung_3.glb");
  const group = useRef<Group>(null);
  const group2 = useRef<Group>(null);
  const group3 = useRef<Group>(null);
  const { actions } = useAnimations(gltf.animations, group);
  const { actions: actions2 } = useAnimations(gltf2.animations, group2);
  const { actions: actions3 } = useAnimations(gltf3.animations, group3);
  const [startSecond, setStartSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);

  useEffect(() => {
    if (actions && props.showAnimation) {
      const firstActions = Object.values(actions);
      let finishedCount = 0;
      const total = firstActions.length;

      firstActions.forEach((action) => {
        action.reset();
        action.time = 0.01;
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
        action.timeScale = 0.5;
        action.fadeIn(0.5).play();
        action.getMixer().addEventListener("finished", () => {
          finishedCount++;
          if (finishedCount === total) {
            setStartSecond(true);
          }
        });
      });
    }
  }, [props.showAnimation]);

  useEffect(() => {
    if (startSecond && actions2 && props.showAnimation) {
      const secondActions = Object.values(actions2);
      let finishedCount = 0;
      const total = secondActions.length;

      secondActions.forEach((action) => {
        action.reset();
        action.time = 0.01;
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
        action.timeScale = 0.5;
        action.fadeIn(0.5).play();
        action.getMixer().addEventListener("finished", () => {
          finishedCount++;
          if (finishedCount === total) {
          }
        });
      });
    }
  }, [startSecond]);

  useEffect(() => {
    setTimeout(() => {
      if (actions3 && props.showAnimation) {
        const thirdActions = Object.values(actions3);
        thirdActions.forEach((action) => {
          action.reset();
          action.time = 0;
          action.setLoop(THREE.LoopOnce, 1);
          action.clampWhenFinished = true;
          action.timeScale = 0.1;
          action.fadeIn(0.5).play();
          setShowThird(true);
        });
      }
    }, 3000);
  }, [props.showAnimation]);

  return (
    <>
      {props.showAnimation ? (
        <>
          <primitive
            object={gltf.scene}
            ref={group}
            position={[55, -0.02, 28]}
          />
          {startSecond ? (
            <primitive
              object={gltf2.scene}
              ref={group2}
              position={[55, -0.02, 28]}
            />
          ) : null}

          {showThird ? (
            <primitive
              object={gltf3.scene}
              ref={group3}
              position={[55, -0.02, 28]}
            />
          ) : null}
        </>
      ) : null}
    </>
  );
}
