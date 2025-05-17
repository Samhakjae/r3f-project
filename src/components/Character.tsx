import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useEffect, useRef, forwardRef } from "react";
import { Group } from "three";
import { useAnimations } from "@react-three/drei";
import * as THREE from "three";

const Character = forwardRef<Group, any>((props, ref) => {
  const { targetPos, isMoving, onArrive } = props;
  const gltf = useLoader(GLTFLoader, "/models/chung-walk.glb");
  const group = useRef<Group>(null);
  const { actions } = useAnimations(gltf.animations, group);

  useEffect(() => {
    const action = actions?.["ArmatureAction"];

    if (isMoving) {
      action?.reset().fadeIn(0.3).play();
    } else {
      action?.fadeOut(0.3);
    }

    return () => action?.stop();
  }, [isMoving, actions]);

  useFrame(() => {
    if (group.current && group.current?.position.distanceTo(targetPos) > 1) {
      const direction = group.current.position
        .clone()
        .sub(targetPos)
        .normalize()
        .multiplyScalar(0.35);

      group.current?.position.sub(direction);
      group.current.lookAt(targetPos);
    } else {
      if (isMoving && onArrive) onArrive();
    }
  });

  return <primitive ref={group} object={gltf.scene} {...props} />;
});

export default Character;
