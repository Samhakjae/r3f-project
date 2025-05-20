import { useState, useRef } from "react";
import { Box, Environment, Line, OrbitControls } from "@react-three/drei";
import Character from "./Character";
import * as THREE from "three";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import CameraMove from "./CameraMove";
import LineAnimation from "../test/LineAnimation";

export default function Experience() {
  const [move, setMove] = useState(false);
  const [targetPos, setTargetPos] = useState<THREE.Vector3>(
    new THREE.Vector3(-20, 2, 0)
  );
  const [isMoving, setIsMoving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePoint, setMousePoint] = useState<THREE.Vector3 | null>(null);
  const characterRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (isDragging && mousePoint) {
      setTargetPos(mousePoint);
      setIsMoving(true);
    }
  });

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
        args={[1000, 2, 1000]}
        onPointerDown={(e) => {
          setIsDragging(true);
          setMousePoint(new THREE.Vector3(e.point.x, 2, e.point.z));
        }}
        onPointerMove={(e) => {
          if (isDragging) {
            setMousePoint(new THREE.Vector3(e.point.x, 2, e.point.z));
          }
        }}
        onPointerUp={() => {
          if (mousePoint) {
            setTargetPos(mousePoint);
            setIsMoving(true);
          }
          setIsDragging(false);
          setMousePoint(null);
        }}
      >
        <meshStandardMaterial color="skyblue" />
      </Box>
    </>
  );
}
