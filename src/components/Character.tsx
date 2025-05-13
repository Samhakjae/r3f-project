import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useEffect, useRef } from "react";
import { Group } from "three";
import { useAnimations } from "@react-three/drei";

export default function Character(props: string) {
  const gltf = useLoader(GLTFLoader, "/models/chung-walk.glb");
  const group = useRef<Group>(null);
  const { actions } = useAnimations(gltf.animations, group);

  useEffect(() => {
    if (actions && actions["ArmatureAction"]) {
      actions["ArmatureAction"].reset().fadeIn(0.3).play();
      return () => actions["ArmatureAction"]?.fadeOut(0.3);
    }
  }, [actions]);

  return <primitive ref={group} object={gltf.scene} {...props} />;
}
