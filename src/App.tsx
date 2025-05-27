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
  const [changeCamera, setChangeCamera] = useState(false);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="h-screen w-screen flex items-center justify-center relative">
          {!move && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
              <button
                onClick={() => {
                  setMove(true);
                  setChangeCamera(true);
                }}
                className="text-white text-2xl border px-6 py-3 rounded-2xl bg-gray-800 hover:bg-gray-600"
              >
                시작하기
              </button>
            </div>
          )}
          <Canvas camera={{ position: [0, 40, 40], fov: 50 }}>
            {/* <CameraMove move={move} /> */}
            <Experience changeCamera={changeCamera} />
          </Canvas>
        </div>
      )}
    </>
  );
}

export default App;
