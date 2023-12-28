import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Ring,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Ground from "./Groud";
import React from "react";
import Car from "./Car";
import Rings from "./Rings";
import Boxes from "./Boxes";
import { BlendFunction } from "postprocessing";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { FloatingGrid } from "./FloatingGrid";
const CarShow = () => {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
      <color args={[0, 0, 0]} attach={"background"} />
      {/* <ambientLight intensity={10} position={[0, 5, 0]} /> */}
      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={300}
        angle={454}
        penumbra={2}
        position={[5, 5, 0]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={300}
        angle={45}
        penumbra={2}
        position={[-5, 5, 0]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>
      <Ground />
      <FloatingGrid />
      <Rings />
      <Boxes />
      <EffectComposer>
        {/* <DepthOfField
          focusDistance={0.0035}
          focalLength={0.01}
          bokehScale={3}
          height={480}
        /> */}
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={0.2} // The bloom intensity.
          width={100} // render width
          height={100} // render height
          kernelSize={5} // blur kernel size
          luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.0005, 0.0012]} // color offset
        />
      </EffectComposer>
    </>
  );
};
const App = () => {
  return (
    <div>
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </div>
  );
};

export default App;
