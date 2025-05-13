import { use, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Floor } from "./components/Floor";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import GLTFCharacter from "./components/Character";

function CameraRig({ move }: { move: boolean }) {
  const { camera } = useThree();
  const initialPos = new THREE.Vector3(0, 10, 0);
  const startPos = useRef(new THREE.Vector3(0, 10, 0));
  const finalTargetPos = useRef(new THREE.Vector3(0, 10, 0));
  const targetLook = new THREE.Vector3(0, 0, 0);
  const hasSetTarget = useRef(false);
  const currentLook = useRef(new THREE.Vector3(0, 0, 0));
  const startTime = useRef<number | null>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    startPos.current.set(
      camera.position.x,
      camera.position.y,
      camera.position.z
    );
    // Removed setting finalTargetPos here to avoid early jump
  }, []);

  useEffect(() => {
    if (move && !hasSetTarget.current) {
      startTime.current = performance.now();
      hasSetTarget.current = true;
    }
  }, [move]);

  useFrame(() => {
    if (!hasSetTarget.current || startTime.current === null) {
      camera.lookAt(targetLook);
      return;
    }

    const elapsed = performance.now() - startTime.current;
    const duration = 2500;
    const t = Math.min(elapsed / duration, 1);
    const easeT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    if (!hasStarted.current && t > 0) {
      hasStarted.current = true;

      startPos.current.set(
        camera.position.x,
        camera.position.y,
        camera.position.z
      );
      finalTargetPos.current.set(6, 20, 20);

      return; // skip first frame to avoid jump
    }

    if (!hasStarted.current) return;

    const x = THREE.MathUtils.lerp(
      startPos.current.x,
      finalTargetPos.current.x,
      easeT
    );
    const y = THREE.MathUtils.lerp(
      startPos.current.y,
      finalTargetPos.current.y,
      easeT
    );
    const z = THREE.MathUtils.lerp(
      startPos.current.z,
      finalTargetPos.current.z,
      easeT
    );

    camera.position.set(x, y, z);

    currentLook.current.lerp(targetLook, 0.05);
    camera.lookAt(currentLook.current);
  });

  return null;
}

function App() {
  const [move, setMove] = useState(false);

  return (
    <div className="h-screen w-screen flex items-center justify-center relative">
      {!move && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
          <button
            onClick={() => setMove(true)}
            className="text-white text-2xl border px-6 py-3 rounded-2xl bg-gray-800 hover:bg-gray-600"
          >
            시작하기
          </button>
        </div>
      )}
      <Canvas camera={{ position: [0, 10, 0], fov: 50 }}>
        <ambientLight intensity={1} />
        <GLTFCharacter position={[0, 2, 0]} animation="ArmatureAction" />
        <Floor />

        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
