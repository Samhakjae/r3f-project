import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import { MathUtils, Vector3 } from "three";
import { degToRad, lerp } from "three/src/math/MathUtils.js";
import Character from "./Character";

export default function CharacterController({
  animaitonType,
}: CharacterMoveProps) {
  const [animation, setAnimation] = useState<string>(animaitonType);

  useEffect(() => {
    const action = actions[animation];
    action?.reset().fadeIn(0.4).play();

    return () => {
      action?.fadeOut(0.3);
    };
  }, [animation]);

  useFrame(() => {
    if (
      group.current &&
      group.current?.position.distanceTo(targetPos) > 1 // 움직임 감지 기준
    ) {
      const direction = group.current.position
        .clone()
        .sub(targetPos)
        .normalize() // 단위 벡터로 변환(길이 1)
        .multiplyScalar(0.3); // vector * scalar

      group.current?.position.sub(direction);
      group.current.lookAt(targetPos);
      setAnimation(animationType.ArmatureAction); // 움직임 O-> running 애니메이션 적용
    } else {
      setAnimation(animationType.idle); // 움직임 X-> idle 애니메이션 적용
    }
  });

  return null;
}
