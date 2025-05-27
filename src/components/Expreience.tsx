import { useState, useRef, useEffect, useMemo } from "react";
import { Box, Environment, Line, OrbitControls } from "@react-three/drei";
import Character from "./Character";
import * as THREE from "three";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import Kyungyung from "./Kyungyung";

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
  const characterRef = useRef<THREE.Group>(null);
  const [showAnimation, setShowAnimation] = useState(false);

  useFrame(() => {
    if (isDragging && mousePoint) {
      setTargetPos(mousePoint);
      if (!isMoving) setIsMoving(true);
    }

    if (characterRef.current) {
      const charPos = characterRef.current.position;
      const targetZone = new THREE.Vector3(50, 0, 20);
      if (charPos.distanceTo(targetZone) < 10 && !showAnimation) {
        setShowAnimation(true);
        console.log(showAnimation);
      }
    }
  });

  // Automatically move to [0, 2, 0] after "시작하기" is clicked
  useEffect(() => {
    if (changeCamera) {
      console.log("position set");
      setClickBlocked(true);
      const timer = setTimeout(() => {
        setTargetPos(new THREE.Vector3(0, 2, 0));
        setIsMoving(true);
        setTimeout(() => setClickBlocked(false), 3000); // 애니메이션 시간 후 클릭 허용
      }, 300); //
      return () => clearTimeout(timer);
    }
  }, [changeCamera]);
  console.log(changeCamera);
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
        changeCamera={cameraFollow}
        onArrive={() => {
          setIsMoving(false);
          if (targetPos.equals(new THREE.Vector3(0, 2, 0))) {
            setCameraFollow(true);
          }
        }}
      />

      <Kyungyung showAnimation={showAnimation} />

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
