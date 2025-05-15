import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useEffect, useRef } from "react";
import { Group } from "three";
import { useAnimations } from "@react-three/drei";
import * as THREE from "three";

type ActionName = "ArmatureAction";

const group = useRef<THREE.Group>();
const { scene, animations } = useGLTF("/models/chung-walk.glb");
const { actions } = useAnimations(animations, group);

export default function Character(props: any, targetPos: number) {
  const gltf = useLoader(GLTFLoader, "/models/chung-walk.glb");
  const group = useRef<Group>(null);
  const { actions } = useAnimations(gltf.animations, group);

  useEffect(() => {
    if (actions && actions["ArmatureAction"]) {
      actions["ArmatureAction"].reset().fadeIn(0.3).play();
      return () => actions["ArmatureAction"]?.fadeOut(0.3);
    }
  }, [actions]);

  useFrame(() => {
    if (
      group.current &&
      group.current?.position.distanceTo(props.targetPos) > 1
    ) {
      const direction = group.current.position
        .clone()
        .sub(props.targetPos)
        .normalize()
        .multiplyScalar(0.5);

      group.current?.position.sub(direction);
      group.current.lookAt(props.targetPos);
    }
  });

  return <primitive ref={group} object={gltf.scene} {...props} />;
}
