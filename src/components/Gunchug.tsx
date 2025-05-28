import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Group } from "three";
import * as THREE from "three";

export default function Gunchug(props: { showArc: boolean }) {
  const gltf = useGLTF("/models/gunchug/arc111.glb");
  const gltf2 = useGLTF("/models/gunchug/arc222.glb");
  const gltf3 = useGLTF("/models/gunchug/ccc3.glb");

  const group = useRef<Group>(null);
  const group2 = useRef<Group>(null);
  const group3 = useRef<Group>(null);
  const { actions } = useAnimations(gltf.animations, group);
  const { actions: actions2 } = useAnimations(gltf2.animations, group2);
  const { actions: actions3 } = useAnimations(gltf3.animations, group3);
  const [startSecond, setStartSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);

  // useEffect(() => {
  //   if (actions && props.showArc) {
  //     const firstActions = Object.values(actions);
  //     let finishedCount = 0;
  //     const total = firstActions.length;

  //     firstActions.forEach((action) => {
  //       action.reset();
  //       action.time = 0.01;
  //       action.setLoop(THREE.LoopOnce, 1);
  //       action.clampWhenFinished = true;
  //       action.fadeIn(0.5).play();
  //       action.getMixer().addEventListener("finished", () => {
  //         finishedCount++;
  //         if (finishedCount === total) {
  //           setStartSecond(true);
  //         }
  //       });
  //     });
  //   }
  // }, [props.showArc]);

  // useEffect(() => {
  //   if (startSecond && actions2 && props.showArc) {
  //     const secondActions = Object.values(actions2);
  //     let finishedCount = 0;
  //     const total = secondActions.length;

  //     secondActions.forEach((action) => {
  //       action.reset();
  //       action.time = 0.01;
  //       action.setLoop(THREE.LoopOnce, 1);
  //       action.clampWhenFinished = true;
  //       action.fadeIn(0.5).play();
  //       action.getMixer().addEventListener("finished", () => {
  //         finishedCount++;
  //         if (finishedCount === total) {
  //         }
  //       });
  //     });
  //   }
  // }, [startSecond]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (actions3 && props.showArc) {
  //       const thirdActions = Object.values(actions3);
  //       thirdActions.forEach((action) => {
  //         action.reset();
  //         action.time = 0.01;
  //         action.setLoop(THREE.LoopOnce, 1);
  //         action.clampWhenFinished = true;
  //         action.fadeIn(0.5).play();
  //         setShowThird(true);
  //       });
  //     }
  //   }, 3000);
  // }, [props.showArc]);

  useEffect(() => {
    if (actions3) {
      const thirdActions = Object.values(actions3);
      thirdActions.forEach((action) => {
        action.reset();
        action.time = 0.01;
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
        action.fadeIn(0.5).play();
        setShowThird(true);
      });
    }
  });

  return (
    <>
      {/* {props.showArc ? (
        <>
          <primitive
            object={gltf.scene}
            ref={group}
            position={[-20, 2, -20]}
            rotation={[0, -Math.PI / 2, 0]}
          />
          {startSecond ? (
            <primitive
              object={gltf2.scene}
              ref={group2}
              position={[-20, 2, -20]}
              rotation={[0, -Math.PI / 2, 0]}
            />
          ) : null}

          {showThird ? (
            <primitive
              object={gltf3.scene}
              ref={group3}
              position={[-20, 2, -20]}
              rotation={[0, -Math.PI / 2, 0]}
            />
          ) : null}
        </>
      ) : null} */}

      <primitive
        object={gltf3.scene}
        ref={group3}
        position={[0, 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
    </>
  );
}
