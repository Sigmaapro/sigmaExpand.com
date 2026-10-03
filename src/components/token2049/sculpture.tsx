"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  BufferGeometry,
  DoubleSide,
  Float32BufferAttribute,
  MathUtils,
  type Group,
  type Mesh,
  CatmullRomCurve3,
  TubeGeometry,
  Vector3,
} from "three";
import {
  plateForIndex,
  PLATE_COLOR,
  type ShowcaseProduct,
} from "@/content/token2049/products";

type Pointer = { x: number; y: number };

const BLADE_TURNS = [0.05, 1.08, 2.15, 3.25, 4.2, 5.35];
const BLADE_TILT = [0.42, 0.62, 0.34, 0.7, 0.48, 0.28];
const BLADE_SCALE: Array<[number, number, number]> = [
  [1, 1.08, 1],
  [0.82, 0.9, 0.9],
  [1.05, 1.16, 1],
  [0.7, 0.78, 0.85],
  [0.92, 1, 0.95],
  [1.12, 0.96, 1.05],
];

function createBladeGeometry() {
  const widthSegs = 14;
  const lengthSegs = 42;
  const positions: number[] = [];
  const indices: number[] = [];

  for (let y = 0; y <= lengthSegs; y += 1) {
    const t = y / lengthSegs;
    const swell = Math.sin(Math.pow(t, 0.62) * Math.PI);
    const pinch = t > 0.84 ? (t - 0.84) / 0.16 : 0;
    const half = (0.035 + swell * 0.58) * (1 - pinch * 0.92);
    const bow = Math.sin(t * Math.PI) * 0.78 + t * 0.22;
    for (let x = 0; x <= widthSegs; x += 1) {
      const u = x / widthSegs;
      const side = (u - 0.5) * 2;
      const edge = 1 - Math.pow(Math.abs(side), 1.35);
      positions.push(
        side * half,
        t * 3.25,
        bow * edge + (1 - edge) * 0.04,
      );
    }
  }

  const stride = widthSegs + 1;
  for (let y = 0; y < lengthSegs; y += 1) {
    for (let x = 0; x < widthSegs; x += 1) {
      const a = y * stride + x;
      const b = a + 1;
      const c = a + stride;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function createTube(points: Vector3[], radius: number) {
  const curve = new CatmullRomCurve3(points);
  return { curve, geometry: new TubeGeometry(curve, 56, radius, 6, false) };
}

function GlassMaterial({
  lite,
  tint = "#f4fbff",
  attenuation = "#c5e6ff",
}: {
  lite: boolean;
  tint?: string;
  attenuation?: string;
}) {
  if (lite) {
    return (
      <meshPhysicalMaterial
        color={tint}
        roughness={0.14}
        metalness={0.02}
        clearcoat={0.85}
        clearcoatRoughness={0.12}
        transparent
        opacity={0.78}
        side={DoubleSide}
      />
    );
  }

  return (
    <meshPhysicalMaterial
      color={tint}
      transmission={0.74}
      thickness={1.15}
      roughness={0.14}
      metalness={0}
      ior={1.5}
      clearcoat={1}
      clearcoatRoughness={0.08}
      attenuationColor={attenuation}
      attenuationDistance={0.32}
      side={DoubleSide}
    />
  );
}

function ChromeMaterial() {
  return <meshPhysicalMaterial color="#e7eef3" metalness={0.94} roughness={0.14} />;
}

export function HallLights() {
  return (
    <>
      <ambientLight intensity={0.38} />
      <directionalLight position={[4.4, 6.2, 3.4]} intensity={2.35} color="#fff4e6" />
      <directionalLight position={[-4.8, 2.4, -1.2]} intensity={0.95} color="#8fd3ff" />
      <pointLight position={[1.35, 1.7, 1.1]} intensity={0.42} color="#d86fa5" distance={5.5} />
    </>
  );
}

export function Sculpture({
  variant,
  lite,
  open,
  pointer,
  products = [],
  activeId,
  onHover,
  onSelect,
}: {
  variant: "bloom" | "ecosystem";
  lite: boolean;
  open?: React.RefObject<number>;
  pointer?: React.RefObject<Pointer>;
  products?: ShowcaseProduct[];
  activeId?: string | null;
  onHover?: (id: string | null) => void;
  onSelect?: (id: string) => void;
}) {
  const group = useRef<Group>(null);
  const blades = useRef<Array<Group | null>>([]);
  const pulse = useRef<Mesh>(null);
  const bladeGeometry = useMemo(() => BLADE_TURNS.map(() => createBladeGeometry()), []);
  const filaments = useMemo(
    () => [
      createTube(
        [
          new Vector3(0, 0.12, 0.02),
          new Vector3(0.08, 0.7, 0.22),
          new Vector3(-0.05, 1.45, 0.48),
          new Vector3(0.16, 2.35, 0.62),
        ],
        0.012,
      ),
      createTube(
        [
          new Vector3(0, 0.1, -0.02),
          new Vector3(-0.16, 0.85, 0.08),
          new Vector3(-0.28, 1.6, 0.28),
          new Vector3(-0.12, 2.55, 0.4),
        ],
        0.008,
      ),
      createTube(
        [
          new Vector3(0.02, 0.16, 0),
          new Vector3(0.22, 0.9, -0.12),
          new Vector3(0.34, 1.7, 0.05),
          new Vector3(0.18, 2.45, 0.22),
        ],
        0.007,
      ),
    ],
    [],
  );
  const roots = useMemo(
    () =>
      [
        [new Vector3(0, 0.02, 0), new Vector3(0.45, 0.01, 0.2), new Vector3(1.15, 0, 0.55)],
        [new Vector3(0, 0.02, 0), new Vector3(-0.5, 0.02, 0.15), new Vector3(-1.25, 0, 0.35)],
        [new Vector3(0, 0.02, 0), new Vector3(0.2, 0.01, -0.4), new Vector3(0.7, 0, -1.05)],
        [new Vector3(0, 0.02, 0), new Vector3(-0.25, 0.02, -0.35), new Vector3(-0.85, 0, -0.9)],
        [new Vector3(0, 0.02, 0), new Vector3(0.7, 0.01, -0.1), new Vector3(1.35, 0, -0.45)],
      ].map((points) => createTube(points, 0.01)),
    [],
  );
  const branches = useMemo(() => {
    return products.map((product, index) => {
      const count = Math.max(products.length, 1);
      const t = products.length === 1 ? 0.45 : index / (count - 1);
      const angle = -0.5 + t * 2.4 + index * 0.22;
      const radius = 1.05 + (index % 3) * 0.32;
      const y = 0.25 + t * 1.85;
      const end = new Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius * 0.78);
      const tube = createTube(
        [new Vector3(0, 0.15, 0), end.clone().multiplyScalar(0.45).setY(y * 0.55), end],
        0.012,
      );
      return { product, end, angle, ...tube };
    });
  }, [products]);

  useFrame((state, delta) => {
    const node = group.current;
    if (!node) return;
    const aim = pointer?.current ?? { x: 0, y: 0 };
    const opening = open?.current ?? 0;
    const idle = variant === "bloom" ? state.clock.elapsedTime * 0.055 : 0;
    node.rotation.y = MathUtils.damp(node.rotation.y, aim.x * 0.38 + idle, 2.2, delta);
    node.rotation.x = MathUtils.damp(node.rotation.x, aim.y * 0.1 - opening * 0.06, 2.2, delta);

    blades.current.forEach((blade, index) => {
      if (!blade) return;
      const spread = BLADE_TILT[index] + opening * (0.16 + (index % 2) * 0.07);
      blade.rotation.x = MathUtils.damp(blade.rotation.x, spread, 2.4, delta);
    });

    const lead = filaments[0];
    if (pulse.current && lead) {
      const point = lead.curve.getPoint((state.clock.elapsedTime * 0.12) % 1);
      pulse.current.position.copy(point);
    }
  });

  const crown = (
    <group
      ref={group}
      position={variant === "ecosystem" ? [0, 1.35, 0] : lite ? [0, -0.2, 0] : [-0.95, -0.55, 0]}
      scale={variant === "ecosystem" ? 0.55 : lite ? 0.62 : 0.78}
    >
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.16, 48, 48]} />
        <ChromeMaterial />
      </mesh>
      <mesh position={[0, 0.55, 0]} rotation={[0.9, 0.4, 0.2]}>
        <torusGeometry args={[0.46, 0.008, 8, 64, Math.PI * 1.25]} />
        <ChromeMaterial />
      </mesh>
      {BLADE_TURNS.map((turn, index) => (
        <group
          key={turn}
          ref={(node) => {
            blades.current[index] = node;
          }}
          rotation={[BLADE_TILT[index], turn, 0]}
          scale={BLADE_SCALE[index]}
        >
          <mesh geometry={bladeGeometry[index]} dispose={null}>
            <GlassMaterial
              lite={lite}
              tint={index === 4 ? "#f8eef4" : "#f4fbff"}
              attenuation={index === 4 ? "#e7b7cf" : "#c5e6ff"}
            />
          </mesh>
        </group>
      ))}
      {filaments.map((filament, index) => (
        <mesh key={index} geometry={filament.geometry} dispose={null}>
          <meshPhysicalMaterial
            color={index === 1 ? "#d86fa5" : index === 2 ? "#8fd3ff" : "#f7fbff"}
            roughness={0.2}
            metalness={0.35}
            emissive={index === 1 ? "#d86fa5" : "#8fd3ff"}
            emissiveIntensity={index === 0 ? 0.08 : 0.18}
          />
        </mesh>
      ))}
      <mesh ref={pulse}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshPhysicalMaterial color="#fff6ea" emissive="#fff4e6" emissiveIntensity={0.45} roughness={0.2} />
      </mesh>
    </group>
  );

  if (variant === "bloom") return crown;

  return (
    <group>
      <mesh position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.045, 0.09, 1.7, 24]} />
        <GlassMaterial lite={lite} tint="#e7eef2" />
      </mesh>
      {roots.map((root, index) => (
        <mesh key={index} geometry={root.geometry} dispose={null}>
          <ChromeMaterial />
        </mesh>
      ))}
      {branches.map((branch) => {
        const hot = activeId === branch.product.id;
        const color = PLATE_COLOR[plateForIndex(products.indexOf(branch.product))];
        return (
          <group key={branch.product.id}>
            <mesh geometry={branch.geometry} dispose={null}>
              <meshPhysicalMaterial
                color={hot ? color : "#e7eef3"}
                metalness={0.72}
                roughness={0.18}
                emissive={color}
                emissiveIntensity={hot ? 0.2 : 0.02}
              />
            </mesh>
            <mesh
              position={branch.end}
              scale={hot ? 1.18 : 1}
              onPointerOver={(event) => {
                event.stopPropagation();
                onHover?.(branch.product.id);
              }}
              onPointerOut={() => onHover?.(null)}
              onClick={(event) => {
                event.stopPropagation();
                onSelect?.(branch.product.id);
              }}
            >
              <octahedronGeometry args={[0.11, 0]} />
              <meshPhysicalMaterial
                color={color}
                roughness={0.12}
                metalness={0.08}
                clearcoat={1}
                transmission={lite ? 0 : 0.45}
                thickness={0.2}
              />
            </mesh>
          </group>
        );
      })}
      {crown}
    </group>
  );
}

