"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./ColorBends.css";

type ColorBendsProps = {
  className?: string;
  colors?: string[];
  rotation?: number;
  speed?: number;
  transparent?: boolean;
  autoRotate?: number;
  scale?: number;
  frequency?: number;
  warpStrength?: number;
  mouseInfluence?: number;
  parallax?: number;
  noise?: number;
  iterations?: number;
  intensity?: number;
  bandWidth?: number;
};

const MAX_COLORS = 8;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  #define MAX_COLORS ${MAX_COLORS}
  uniform vec2 uCanvas;
  uniform float uTime;
  uniform float uSpeed;
  uniform vec2 uRotation;
  uniform int uColorCount;
  uniform vec3 uColors[MAX_COLORS];
  uniform int uTransparent;
  uniform float uScale;
  uniform float uFrequency;
  uniform float uWarpStrength;
  uniform vec2 uPointer;
  uniform float uMouseInfluence;
  uniform float uParallax;
  uniform float uNoise;
  uniform int uIterations;
  uniform float uIntensity;
  uniform float uBandWidth;
  varying vec2 vUv;

  void main() {
    float time = uTime * uSpeed;
    vec2 point = vUv * 2.0 - 1.0;
    point += uPointer * uParallax * 0.1;
    vec2 rotated = vec2(
      point.x * uRotation.x - point.y * uRotation.y,
      point.x * uRotation.y + point.y * uRotation.x
    );
    vec2 q = vec2(rotated.x * (uCanvas.x / uCanvas.y), rotated.y);
    q /= max(uScale, 0.0001);
    q /= 0.5 + 0.2 * dot(q, q);
    q += 0.2 * cos(time) - 7.56;
    q += (uPointer - rotated) * uMouseInfluence * 0.2;

    for (int j = 0; j < 5; j++) {
      if (j >= uIterations - 1) break;
      vec2 wave = sin(1.5 * (q.yx * uFrequency) + 2.0 * cos(q * uFrequency));
      q += (wave - q) * 0.15;
    }

    vec3 color = vec3(0.0);
    float alpha = 1.0;
    vec2 samplePoint = q;
    float coverage = 0.0;

    for (int i = 0; i < MAX_COLORS; i++) {
      if (i >= uColorCount) break;
      samplePoint -= 0.01;
      vec2 wave = sin(1.5 * (samplePoint.yx * uFrequency) + 2.0 * cos(samplePoint * uFrequency));
      float baseDistance = length(wave + sin(5.0 * wave.y * uFrequency - 3.0 * time + float(i)) / 4.0);
      float warp = clamp(uWarpStrength, 0.0, 1.0);
      vec2 warpedPoint = samplePoint + (wave - samplePoint) * warp;
      float warpedDistance = length(warpedPoint + sin(5.0 * warpedPoint.y * uFrequency - 3.0 * time + float(i)) / 4.0);
      float distanceValue = mix(baseDistance, warpedDistance, pow(warp, 0.3));
      float band = 1.0 - exp(-uBandWidth / exp(uBandWidth * distanceValue));
      color += uColors[i] * band;
      coverage = max(coverage, band);
    }

    color = clamp(color * uIntensity, 0.0, 1.0);
    alpha = uTransparent > 0 ? coverage : 1.0;

    if (uNoise > 0.0001) {
      float grain = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453);
      color = clamp(color + (grain - 0.5) * uNoise, 0.0, 1.0);
    }

    gl_FragColor = vec4(uTransparent > 0 ? color * alpha : color, alpha);
  }
