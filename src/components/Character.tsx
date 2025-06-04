import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useEffect, useRef, forwardRef } from "react";
import { Group } from "three";
import { useAnimations } from "@react-three/drei";
import * as THREE from "three";
import FollowCamera from "./FollowCamera";

const Character = forwardRef<Group, any>((props, ref) => {
  const { targetPos, isMoving, onArrive } = props;
  const gltf = useLoader(GLTFLoader, "/models/chung/chung-second-walk.glb");
  const gltf2 = useLoader(GLTFLoader, "/models/chung/chung-idle-ver2.glb");
  const group = useRef<Group>(null);
  const isMobile = window.innerWidth <= 900;
  const startPosition = isMobile
    ? { x: -30, y: 2, z: 10 } // 모바일용
    : { x: -50, y: 2, z: 10 }; // 데스크탑용

  useEffect(() => {
    if (!ref) return;
    if (typeof ref === "function") {
      ref(group.current);
    } else {
      (ref as React.MutableRefObject<Group | null>).current = group.current;
    }
  }, [ref]);

  const walkActions = useAnimations(gltf.animations, group);
  const { actions: idleActions } = useAnimations(gltf2.animations, group);
  gltf.scene.traverse((child) => {});
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
    // No longer overwrite walkActions, keep both animations separate
  }, [gltf2, walkActions.actions]);

  useEffect(() => {
    const current = isMoving
      ? walkActions.actions?.["ArmatureAction"]
      : idleActions?.["ArmatureAction"];
    const previous = isMoving
      ? idleActions?.["ArmatureAction"]
      : walkActions.actions?.["ArmatureAction"];

    if (previous && previous.isRunning()) {
      previous.fadeOut(0.3);
    }

    if (current) {
      current.timeScale = isMoving ? 1 : 0.3;
      current.reset().fadeIn(0.3).play();
    }

    return () => {
      current?.stop();
    };
  }, [isMoving, walkActions.actions, idleActions]);

  useFrame(() => {
    if (group.current && group.current?.position.distanceTo(targetPos) > 1) {
      const clampedTarget = targetPos.clone();
      clampedTarget.x = THREE.MathUtils.clamp(clampedTarget.x, -50, 50);
      clampedTarget.z = THREE.MathUtils.clamp(clampedTarget.z, -50, 50);

      const direction = group.current.position
        .clone()
        .sub(clampedTarget)
        .normalize()
        .multiplyScalar(0.09);

      group.current?.position.sub(direction);
      group.current.lookAt(clampedTarget);
    } else {
      if (isMoving && onArrive) onArrive();
    }
  });

  return (
    <group>
      <primitive
        ref={group}
        object={gltf.scene}
        position={[startPosition.x, startPosition.y, startPosition.z]}
        {...props}
      />
      {props.changeCamera && <FollowCamera targetRef={group} />}
    </group>
  );
});

export default Character;
