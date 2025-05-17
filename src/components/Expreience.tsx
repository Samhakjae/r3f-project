import { useState, useRef } from "react";
import { Box, Environment, OrbitControls } from "@react-three/drei";
import Character from "./Character";
import * as THREE from "three";
import { ThreeEvent, useFrame } from "@react-three/fiber";

export default function Experience() {
  const [targetPos, setTargetPos] = useState<THREE.Vector3>(
    new THREE.Vector3(0, 2, 0)
  );
  const [isMoving, setIsMoving] = useState(false);
  const characterRef = useRef<THREE.Group>(null);

  return (
    <>
      <axesHelper scale={100} />
      <Environment preset="sunset" />
      <ambientLight intensity={1} />

      <Character
        ref={characterRef}
        animation="ArmatureAction"
        targetPos={targetPos}
        isMoving={isMoving}
        onArrive={() => {
          setIsMoving(false);
        }}
      />

      <Box
        position={[0, -1, 0]}
        args={[100, 2, 100]}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          setTargetPos(new THREE.Vector3(e.point.x, 2, e.point.z));
          setIsMoving(true);
        }}
      >
        <meshStandardMaterial />
      </Box>
    </>
  );
}
