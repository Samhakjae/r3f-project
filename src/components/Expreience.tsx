import { useState, useRef, useEffect } from "react";
import { Box, Environment, Line, OrbitControls } from "@react-three/drei";
import Character from "./Character";
import * as THREE from "three";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import Department from "./Department";

export default function Experience({
  changeCamera,
}: {
  changeCamera: boolean;
}) {
  const [targetPos, setTargetPos] = useState<THREE.Vector3>(
    new THREE.Vector3(-50, 2, 10)
  );
  const [isMoving, setIsMoving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePoint, setMousePoint] = useState<THREE.Vector3 | null>(null);
  const [cameraFollow, setCameraFollow] = useState(false);
  const [clickBlocked, setClickBlocked] = useState(true);
  const [inZone, setInZone] = useState(false);
  const characterRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  useFrame(() => {
    if (clickBlocked) return;
    if (isDragging && mousePoint) {
      setTargetPos(mousePoint);
      if (!isMoving) setIsMoving(true);
    }

    if (characterRef.current) {
      const charPos = characterRef.current.position;
      const targetZone = new THREE.Vector3(2, 2);
      if (charPos.distanceTo(targetZone) < 10 && !inZone) {
        setInZone(true);
        camera.position.set(10, 30, 10);
        camera.lookAt(20, 2, 20);
        setClickBlocked(true);
      }
    }
  });

  // Automatically move to [0, 2, 0] after "시작하기" is clicked
  useEffect(() => {
    if (changeCamera) {
      setClickBlocked(true);
      const timer = setTimeout(() => {
        setTargetPos(new THREE.Vector3(0, 2, 0));
        setIsMoving(true);
        setTimeout(() => setClickBlocked(false), 3000); // 애니메이션 시간 후 클릭 허용
      }, 300); // 약간의 딜레이를 두면 자연스러움
      return () => clearTimeout(timer);
    }
  }, [changeCamera]);

  return (
    <>
      <axesHelper scale={100} />
      <Environment preset="sunset" />
      <ambientLight intensity={1} />

      {/* <Character
        ref={characterRef}
        animation="ArmatureAction"
        targetPos={targetPos}
        isMoving={isMoving}
        changeCamera={cameraFollow}
        onArrive={() => {
          setIsMoving(false);
          if (targetPos.equals(new THREE.Vector3(0, 2, 0))) {
            setCameraFollow(true);
          }
        }}
      /> */}

      <Department />

      <Box
        position={[0, -1, 0]}
        args={[1000, 2, 1000]}
        onPointerDown={(e) => {
          if (clickBlocked) return;
          setIsDragging(true);
          setMousePoint(new THREE.Vector3(e.point.x, 2, e.point.z));
        }}
        onPointerMove={(e) => {
          if (clickBlocked || !isDragging) return;
          setMousePoint(new THREE.Vector3(e.point.x, 2, e.point.z));
        }}
        onPointerUp={() => {
          if (clickBlocked) return;
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
