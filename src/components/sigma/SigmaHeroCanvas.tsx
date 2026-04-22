"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useScrollBridge } from "@/context/ScrollBridge";
import {
  buildSigmaStrokePieces,
  scrollToExplodeAmount,
  sigmaStrokeThickness,
} from "@/lib/sigmaLogoSpec";

function SigmaLogoSystem() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const { heroScrollProgress } = useScrollBridge();

  const strokePieces = useMemo(() => buildSigmaStrokePieces(), []);

  const geometries = useMemo(() => {
    const t = sigmaStrokeThickness();
    return strokePieces.map(
      (p) => new THREE.BoxGeometry(p.length, t, t, 1, 1, 1),
    );
  }, [strokePieces]);

  useEffect(() => {
    return () => geometries.forEach((g) => g.dispose());
  }, [geometries]);

  useFrame((state) => {
    const p = heroScrollProgress.get();
    const explode = scrollToExplodeAmount(p);
    const idleW = Math.max(0, 1 - explode * 5.5);
    const t = state.clock.elapsedTime;
    const px = state.pointer.x;
    const py = state.pointer.y;

    if (groupRef.current) {
      const floatY = Math.sin(t * 0.5) * 0.038 * (0.35 + idleW * 0.65);
      const floatZ = Math.sin(t * 0.38) * 0.012 * idleW;
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        floatY,
        0.1,
      );
      groupRef.current.position.z = THREE.MathUtils.lerp(
        groupRef.current.position.z,
        floatZ,
        0.08,
      );

      const gParallax = 1 - explode * 0.55;
      const targetRy = px * 0.22 * gParallax;
      const targetRx = -py * 0.16 * gParallax;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRy,
        0.06,
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRx,
        0.06,
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        Math.sin(t * 0.2) * 0.018 * idleW,
        0.08,
      );
    }

    const parallaxBlend = THREE.MathUtils.smoothstep(explode, 0.12, 0.68);

    meshRefs.current.forEach((mesh, i) => {
      const piece = strokePieces[i];
      if (!mesh || !piece) return;

      const idleSep = new THREE.Vector3(
        Math.sin(t * 0.62 + i * 1.5),
        Math.cos(t * 0.5 + i * 1.05),
        Math.sin(t * 0.35 + i * 0.75) * 0.45,
      ).multiplyScalar(0.016 * idleW);

      const burst = new THREE.Vector3(
        piece.burstDir.x,
        piece.burstDir.y,
        piece.burstDir.z,
      ).multiplyScalar(1.08 * explode);

      const pieceParallax = new THREE.Vector3(
        px * (0.26 + i * 0.04),
        py * -(0.2 + i * 0.03),
        px * 0.08,
      ).multiplyScalar(parallaxBlend * 0.36 * explode);

      const target = new THREE.Vector3(piece.mid.x, piece.mid.y, piece.mid.z)
        .add(idleSep)
        .add(burst)
        .add(pieceParallax);
      mesh.position.lerp(target, 0.11);

      const baseZ = piece.angleZ;
      const idleRotZ = Math.sin(t * 0.45 + i * 1.6) * 0.016 * idleW;
      const driftZ = Math.sin(t * 0.28 + i) * 0.05 * explode * (1 - idleW * 0.85);
      mesh.rotation.z = THREE.MathUtils.lerp(
        mesh.rotation.z,
        baseZ + idleRotZ + driftZ,
        0.14,
      );

      const tilt = explode * (0.11 + idleW * 0.04);
      mesh.rotation.x = THREE.MathUtils.lerp(
        mesh.rotation.x,
        py * tilt * 0.55,
        0.1,
      );
      mesh.rotation.y = THREE.MathUtils.lerp(
        mesh.rotation.y,
        px * tilt * 0.55,
        0.1,
      );
    });

  });

  return (
    <group ref={groupRef} scale={1.05}>
      {strokePieces.map((piece, i) => (
        <mesh
          key={piece.id}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          geometry={geometries[i]}
          position={[piece.mid.x, piece.mid.y, piece.mid.z]}
          rotation={[0, 0, piece.angleZ]}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial
            color="#101218"
            metalness={0.9}
            roughness={0.3}
            emissive="#1c39bb"
            emissiveIntensity={0.16}
            clearcoat={0.45}
            clearcoatRoughness={0.38}
            reflectivity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.12} color="#8b949e" />
      <directionalLight
        position={[6, 9, 5]}
        intensity={0.55}
        color="#eef2f7"
        castShadow
      />
      <directionalLight
        position={[-5, 2, -4]}
        intensity={0.22}
        color="#1c39bb"
      />
      <pointLight
        position={[-2.5, -1.2, 6]}
        intensity={1.05}
        color="#bde0fe"
        distance={22}
        decay={2}
      />
      <pointLight
        position={[3.2, 2.4, -4.8]}
        intensity={0.75}
        color="#1c39bb"
        distance={18}
        decay={2}
      />
      <spotLight
        position={[0, 6, 8]}
        angle={0.35}
        penumbra={0.85}
        intensity={0.35}
        color="#ffffff"
        distance={28}
      />
      <SigmaLogoSystem />
    </>
  );
}

export default function SigmaHeroCanvas() {
  return (
    <div className="relative mx-auto h-[min(52vh,520px)] w-full max-w-[min(100%,420px)] md:h-[min(62vh,580px)] md:max-w-[min(100%,460px)]">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5.75], fov: 39 }}
        dpr={[1, 1.6]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        className="!bg-transparent"
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-erie/75 via-transparent to-transparent" />
    </div>
  );
}