export function BloomStill({ variant }: { variant: "bloom" | "ecosystem" }) {
  return (
    <svg className={variant === "ecosystem" ? "sg-still sg-still--garden" : "sg-still"} viewBox="0 0 400 520" aria-hidden="true">
      <rect width="400" height="520" fill="#f7fbff" />
      {variant === "ecosystem" ? (
        <g fill="none" stroke="#101820" strokeOpacity="0.28" strokeWidth="1">
          <path d="M200 430 C230 400 280 390 320 360" />
          <path d="M200 430 C160 400 120 392 78 368" />
          <path d="M200 430 C220 400 250 370 270 320" />
          <path d="M200 430 C170 405 140 360 118 318" />
        </g>
      ) : null}
      <g fill="none" stroke="#9fd4f2" strokeWidth="1.25">
        <path d="M200 250 C214 180 206 120 198 62" />
        <path d="M200 250 C176 190 154 140 168 78" stroke="#d86fa5" strokeOpacity="0.85" />
        <path d="M200 250 C228 188 248 150 236 90" />
      </g>
      <g fill="rgba(244,251,255,0.72)" stroke="#101820" strokeOpacity="0.35" strokeWidth="1">
        <path d="M200 250 C150 190 128 120 168 48 C190 90 198 160 200 250" />
        <path d="M200 250 C248 188 286 130 250 58 C228 100 214 170 200 250" />
        <path d="M200 250 C168 210 92 188 70 120 C120 150 168 190 200 250" />
        <path d="M200 250 C236 214 318 196 340 128 C286 160 236 198 200 250" />
        <path d="M200 250 C186 168 150 96 188 36 C198 90 200 160 200 250" />
      </g>
      <circle cx="200" cy="250" r="10" fill="#e7eef3" stroke="#101820" strokeOpacity="0.4" />
    </svg>
  );
}
