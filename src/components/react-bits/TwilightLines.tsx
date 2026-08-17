"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./TwilightLines.css";

/**
 * React Bits Pro — Twilight Lines
 * Official shader + animation extracted from the Pro preview at
 * https://pro.reactbits.dev/docs/components/twilight-lines
 *
 * Rendered with Three.js directly (same path as ColorBends) so the project
 * does not take on @react-three/fiber solely for this background.
 */

export type TwilightLinesProps = {
  width?: string | number;
  height?: string | number;
  className?: string;
  children?: React.ReactNode;
  lineCount?: number;
  waveAmplitude?: number;
  waveFrequency?: number;
  lineThickness?: number;
  lineGlow?: number;
  lineColor?: string;
  lineIntensity?: number;
  pulseColor?: string;
  pulseSpeed?: number;
  pulseWidth?: number;
  pulseIntensity?: number;
  chromaticAberration?: number;
  backgroundColor?: string;
  opacity?: number;
  dpr?: number;
  cursorInteraction?: boolean;
  cursorLerp?: number;
  clickBurstStrength?: number;
  clickBurstDecay?: number;
  paused?: boolean;
  reduceMotion?: boolean;
  /** When `window`, track pointer globally (needed when canvas sits behind UI). */
  trackPointer?: "canvas" | "window";
};

type PointerState = {
  active: boolean;
  nx: number;
  ny: number;
  targetPhase: number;
  smoothedPhase: number;
  timePhase: number;
  click: number;
  wasActive: boolean;
};

const HEX_RE = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

function hexToRgb(hex: string): [number, number, number] {
  const match = HEX_RE.exec(hex);
  if (!match) return [0, 0, 0];
  return [parseInt(match[1], 16) / 255, parseInt(match[2], 16) / 255, parseInt(match[3], 16) / 255];
}

function cssSize(value: string | number | undefined): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

varying vec2 vUv;

uniform float uTime;
uniform vec2  uRes;

uniform float uLineCount;
uniform float uWaveAmp;
uniform float uWaveFreq;
uniform float uLineThickness;
uniform float uLineGlow;
uniform vec3  uLineColor;
uniform float uLineIntensity;

uniform vec3  uPulseColor;
uniform float uPulseSpeed;
uniform float uPulseWidth;
uniform float uPulseIntensity;
uniform float uPulsePhase;
uniform float uPulseWidthScale;
uniform float uPulseBoost;

uniform float uChroma;
uniform vec3  uBg;
uniform float uAlpha;

vec3 sampleField(vec2 fragCoord) {
  vec2 uv = (fragCoord * 2.0 - uRes) / uRes.y;

  float sway = cos(uv.x * uWaveFreq) * uWaveAmp;
  float dist = abs(fract((uv.y + sway) * uLineCount) - 0.5);
  float lineMask = uLineGlow / max(dist, uLineThickness);
  vec3 col = uLineColor * uLineIntensity * lineMask;

  float pulse = abs(fract((uv.x - uPulsePhase) * uPulseSpeed) - 0.5);
  float bell  = exp(-pulse * pulse * uPulseWidth * uPulseWidthScale);
  float hot   = (uLineGlow * 0.5) / max(dist, uLineThickness * 0.1);
  col += uPulseColor * bell * hot * uPulseIntensity * uPulseBoost;

  return col;
}

