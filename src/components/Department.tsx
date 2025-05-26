import { useRef, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Group } from "three";
import { useAnimations } from "@react-three/drei";

export default function Department(props: any) {
  const gltf = useLoader(GLTFLoader, "/models/kyungyung_first.glb");
  const group = useRef<Group>(null);
  const { actions } = useAnimations(gltf.animations, group);
  console.log("경영 gltf:", gltf);

  useEffect(() => {
    const action = actions?.["tableAction"];
    action?.reset().fadeIn(0.3).play();
  }, [actions]);

  return <primitive object={gltf.scene} position={[10, -0.1, 10]} />;
}
