"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { HallLights, Sculpture } from "@/components/token2049/sculpture";

type Pointer = { x: number; y: number };

export function ArrivalCanvas({
  pointer,
  open,
  lite,
}: {
  pointer: React.RefObject<Pointer>;
  open: React.RefObject<number>;
  lite: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0.05, 0.95, 6.4], fov: 32 }}
      dpr={lite ? [1, 1] : [1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      onCreated={({ camera, gl }) => {
        camera.lookAt(0, 0.78, 0);
        gl.setClearColor(0x000000, 0);
      }}
    >
      <HallLights />
      <Sculpture variant="bloom" lite={lite} open={open} pointer={pointer} />
      <ContactShadows opacity={0.16} scale={8} blur={2.4} far={3.4} color="#101820" position={[0, -1.15, 0]} />
      <Environment resolution={64}>
        <Lightformer form="rect" intensity={3.2} color="#ffffff" position={[0, 3, 2]} scale={[8, 4, 1]} />
        <Lightformer form="rect" intensity={1.6} color="#d7f0ff" position={[-3, 1, 1]} scale={[4, 5, 1]} />
        <Lightformer form="rect" intensity={0.7} color="#fff1e4" position={[3, 0.4, 1]} scale={[3, 2, 1]} />
      </Environment>
    </Canvas>
  );
}
