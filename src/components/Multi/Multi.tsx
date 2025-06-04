import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Group } from "three";
import * as THREE from "three";

export default function Multi(props: { showMultiAnimation: boolean }) {
  //모델링 구현 코드
  const gltf = useGLTF("/models/multi/Multi_act1_ver2.glb");
  const gltf2 = useGLTF("/models/multi/Multi_act2_ver2.glb");
  const group = useRef<Group>(null);
  const group2 = useRef<Group>(null);
  const { actions } = useAnimations(gltf.animations, group);
  const { actions: actions2 } = useAnimations(gltf2.animations, group2);

  useEffect(() => {
    if (actions) {
      const action = Object.values(actions);
      action.forEach((action) => {
        action.reset();
        action.time = 0.01;
        action.setLoop(THREE.LoopRepeat);
        action.clampWhenFinished = true;
        action.timeScale = 0.5;
        action.fadeIn(0.5).play();
      });
    }
  }, []);

  useEffect(() => {
    if (actions2) {
      const action = Object.values(actions2);
      action.forEach((action) => {
        action.reset();
        action.time = 0.01;
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
        action.timeScale = 0.5;
        action.fadeIn(0.5).play();
      });
    }
  }, [props.showMultiAnimation]);

  return (
    <>
      <primitive
        ref={group}
        object={gltf.scene}
        position={[43, 2, 65]}
        rotation={[0, -Math.PI / 2, 0]}
        visible={!props.showMultiAnimation}
      />

      <primitive
        object={gltf2.scene}
        ref={group2}
        position={[43, 2, 65]}
        rotation={[0, -Math.PI / 2, 0]}
        visible={props.showMultiAnimation}
      />

      {/* <primitive    아직 파일 없음
        object={gltf3.scene}
        ref={group3}
        position={[20, 2, 20]}
        rotation={[0, -Math.PI / 2, 0]}
      /> */}
    </>
  );
}
