import { useState, useRef, useEffect } from "react";
import { Box, Environment, useSelect } from "@react-three/drei";
import Character from "./Character";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import Business from "./Business/Business";
import Architecture from "./Architecture/Architecture";
import Multi from "./Multi/Multi";
import Chemical from "./Chemical/Chemical";
import Floor from "./Floor";

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
  const [showArc, setShowArc] = useState(false);
  const [showMultiAnimation, setShowMultiAnimation] = useState(false);
  const [showChemicalAnimation, setShowChemicalAnimation] = useState(false);
  const [hasArrived, setHasArrived] = useState(false);

  useFrame(() => {
    if (isDragging && mousePoint) {
      setTargetPos(mousePoint);
      if (!isMoving) setIsMoving(true);
    }

    if (characterRef.current) {
      const charPos = characterRef.current.position;
      const targetZone = new THREE.Vector3(50, 0, 20);

      if (charPos.distanceTo(targetZone) < 15 && !showAnimation) {
        setShowAnimation(true);
      }

      const arcTargetZone = new THREE.Vector3(-20, 0, -20);
      if (charPos.distanceTo(arcTargetZone) < 15 && !showArc) {
        setShowArc(true);
      }

      const multiTargetZone = new THREE.Vector3(20, 0, 20);
      if (charPos.distanceTo(multiTargetZone) < 15 && !showMultiAnimation) {
        setShowMultiAnimation(true);
      }

      const chemicalTargetZone = new THREE.Vector3(40, 0, 50);
      if (
        charPos.distanceTo(chemicalTargetZone) < 15 &&
        !showChemicalAnimation
      ) {
        setShowChemicalAnimation(true);
      }
    }
  });

  useEffect(() => {
    if (changeCamera) {
      setClickBlocked(true);
      const timer = setTimeout(() => {
        setTargetPos(new THREE.Vector3(0, 2, 0));
        setIsMoving(true);
      }, 300); //
      return () => clearTimeout(timer);
    }
  }, [changeCamera]);
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
            setHasArrived(true);
            setClickBlocked(false);
          }
        }}
      />

      <Business showAnimation={showAnimation} />
      <Architecture showArc={showArc} />
      <Multi showMultiAnimation={showMultiAnimation} />
      <Chemical showChemicalAnimaton={showChemicalAnimation} />

      <Floor />
      <Box
        position={[0, -1, 0]}
        args={[1000, 2, 1000]}
        onPointerDown={(e) => {
          if (clickBlocked || !hasArrived) return;
          setIsDragging(true);
          setMousePoint(new THREE.Vector3(e.point.x, 2, e.point.z));
        }}
        onPointerMove={(e) => {
          if (clickBlocked || !hasArrived || !isDragging) return;
          setMousePoint(new THREE.Vector3(e.point.x, 2, e.point.z));
        }}
        onPointerUp={() => {
          if (clickBlocked || !hasArrived) return;
          if (mousePoint) {
            setTargetPos(mousePoint);
            setIsMoving(true);
          }
          setIsDragging(false);
          setMousePoint(null);
        }}
      >
        <meshStandardMaterial color="white" />
      </Box>
    </>
  );
}
