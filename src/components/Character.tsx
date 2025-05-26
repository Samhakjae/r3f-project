import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useEffect, useRef, forwardRef } from "react";
import { Group } from "three";
import { useAnimations } from "@react-three/drei";
import * as THREE from "three";
import FollowCamera from "./FollowCamera";

const Character = forwardRef<Group, any>((props) => {
  const { targetPos, isMoving, onArrive } = props;
  const gltf = useLoader(GLTFLoader, "/models/chung-walk.glb");
  const group = useRef<Group>(null);
  const { actions } = useAnimations(gltf.animations, group);
  console.log("props:", props);
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      console.log(child.name);
    }
  });
  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (
        child.isMesh &&
        (child.name === "ohh" || child.name === "small scene")
      ) {
        child.visible = false;
      }
    });
  }, [gltf]);

  useEffect(() => {
    const action = actions?.["ArmatureAction"];

    if (isMoving) {
      action?.reset().fadeIn(0.3).play();
    } else {
      action?.fadeOut(1);
    }

    return () => action?.stop();
  }, [isMoving, actions]);

  useFrame(() => {
    if (group.current && group.current?.position.distanceTo(targetPos) > 1) {
      const clampedTarget = targetPos.clone();
      clampedTarget.x = THREE.MathUtils.clamp(clampedTarget.x, -200, 200);
      clampedTarget.z = THREE.MathUtils.clamp(clampedTarget.z, -200, 200);

      const direction = group.current.position
        .clone()
        .sub(clampedTarget)
        .normalize()
        .multiplyScalar(0.12);

      group.current?.position.sub(direction);
      group.current.lookAt(clampedTarget);
    } else {
      if (isMoving && onArrive) onArrive();
    }
  });
  console.log(props.changeCamera);

  return (
    <>
      <primitive
        ref={group}
        object={gltf.scene}
        position={[-50, 2, 10]}
        {...props}
      />
      {props.changeCamera && <FollowCamera targetRef={group} />}
    </>
  );
});

export default Character;
