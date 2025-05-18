import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Floor } from "./components/Floor";
import { OrbitControls } from "@react-three/drei";
import Character from "./components/Character";
import CameraMove from "./components/CameraMove";
import { Physics, RigidBody } from "@react-three/rapier";
import { KeyboardControls } from "@react-three/drei";
import Experience from "./components/Expreience";
import Loading from "./components/Loading";

function App() {
  const [loading, setLoading] = useState(false);
  const [move, setMove] = useState(false);

  useEffect(() => {
    const time = setTimeout(() => {
      setLoading(false);
    }, 3500);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
            <Physics>
              <RigidBody type="fixed">
                <Experience />

                {/* <Floor /> */}
              </RigidBody>
            </Physics>

            <OrbitControls />
          </Canvas>
        </div>
      )}
    </>
  );
}

export default App;
