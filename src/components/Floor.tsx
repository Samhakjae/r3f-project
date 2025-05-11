import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";

export function Floor() {
  const lineTexture = useMemo(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d")!;
    context.fillStyle = "#f9f9f9";
    context.fillRect(0, 0, size, size);
    context.strokeStyle = "#ddd";
    context.lineWidth = 2;

    const lineSpacing = 10;
    for (let y = 0; y < size; y += lineSpacing) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(size, y);
      context.stroke();
    }

    // Draw vertical lines to form a grid
    for (let x = 0; x < size; x += lineSpacing) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, size);
      context.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(80, 80);
    return texture;
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[2000, 2000]} />
      <meshStandardMaterial map={lineTexture} />
    </mesh>
  );
}