`;

function hexToVector(hex: string) {
  const value = hex.replace("#", "").trim();
  const normalized = value.length === 3
    ? value.split("").map((part) => part + part).join("")
    : value;
  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);

  return new THREE.Vector3(red / 255, green / 255, blue / 255);
}

export function ColorBends({
  className,
  colors = [],
  rotation = 90,
  speed = 0.2,
  transparent = true,
  autoRotate = 0,
  scale = 1,
  frequency = 1,
  warpStrength = 1,
  mouseInfluence = 1,
  parallax = 0.5,
  noise = 0.15,
  iterations = 1,
  intensity = 1.5,
  bandWidth = 6,
}: ColorBendsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>(null);
  const pointerTargetRef = useRef(new THREE.Vector2());
  const pointerCurrentRef = useRef(new THREE.Vector2());
  const rotationRef = useRef(rotation);
  const autoRotateRef = useRef(autoRotate);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const colorUniforms = Array.from({ length: MAX_COLORS }, () => new THREE.Vector3());
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uCanvas: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uSpeed: { value: 0.2 },
        uRotation: { value: new THREE.Vector2(1, 0) },
        uColorCount: { value: 0 },
        uColors: { value: colorUniforms },
        uTransparent: { value: 0 },
        uScale: { value: 1 },
        uFrequency: { value: 1 },
        uWarpStrength: { value: 1 },
        uPointer: { value: new THREE.Vector2() },
        uMouseInfluence: { value: 1 },
        uParallax: { value: 0.5 },
        uNoise: { value: 0.15 },
        uIterations: { value: 1 },
        uIntensity: { value: 1.5 },
        uBandWidth: { value: 6 },
      },
      transparent: true,
      premultipliedAlpha: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.25 : 2));
    renderer.setClearColor(0x000000, 1);
    renderer.domElement.className = "color-bends-canvas";
    container.appendChild(renderer.domElement);

    materialRef.current = material;
    rendererRef.current = renderer;

    const resize = () => {
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;
      renderer.setSize(width, height, false);
      (material.uniforms.uCanvas.value as THREE.Vector2).set(width, height);
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const animationStart = performance.now();
    let previousFrame = animationStart;
    const render = () => {
      const now = performance.now();
      const delta = (now - previousFrame) / 1000;
      previousFrame = now;
      const current = pointerCurrentRef.current;
      current.lerp(pointerTargetRef.current, Math.min(1, delta * 8));
      (material.uniforms.uPointer.value as THREE.Vector2).copy(current);
      material.uniforms.uTime.value = (now - animationStart) / 1000;

      const degrees = (rotationRef.current % 360) + autoRotateRef.current * ((now - animationStart) / 1000);
      const radians = (degrees * Math.PI) / 180;
      (material.uniforms.uRotation.value as THREE.Vector2).set(Math.cos(radians), Math.sin(radians));
      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(render);
    };
    animationFrameRef.current = requestAnimationFrame(render);

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerTargetRef.current.set(
        ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1,
        -(((event.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1),
      );
    };
    container.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      container.removeEventListener("pointermove", handlePointerMove);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentElement === container) container.removeChild(renderer.domElement);
      materialRef.current = null;
      rendererRef.current = null;
    };
  }, []);

  useEffect(() => {
    const material = materialRef.current;
    const renderer = rendererRef.current;
    if (!material) return;

    rotationRef.current = rotation;
    autoRotateRef.current = autoRotate;
    material.uniforms.uSpeed.value = speed;
    material.uniforms.uScale.value = scale;
    material.uniforms.uFrequency.value = frequency;
    material.uniforms.uWarpStrength.value = warpStrength;
    material.uniforms.uMouseInfluence.value = mouseInfluence;
    material.uniforms.uParallax.value = parallax;
    material.uniforms.uNoise.value = noise;
    material.uniforms.uIterations.value = iterations;
    material.uniforms.uIntensity.value = intensity;
    material.uniforms.uBandWidth.value = bandWidth;
    material.uniforms.uTransparent.value = transparent ? 1 : 0;
    renderer?.setClearColor(0x000000, transparent ? 0 : 1);

    const parsedColors = colors.filter(Boolean).slice(0, MAX_COLORS).map(hexToVector);
    const uniformColors = material.uniforms.uColors.value as THREE.Vector3[];
    uniformColors.forEach((color, index) => {
      if (parsedColors[index]) color.copy(parsedColors[index]);
      else color.set(0, 0, 0);
    });
    material.uniforms.uColorCount.value = parsedColors.length;
  }, [autoRotate, bandWidth, colors, frequency, intensity, iterations, mouseInfluence, noise, parallax, rotation, scale, speed, transparent, warpStrength]);

  return <div ref={containerRef} className={`color-bends-container ${className ?? ""}`} aria-hidden="true" />;
}

export default ColorBends;
