import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";

export function Character({ animation, ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/character.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.24).play();
    return () => actions?.[animation]?.fadeOut(0.24);
  }, [animation]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="chungle">
          <primitive object={nodes._rootJoint} />
          <skinnedMesh
            name="body"
            geometry={nodes.body.geometry}
            material={materials.Material}
            skeleton={nodes.body.skeleton}
            castShadow
            recieveShadow
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/character.glb");
