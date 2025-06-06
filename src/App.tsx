import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Floor } from "./components/Floor";
import { OrbitControls } from "@react-three/drei";
import CameraMove from "./components/CameraMove";
import Experience from "./components/Expreience";
import Loading from "./components/Loading";

function App() {
  const [move, setMove] = useState(false);
  const [changeCamera, setChangeCamera] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full">
      <Canvas camera={{ position: [0, 20, 0], fov: 50 }}>
        <CameraMove move={move} />
        <Experience changeCamera={changeCamera} />
      </Canvas>

      {loading && (
        <div className="absolute top-0 left-0 w-screen h-screen z-50 bg-white flex items-center justify-center">
          <Loading />
        </div>
      )}

      {!loading && !move && (
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
    </div>
  );
}

export default App;
