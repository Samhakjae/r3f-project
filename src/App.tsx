import { use, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Floor } from "./components/Floor";
import { OrbitControls } from "@react-three/drei";

function App() {
  const [visible, setVisible] = useState(true);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {visible ? (
        <div className="absolute z-10">
          <button
            className=" bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => {
              setVisible(false);
            }}
          >
            클릭
          </button>
        </div>
      ) : (
        <></>
      )}

      <Canvas camera={{ position: [0, 10, 0], fov: 50 }}>
        <ambientLight intensity={1} />
        <Floor />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
