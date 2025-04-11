import { Canvas } from "@react-three/fiber";
import { Floor } from "./components/Floor";
import { OrbitControls } from "@react-three/drei";

function App() {
  return (
    <Canvas camera={{ position: [0, 10, 10], fov: 50 }}>
      <ambientLight intensity={1} />
      <Floor />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
