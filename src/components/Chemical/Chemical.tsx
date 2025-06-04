import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Group } from "three";
import * as THREE from "three";

export default function Chemical(props: { showChemicalAnimaton: boolean }) {
  //모델링 구현 코드
  const gltf = useGLTF("/models/chemical/che1.glb");
  const gltf2 = useGLTF("/models/chemical/che222.glb");
  const gltf3 = useGLTF("/models/chemical/che3.glb");
  const group = useRef<Group>(null);
  const group2 = useRef<Group>(null);
  const group3 = useRef<Group>(null);
  const { actions } = useAnimations(gltf.animations, group);
  const { actions: actions2 } = useAnimations(gltf2.animations, group2);
  const { actions: actions3 } = useAnimations(gltf3.animations, group3);
  const [showAct3, setShowAct3] = useState(false);

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
    if (actions2 && props.showChemicalAnimaton) {
      const action = Object.values(actions2);
      action.forEach((action) => {
        action.reset();
        action.time = 0.01;
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
        action.timeScale = 0.5;
        action.fadeIn(0.5).play();

        setTimeout(() => {
          action.getMixer().addEventListener("finished", () => {
            setShowAct3(true);
          });
        }, 4000);
      });
    }
  }, [props.showChemicalAnimaton]);

  useEffect(() => {
    if (actions3 && showAct3) {
      const action = Object.values(actions3);
      action.forEach((action) => {
        action.reset();
        action.time = 0.01;
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
        action.timeScale = 0.5;
        action.fadeIn(0.5).play();
      });
    }
  }, [showAct3, actions3]);

  return (
    <>
      <primitive
        ref={group}
        object={gltf.scene}
        position={[8, 2, 75]}
        rotation={[0, Math.PI / 2, 0]}
        visible={!props.showChemicalAnimaton}
      />

      <primitive
        object={gltf2.scene}
        ref={group2}
        position={[8, 2, 75]}
        rotation={[0, Math.PI / 2, 0]}
        visible={props.showChemicalAnimaton && !showAct3}
      />

      <primitive
        object={gltf3.scene}
        ref={group3}
        position={[8, 2, 75]}
        rotation={[0, Math.PI / 2, 0]}
        visible={showAct3}
      />
    </>
  );
}