void main() {
  vec2 fragCoord = vUv * uRes;

  vec2 ndc = vUv - 0.5;
  vec2 offset = ndc * length(ndc) * uChroma * 0.5;

  vec3 r = sampleField(fragCoord + offset * uRes);
  vec3 g = sampleField(fragCoord);
  vec3 b = sampleField(fragCoord - offset * uRes);

  vec3 col = vec3(r.r, g.g, b.b);
  col = clamp(col, 0.0, 1.0);
  col = mix(uBg, col + uBg * (1.0 - clamp(dot(col, vec3(1.0)), 0.0, 1.0)), 1.0);

  gl_FragColor = vec4(col, uAlpha);
}
`;

export function TwilightLines({
  width = "100%",
  height = "100%",
  className,
  children,
  lineCount = 2,
  waveAmplitude = 0.5,
  waveFrequency = 1.8,
  lineThickness = 0.05,
  lineGlow = 0.01,
  lineColor = "#4155cb",
  lineIntensity = 3,
  pulseColor = "#333acf",
  pulseSpeed = 0.25,
  pulseWidth = 35,
  pulseIntensity = 5.5,
  chromaticAberration = 0.05,
  backgroundColor = "#000000",
  opacity = 1,
  dpr = 1.5,
  cursorInteraction = true,
  cursorLerp = 0.12,
  clickBurstStrength = 2.5,
  clickBurstDecay = 2.5,
  paused = false,
  reduceMotion = false,
  trackPointer = "canvas",
}: TwilightLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const pointerRef = useRef<PointerState>({
    active: false,
    nx: 0.5,
    ny: 0.5,
    targetPhase: 0,
    smoothedPhase: 0,
    timePhase: 0,
    click: 0,
    wasActive: false,
  });
  const propsRef = useRef({
    lineCount,
    waveAmplitude,
    waveFrequency,
    lineThickness,
    lineGlow,
    lineColor,
    lineIntensity,
    pulseColor,
    pulseSpeed,
    pulseWidth,
    pulseIntensity,
    chromaticAberration,
    backgroundColor,
    opacity,
    dpr,
    cursorInteraction,
    cursorLerp,
    clickBurstStrength,
    clickBurstDecay,
    paused,
    reduceMotion,
    trackPointer,
  });

  propsRef.current = {
    lineCount,
    waveAmplitude,
    waveFrequency,
    lineThickness,
    lineGlow,
    lineColor,
    lineIntensity,
    pulseColor,
    pulseSpeed,
    pulseWidth,
    pulseIntensity,
    chromaticAberration,
    backgroundColor,
    opacity,
    dpr,
    cursorInteraction,
    cursorLerp,
    clickBurstStrength,
    clickBurstDecay,
    paused,
    reduceMotion,
    trackPointer,
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    camera.position.z = 1;
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uRes: { value: new THREE.Vector2(1, 1) },
        uLineCount: { value: 1 },
        uWaveAmp: { value: 1 },
        uWaveFreq: { value: 2 },
        uLineThickness: { value: 0.05 },
        uLineGlow: { value: 0.01 },
        uLineColor: { value: new THREE.Color(0.3, 0.2, 0.8) },
        uLineIntensity: { value: 2 },
        uPulseColor: { value: new THREE.Color(0.8, 0.3, 0.3) },
        uPulseSpeed: { value: 0.5 },
        uPulseWidth: { value: 25 },
        uPulseIntensity: { value: 10 },
        uPulsePhase: { value: 0 },
        uPulseWidthScale: { value: 1 },
        uPulseBoost: { value: 1 },
        uChroma: { value: 0.05 },
        uBg: { value: new THREE.Color(0, 0, 0) },
        uAlpha: { value: 1 },
      },
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, propsRef.current.dpr));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.className = "twilight-lines-canvas";
    container.appendChild(renderer.domElement);

    materialRef.current = material;
    rendererRef.current = renderer;

    let canvasWidth = 1;
    let canvasHeight = 1;
    const resize = () => {
      const widthPx = container.clientWidth || 1;
      const heightPx = container.clientHeight || 1;
      const cap = propsRef.current.dpr;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, cap));
      renderer.setSize(widthPx, heightPx, false);
      canvasWidth = widthPx;
      canvasHeight = heightPx;
      (material.uniforms.uRes.value as THREE.Vector2).set(widthPx, heightPx);
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const animationStart = performance.now();
    let previousFrame = animationStart;
    let frame = 0;

    const render = () => {
      frame = requestAnimationFrame(render);
      const now = performance.now();
      const delta = (now - previousFrame) / 1000;
      previousFrame = now;
      const current = propsRef.current;
      if (current.paused) return;

      const nextRatio = Math.min(window.devicePixelRatio || 1, current.dpr);
      if (renderer.getPixelRatio() !== nextRatio) {
        renderer.setPixelRatio(nextRatio);
        renderer.setSize(canvasWidth, canvasHeight, false);
      }

      const uniforms = material.uniforms;
      uniforms.uTime.value = (now - animationStart) / 1000;
      uniforms.uLineCount.value = current.lineCount;
      uniforms.uWaveAmp.value = current.waveAmplitude;
      uniforms.uWaveFreq.value = current.waveFrequency;
      uniforms.uLineThickness.value = current.lineThickness;
      uniforms.uLineGlow.value = current.lineGlow;
      uniforms.uLineIntensity.value = current.lineIntensity;
      uniforms.uPulseSpeed.value = current.pulseSpeed;
      uniforms.uPulseWidth.value = current.pulseWidth;
      uniforms.uPulseIntensity.value = current.pulseIntensity;
      uniforms.uChroma.value = current.chromaticAberration;
      uniforms.uAlpha.value = current.opacity;

      const lineRgb = hexToRgb(current.lineColor);
      (uniforms.uLineColor.value as THREE.Color).setRGB(lineRgb[0], lineRgb[1], lineRgb[2]);
      const pulseRgb = hexToRgb(current.pulseColor);
      (uniforms.uPulseColor.value as THREE.Color).setRGB(pulseRgb[0], pulseRgb[1], pulseRgb[2]);
      const bgRgb = hexToRgb(current.backgroundColor);
      (uniforms.uBg.value as THREE.Color).setRGB(bgRgb[0], bgRgb[1], bgRgb[2]);

      const pointer = pointerRef.current;
      const aspect = canvasWidth / Math.max(canvasHeight, 1);
      const interactive = current.cursorInteraction && !current.reduceMotion;

      if (interactive && pointer.active) {
        pointer.targetPhase = (2 * pointer.nx - 1) * aspect;
        const lerp = Math.min(Math.max(current.cursorLerp, 0), 1);
        pointer.smoothedPhase += (pointer.targetPhase - pointer.smoothedPhase) * lerp;
        uniforms.uPulsePhase.value = pointer.smoothedPhase;
        uniforms.uPulseWidthScale.value = 0.5 + 1.5 * (1 - pointer.ny);
      } else {
        if (pointer.wasActive) pointer.timePhase = pointer.smoothedPhase;
        if (!current.reduceMotion) pointer.timePhase += delta;
        pointer.smoothedPhase += (pointer.timePhase - pointer.smoothedPhase) * 0.15;
        uniforms.uPulsePhase.value = pointer.smoothedPhase;
        uniforms.uPulseWidthScale.value += (1 - (uniforms.uPulseWidthScale.value as number)) * 0.1;
      }

      pointer.wasActive = pointer.active;
      pointer.click = Math.max(0, pointer.click - delta * current.clickBurstDecay);
      uniforms.uPulseBoost.value = 1 + pointer.click * (current.clickBurstStrength - 1);

      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(render);

    const applyPointer = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const pointer = pointerRef.current;
      pointer.nx = (clientX - rect.left) / Math.max(rect.width, 1);
      pointer.ny = (clientY - rect.top) / Math.max(rect.height, 1);
      pointer.active = true;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!propsRef.current.cursorInteraction || propsRef.current.reduceMotion) return;
      applyPointer(event.clientX, event.clientY);
    };
    const handlePointerLeave = () => {
      pointerRef.current.active = false;
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (!propsRef.current.cursorInteraction || propsRef.current.reduceMotion) return;
      applyPointer(event.clientX, event.clientY);
      pointerRef.current.click = 1;
    };

    const target: EventTarget = trackPointer === "window" ? window : container;
    target.addEventListener("pointermove", handlePointerMove as EventListener, { passive: true });
    target.addEventListener("pointerdown", handlePointerDown as EventListener, { passive: true });
    if (trackPointer === "window") {
      window.addEventListener("pointerleave", handlePointerLeave);
      document.addEventListener("mouseleave", handlePointerLeave);
    } else {
      container.addEventListener("pointerleave", handlePointerLeave);
      container.addEventListener("pointerenter", handlePointerMove as EventListener, { passive: true });
    }

    return () => {
      cancelAnimationFrame(frame);
      target.removeEventListener("pointermove", handlePointerMove as EventListener);
      target.removeEventListener("pointerdown", handlePointerDown as EventListener);
      if (trackPointer === "window") {
        window.removeEventListener("pointerleave", handlePointerLeave);
        document.removeEventListener("mouseleave", handlePointerLeave);
      } else {
        container.removeEventListener("pointerleave", handlePointerLeave);
        container.removeEventListener("pointerenter", handlePointerMove as EventListener);
      }
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentElement === container) container.removeChild(renderer.domElement);
      materialRef.current = null;
      rendererRef.current = null;
    };
  }, [trackPointer]);

  return (
    <div
      ref={containerRef}
      className={`twilight-lines-container ${className ?? ""}`.trim()}
      style={{ width: cssSize(width), height: cssSize(height) }}
      aria-hidden="true"
    >
      {children ? <div className="relative z-10">{children}</div> : null}
    </div>
  );
}

TwilightLines.displayName = "TwilightLines";

export default TwilightLines;
