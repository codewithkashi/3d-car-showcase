import React, { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import { useGLTF } from "@react-three/drei";
// import carScene from "../public/models/car/scene.gltf";
export function Car() {
  const gltf = useGLTF("/models/car/scene.gltf");

  useEffect(() => {
    gltf.scene.position.set(0, 0.15, 0);
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
  }, [gltf]);

  return <primitive object={gltf.scene} />;
}
export default Car;
