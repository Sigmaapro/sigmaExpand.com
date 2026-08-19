"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { mat4, quat, vec2, vec3 } from "gl-matrix";
import "./InfiniteMenu.css";

/**
 * Port of the ReactBits Infinite Menu (WebGL2 disc sphere + arcball control).
 *
 * Disc material is the React Bits Pro Portal field painted onto the existing
 * instanced discs. Titles stay on an undistorted atlas overlay.
 *
 * GLSL note: never declare a variable named "active" — GLSL ES 3.00 / ANGLE
 * treats it as reserved and the program will fail to link (invisible discs).
 */

export type InfiniteMenuItem = {
  title: string;
  link: string;
};

const discVertShaderSource = `#version 300 es

uniform mat4 uWorldMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec3 uCameraPosition;
uniform vec4 uRotationAxisVelocity;

in vec3 aModelPosition;
in vec3 aModelNormal;
in vec2 aModelUvs;
in mat4 aInstanceMatrix;

out vec2 vUvs;
out float vAlpha;
flat out int vInstanceId;

#define PI 3.141593

void main() {
  vec4 worldPosition = uWorldMatrix * aInstanceMatrix * vec4(aModelPosition, 1.);

  vec3 centerPos = (uWorldMatrix * aInstanceMatrix * vec4(0., 0., 0., 1.)).xyz;
  float radius = length(centerPos.xyz);

  if (gl_VertexID > 0) {
    vec3 rotationAxis = uRotationAxisVelocity.xyz;
    float rotationVelocity = min(.15, uRotationAxisVelocity.w * 15.);
    vec3 stretchDir = normalize(cross(centerPos, rotationAxis));
    vec3 relativeVertexPos = normalize(worldPosition.xyz - centerPos);
    float strength = dot(stretchDir, relativeVertexPos);
    float invAbsStrength = min(0., abs(strength) - 1.);
    strength = rotationVelocity * sign(strength) * abs(invAbsStrength * invAbsStrength * invAbsStrength + 1.);
    worldPosition.xyz += stretchDir * strength;
  }

  worldPosition.xyz = radius * normalize(worldPosition.xyz);

  gl_Position = uProjectionMatrix * uViewMatrix * worldPosition;

  vAlpha = smoothstep(0.5, 1., normalize(worldPosition.xyz).z) * .9 + .1;
  vUvs = aModelUvs;
  vInstanceId = gl_InstanceID;
}
`;

const discFragShaderSource = `#version 300 es
precision highp float;

uniform sampler2D uTex;
uniform int uItemCount;
uniform int uAtlasSize;
uniform float uFrames;
uniform float uReduceMotion;

in vec2 vUvs;
in float vAlpha;
flat in int vInstanceId;

out vec4 outColor;

// React Bits Pro Portal fragment (pro.reactbits.dev/docs/components/portal),
// adapted into disc UV space. Live shader only evaluates layers 0..6
// (uLayerCount > 0 .. > 6), so 7 is the hard maximum — 10 is a docs-UI
// value with no extra branches.
//
// Target settings from the supplied Portal preview:
// primary #344BFC, secondary #533EF9, center #6840FC, bg #0A0A0A,
// speed 0.3, density 0.5, layers 7, scale 1.2, brightness 0.5,
// waveAmp 0.0, waveFreq 0.01, vertDist 0.45, depth 0.10.

const vec3 PORTAL_PRIMARY = vec3(0.20392157, 0.29411765, 0.98823529);
const vec3 PORTAL_SECONDARY = vec3(0.32549020, 0.24313725, 0.97647059);
const vec3 PORTAL_CENTER = vec3(0.40784314, 0.25098039, 0.98823529);
const vec3 PORTAL_BG = vec3(0.03921569, 0.03921569, 0.03921569);

const float PORTAL_SPEED = 0.3;
const float PORTAL_DENSITY = 0.5;
const int PORTAL_LAYERS = 7;
const float PORTAL_SCALE = 1.2;
const float PORTAL_BRIGHTNESS = 0.5;
const float PORTAL_WAVE_AMP = 0.0;
const float PORTAL_WAVE_FREQ = 0.01;
const float PORTAL_VERT_DIST = 0.45;
const float PORTAL_DEPTH = 0.10;

float generateParticleField(vec2 coord, float scale, float time) {
  float timeOffset = time * PORTAL_SPEED * 2.3;
  coord *= scale;
  coord.x += timeOffset;

  vec2 cellId = floor(coord);
  vec2 localPos = fract(coord);

  vec2 randomSeed = 0.5 + 0.35 * sin(
    11.0 * fract(
      sin((cellId + scale) * mat2(7.0, 3.0, 6.0, 5.0)) * 5.0
    )
  );

  vec2 particleOffset = randomSeed - localPos;
  float distToParticle = length(particleOffset);

  float particleIntensity = smoothstep(
    0.0,
    distToParticle,
    sin(localPos.x + localPos.y) * 0.003
  );

  return particleIntensity;
}

vec3 computePortalEffect(vec2 coord, float depthGradient, float time, float brightness) {
  coord.x += sin(time * PORTAL_WAVE_FREQ) * PORTAL_WAVE_AMP;
  coord.y += sin(coord.x * 1.4) * PORTAL_VERT_DIST;
  coord.x *= 0.1;

  float particleSum = 0.0;

  if (PORTAL_LAYERS > 0) particleSum += generateParticleField(coord, 30.0 * PORTAL_DENSITY, time) * 0.3;
  if (PORTAL_LAYERS > 1) particleSum += generateParticleField(coord, 20.0 * PORTAL_DENSITY, time) * 0.5;
  if (PORTAL_LAYERS > 2) particleSum += generateParticleField(coord, 15.0 * PORTAL_DENSITY, time) * 0.8;
  if (PORTAL_LAYERS > 3) particleSum += generateParticleField(coord, 10.0 * PORTAL_DENSITY, time);
  if (PORTAL_LAYERS > 4) particleSum += generateParticleField(coord, 8.0 * PORTAL_DENSITY, time);
  if (PORTAL_LAYERS > 5) particleSum += generateParticleField(coord, 6.0 * PORTAL_DENSITY, time);
  if (PORTAL_LAYERS > 6) particleSum += generateParticleField(coord, 5.0 * PORTAL_DENSITY, time);

  float safeDepth = max(depthGradient, 0.018);
  particleSum *= PORTAL_DEPTH / safeDepth;

  vec3 portalGlow = mix(PORTAL_PRIMARY, PORTAL_SECONDARY, 0.5) * particleSum * 30.0 * brightness;
  vec3 centerGlow = PORTAL_CENTER * 0.02 / safeDepth;

  return portalGlow + centerGlow;
}

void main() {
  vec2 disc = vUvs * 2.0 - 1.0;
  float rad = length(disc);
  if (rad > 1.0) discard;
  float edge = 1.0 - smoothstep(0.985, 1.0, rad);

  // Never name a variable "active" — reserved in GLSL ES 3.00 / ANGLE.
  float facing = clamp((vAlpha - 0.1) / 0.9, 0.0, 1.0);
  float visAmt = mix(0.32, 1.0, pow(max(facing, 0.0), 0.72));
  float frontAmt = smoothstep(0.48, 0.94, facing);

  float brightness = PORTAL_BRIGHTNESS * mix(0.22, 1.0, visAmt) * mix(0.82, 1.0, frontAmt);
  float time = uFrames * 0.016 * (1.0 - uReduceMotion);

  // Disc UV → Portal ball. Original Portal uses (uv-0.5)*2 / scale with a
  // 0.5 ball radius; here the disc IS the ball, so scale zooms the field
  // while depth is taken from disc radius so the rim sits on the perimeter.
  vec2 coord = disc * 0.5 / PORTAL_SCALE;
  float depthGradient = 0.5 * (1.0 - rad);

  vec3 portalColor = computePortalEffect(coord, depthGradient, time, brightness);

  float portalBrightness = length(portalColor);
  float brightnessThreshold = 0.5;
  float showPortal = smoothstep(brightnessThreshold, brightnessThreshold + 0.4, portalBrightness);
  showPortal = pow(showPortal, 2.0);
  showPortal *= visAmt;

  vec3 color = mix(PORTAL_BG, portalColor, showPortal);
  float alpha = mix(0.55, 0.94, visAmt) * edge;
  alpha = max(alpha, showPortal * edge);

  int safeCount = max(uItemCount, 1);
  int itemIndex = vInstanceId % safeCount;
  int cellsPerRow = max(uAtlasSize, 1);
  int cellX = itemIndex % cellsPerRow;
  int cellY = itemIndex / cellsPerRow;
  vec2 cellSize = vec2(1.0) / vec2(float(cellsPerRow));
  vec2 cellOffset = vec2(float(cellX), float(cellY)) * cellSize;
  vec2 st = clamp(vec2(vUvs.x, 1.0 - vUvs.y), 0.0, 1.0) * cellSize + cellOffset;
  vec4 title = texture(uTex, st);
  color = mix(color, title.rgb, title.a);
  alpha = max(alpha, title.a);

  outColor = vec4(color, alpha);
}
`;


class Face {
  a: number;
  b: number;
  c: number;

  constructor(a: number, b: number, c: number) {
    this.a = a;
    this.b = b;
    this.c = c;
  }
}

class Vertex {
  position: vec3;
  normal: vec3;
  uv: vec2;

  constructor(x: number, y: number, z: number) {
    this.position = vec3.fromValues(x, y, z);
    this.normal = vec3.create();
    this.uv = vec2.create();
  }
}

class Geometry {
  vertices: Vertex[] = [];
  faces: Face[] = [];

  addVertex(...args: number[]): this {
    for (let i = 0; i < args.length; i += 3) {
      this.vertices.push(new Vertex(args[i]!, args[i + 1]!, args[i + 2]!));
    }
    return this;
  }

  addFace(...args: number[]): this {
    for (let i = 0; i < args.length; i += 3) {
      this.faces.push(new Face(args[i]!, args[i + 1]!, args[i + 2]!));
    }
    return this;
  }

  get lastVertex(): Vertex {
    return this.vertices[this.vertices.length - 1]!;
  }

  subdivide(divisions = 1): this {
    const midPointCache: Record<string, number> = {};
    let f = this.faces;

    for (let div = 0; div < divisions; ++div) {
      const newFaces = new Array<Face>(f.length * 4);

      f.forEach((face, ndx) => {
        const mAB = this.getMidPoint(face.a, face.b, midPointCache);
        const mBC = this.getMidPoint(face.b, face.c, midPointCache);
        const mCA = this.getMidPoint(face.c, face.a, midPointCache);

        const i = ndx * 4;
        newFaces[i + 0] = new Face(face.a, mAB, mCA);
        newFaces[i + 1] = new Face(face.b, mBC, mAB);
        newFaces[i + 2] = new Face(face.c, mCA, mBC);
        newFaces[i + 3] = new Face(mAB, mBC, mCA);
      });

      f = newFaces;
    }

    this.faces = f;
    return this;
  }

  spherize(radius = 1): this {
    this.vertices.forEach((vertex) => {
      vec3.normalize(vertex.normal, vertex.position);
      vec3.scale(vertex.position, vertex.normal, radius);
    });
    return this;
  }

  get data() {
    return {
      vertices: this.vertexData,
      indices: this.indexData,
      normals: this.normalData,
      uvs: this.uvData,
    };
  }

  get vertexData(): Float32Array {
    return new Float32Array(this.vertices.flatMap((v) => Array.from(v.position)));
  }

  get normalData(): Float32Array {
    return new Float32Array(this.vertices.flatMap((v) => Array.from(v.normal)));
  }

  get uvData(): Float32Array {
    return new Float32Array(this.vertices.flatMap((v) => Array.from(v.uv)));
  }

  get indexData(): Uint16Array {
    return new Uint16Array(this.faces.flatMap((f) => [f.a, f.b, f.c]));
  }

  getMidPoint(ndxA: number, ndxB: number, cache: Record<string, number>): number {
    const cacheKey = ndxA < ndxB ? `k_${ndxB}_${ndxA}` : `k_${ndxA}_${ndxB}`;
    if (Object.prototype.hasOwnProperty.call(cache, cacheKey)) {
      return cache[cacheKey]!;
    }
    const a = this.vertices[ndxA]!.position;
    const b = this.vertices[ndxB]!.position;
    const ndx = this.vertices.length;
    cache[cacheKey] = ndx;
    this.addVertex((a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5, (a[2] + b[2]) * 0.5);
    return ndx;
  }
}

class IcosahedronGeometry extends Geometry {
  constructor() {
    super();
    const t = Math.sqrt(5) * 0.5 + 0.5;
    this.addVertex(
      -1, t, 0,
      1, t, 0,
      -1, -t, 0,
      1, -t, 0,
      0, -1, t,
      0, 1, t,
      0, -1, -t,
      0, 1, -t,
      t, 0, -1,
      t, 0, 1,
      -t, 0, -1,
      -t, 0, 1,
    ).addFace(
      0, 11, 5,
      0, 5, 1,
      0, 1, 7,
      0, 7, 10,
      0, 10, 11,
      1, 5, 9,
      5, 11, 4,
      11, 10, 2,
      10, 7, 6,
      7, 1, 8,
      3, 9, 4,
      3, 4, 2,
      3, 2, 6,
      3, 6, 8,
      3, 8, 9,
      4, 9, 5,
      2, 4, 11,
      6, 2, 10,
      8, 6, 7,
      9, 8, 1,
    );
  }
}

class DiscGeometry extends Geometry {
  constructor(steps = 4, radius = 1) {
    super();
    const stepCount = Math.max(4, steps);

    const alpha = (2 * Math.PI) / stepCount;

    this.addVertex(0, 0, 0);
    this.lastVertex.uv[0] = 0.5;
    this.lastVertex.uv[1] = 0.5;

    for (let i = 0; i < stepCount; ++i) {
      const x = Math.cos(alpha * i);
      const y = Math.sin(alpha * i);
      this.addVertex(radius * x, radius * y, 0);
      this.lastVertex.uv[0] = x * 0.5 + 0.5;
      this.lastVertex.uv[1] = y * 0.5 + 0.5;

      if (i > 0) {
        this.addFace(0, i, i + 1);
      }
    }
    this.addFace(0, stepCount, 1);
  }
}

function createShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader;
  }
  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  return null;
}

function createProgram(
  gl: WebGL2RenderingContext,
  shaderSources: [string, string],
  attribLocations?: Record<string, number>,
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;

  [gl.VERTEX_SHADER, gl.FRAGMENT_SHADER].forEach((type, ndx) => {
    const shader = createShader(gl, type, shaderSources[ndx as 0 | 1]);
    if (shader) gl.attachShader(program, shader);
  });

  if (attribLocations) {
    for (const attrib in attribLocations) {
      gl.bindAttribLocation(program, attribLocations[attrib]!, attrib);
    }
  }

  gl.linkProgram(program);
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return program;
  }
  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
  return null;
}

function makeVertexArray(
  gl: WebGL2RenderingContext,
  bufLocNumElmPairs: Array<[WebGLBuffer, number, number]>,
  indices: Uint16Array,
): WebGLVertexArrayObject | null {
  const va = gl.createVertexArray();
  gl.bindVertexArray(va);

  for (const [buffer, loc, numElem] of bufLocNumElmPairs) {
    if (loc === -1) continue;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, numElem, gl.FLOAT, false, 0, 0);
  }

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  gl.bindVertexArray(null);
  return va;
}

function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement, maxDpr: number): boolean {
  const dpr = Math.min(maxDpr, window.devicePixelRatio);
  const displayWidth = Math.round(canvas.clientWidth * dpr);
  const displayHeight = Math.round(canvas.clientHeight * dpr);
  const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;
  if (needResize) {
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }
  return needResize;
}

function makeBuffer(
  gl: WebGL2RenderingContext,
  data: Float32Array,
  usage: number,
): WebGLBuffer {
  const buf = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, data, usage);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  return buf;
}

function createAndSetupTexture(
  gl: WebGL2RenderingContext,
  minFilter: number,
  magFilter: number,
  wrapS: number,
  wrapT: number,
): WebGLTexture {
  const texture = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
  return texture;
}

/**
 * Sharp title overlay only — the Portal field is generated in the
 * fragment shader so the energy surface never warps typography.
 */
function paintSigmaCell(
  ctx: CanvasRenderingContext2D,
  originX: number,
  originY: number,
  size: number,
  item: InfiniteMenuItem,
  index: number,
) {
  ctx.save();
  ctx.translate(originX, originY);
  ctx.clearRect(0, 0, size, size);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(5, 7, 14, 0.88)";
  ctx.shadowBlur = size * 0.045;
  ctx.shadowOffsetY = size * 0.006;

  ctx.fillStyle = "rgba(189, 224, 254, 0.82)";
  ctx.font = `600 ${size * 0.05}px ui-sans-serif, system-ui, sans-serif`;
  ctx.fillText(String(index + 1).padStart(2, "0"), size / 2, size * 0.27);

  ctx.fillStyle = "#FFFFFF";
  const fontSize = size * 0.072;
  ctx.font = `700 ${fontSize}px ui-sans-serif, system-ui, sans-serif`;

  const maxWidth = size * 0.68;
  const words = item.title.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (ctx.measureText(candidate).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);

  const lineHeight = fontSize * 1.24;
  const startY = size / 2 - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, i) => {
    ctx.fillText(line, size / 2, startY + i * lineHeight);
  });

  ctx.restore();
}

class ArcballControl {
  isPointerDown = false;
  orientation: quat = quat.create();
  pointerRotation: quat = quat.create();
  rotationVelocity = 0;
  rotationAxis: vec3 = vec3.fromValues(1, 0, 0);
  snapDirection: vec3 = vec3.fromValues(0, 0, -1);
  snapTargetDirection: vec3 | null = null;
  EPSILON = 0.1;
  IDENTITY_QUAT: quat = quat.create();

  private canvas: HTMLCanvasElement;
  private updateCallback: (deltaTime: number) => void;
  private pointerPos: vec2 = vec2.create();
  private previousPointerPos: vec2 = vec2.create();
  private _rotationVelocity = 0;
  private _combinedQuat: quat = quat.create();
  private onPointerDown: (e: PointerEvent) => void;
  private onPointerUp: () => void;
  private onPointerLeave: () => void;
  private onPointerMove: (e: PointerEvent) => void;

  /** Reduced motion trims the drift/inertia while keeping direct manipulation. */
  reduceMotion = false;

  constructor(
    canvas: HTMLCanvasElement,
    updateCallback: (deltaTime: number) => void,
    onInteractionStart?: () => void,
  ) {
    this.canvas = canvas;
    this.updateCallback = updateCallback;

    this.onPointerDown = (e: PointerEvent) => {
      vec2.set(this.pointerPos, e.clientX, e.clientY);
      vec2.copy(this.previousPointerPos, this.pointerPos);
      this.isPointerDown = true;
      onInteractionStart?.();
    };
    this.onPointerUp = () => {
      this.isPointerDown = false;
    };
    this.onPointerLeave = () => {
      this.isPointerDown = false;
    };
    this.onPointerMove = (e: PointerEvent) => {
      if (this.isPointerDown) {
        vec2.set(this.pointerPos, e.clientX, e.clientY);
      }
    };

    canvas.addEventListener("pointerdown", this.onPointerDown);
    canvas.addEventListener("pointerup", this.onPointerUp);
    canvas.addEventListener("pointerleave", this.onPointerLeave);
    canvas.addEventListener("pointermove", this.onPointerMove);
  }

  dispose() {
    this.canvas.removeEventListener("pointerdown", this.onPointerDown);
    this.canvas.removeEventListener("pointerup", this.onPointerUp);
    this.canvas.removeEventListener("pointerleave", this.onPointerLeave);
    this.canvas.removeEventListener("pointermove", this.onPointerMove);
  }

  update(deltaTime: number, targetFrameDuration = 16) {
    const timeScale = deltaTime / targetFrameDuration + 0.00001;
    let angleFactor = timeScale;
    const snapRotation = quat.create();

    if (this.isPointerDown) {
      const INTENSITY = 0.3 * timeScale;
      const ANGLE_AMPLIFICATION = 5 / timeScale;

      const midPointerPos = vec2.sub(vec2.create(), this.pointerPos, this.previousPointerPos);
      vec2.scale(midPointerPos, midPointerPos, INTENSITY);

      if (vec2.sqrLen(midPointerPos) > this.EPSILON) {
        vec2.add(midPointerPos, this.previousPointerPos, midPointerPos);

        const p = this.project(midPointerPos);
        const q = this.project(this.previousPointerPos);
        const a = vec3.normalize(vec3.create(), p);
        const b = vec3.normalize(vec3.create(), q);

        vec2.copy(this.previousPointerPos, midPointerPos);

        angleFactor *= ANGLE_AMPLIFICATION;

        this.quatFromVectors(a, b, this.pointerRotation, angleFactor);
      } else {
        quat.slerp(this.pointerRotation, this.pointerRotation, this.IDENTITY_QUAT, INTENSITY);
      }
    } else {
      const INTENSITY = (this.reduceMotion ? 0.6 : 0.1) * timeScale;
      quat.slerp(this.pointerRotation, this.pointerRotation, this.IDENTITY_QUAT, INTENSITY);

      if (this.snapTargetDirection) {
        const SNAPPING_INTENSITY = this.reduceMotion ? 0.45 : 0.2;
        const a = this.snapTargetDirection;
        const b = this.snapDirection;
        const sqrDist = vec3.squaredDistance(a, b);
        const distanceFactor = Math.max(0.1, 1 - sqrDist * 10);
        angleFactor *= SNAPPING_INTENSITY * distanceFactor;
        this.quatFromVectors(a, b, snapRotation, angleFactor);
      }
    }

    const combinedQuat = quat.multiply(quat.create(), snapRotation, this.pointerRotation);
    this.orientation = quat.multiply(quat.create(), combinedQuat, this.orientation);
    quat.normalize(this.orientation, this.orientation);

    const RA_INTENSITY = 0.8 * timeScale;
    quat.slerp(this._combinedQuat, this._combinedQuat, combinedQuat, RA_INTENSITY);
    quat.normalize(this._combinedQuat, this._combinedQuat);

    const rad = Math.acos(this._combinedQuat[3]) * 2.0;
    const s = Math.sin(rad / 2.0);
    let rv = 0;
    if (s > 0.000001) {
      rv = rad / (2 * Math.PI);
      this.rotationAxis[0] = this._combinedQuat[0] / s;
      this.rotationAxis[1] = this._combinedQuat[1] / s;
      this.rotationAxis[2] = this._combinedQuat[2] / s;
    }

    const RV_INTENSITY = 0.5 * timeScale;
    this._rotationVelocity += (rv - this._rotationVelocity) * RV_INTENSITY;
    this.rotationVelocity = this._rotationVelocity / timeScale;

    this.updateCallback(deltaTime);
  }

  quatFromVectors(a: vec3, b: vec3, out: quat, angleFactor = 1) {
    const axis = vec3.cross(vec3.create(), a, b);
    vec3.normalize(axis, axis);
    const d = Math.max(-1, Math.min(1, vec3.dot(a, b)));
    const angle = Math.acos(d) * angleFactor;
    quat.setAxisAngle(out, axis, angle);
    return { q: out, axis, angle };
  }

  private project(pos: vec2): vec3 {
    const r = 2;
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    const s = Math.max(w, h) - 1;

    const x = (2 * pos[0] - w - 1) / s;
    const y = (2 * pos[1] - h - 1) / s;
    let z = 0;
    const xySq = x * x + y * y;
    const rSq = r * r;

    if (xySq <= rSq / 2.0) {
      z = Math.sqrt(rSq - xySq);
    } else {
      z = rSq / Math.sqrt(xySq);
    }
    return vec3.fromValues(-x, y, z);
  }
}

type DiscInstances = {
  matricesArray: Float32Array;
  matrices: Float32Array[];
  buffer: WebGLBuffer;
};

type DiscBuffers = {
  vertices: Float32Array;
  indices: Uint16Array;
  normals: Float32Array;
  uvs: Float32Array;
};

type DiscLocations = {
  aModelPosition: number;
  aModelUvs: number;
  aInstanceMatrix: number;
  uWorldMatrix: WebGLUniformLocation | null;
  uViewMatrix: WebGLUniformLocation | null;
  uProjectionMatrix: WebGLUniformLocation | null;
  uCameraPosition: WebGLUniformLocation | null;
  uScaleFactor: WebGLUniformLocation | null;
  uRotationAxisVelocity: WebGLUniformLocation | null;
  uTex: WebGLUniformLocation | null;
  uFrames: WebGLUniformLocation | null;
  uItemCount: WebGLUniformLocation | null;
  uAtlasSize: WebGLUniformLocation | null;
  uReduceMotion: WebGLUniformLocation | null;
};

class InfiniteGridMenu {
  TARGET_FRAME_DURATION = 1000 / 60;
  SPHERE_RADIUS = 2;

  private time = 0;
  private deltaTime = 0;
  private deltaFrames = 0;
  private frames = 0;
  private rafId: number | null = null;
  private running = false;

  camera = {
    matrix: mat4.create(),
    near: 0.1,
    far: 40,
    fov: Math.PI / 4,
    aspect: 1,
    position: vec3.fromValues(0, 0, 3),
    up: vec3.fromValues(0, 1, 0),
    matrices: {
      view: mat4.create(),
      projection: mat4.create(),
      inversProjection: mat4.create(),
    },
  };

  smoothRotationVelocity = 0;
  scaleFactor = 1.0;
  movementActive = false;
  reduceMotion = false;
  maxDpr = 2;

  private canvas: HTMLCanvasElement;
  private items: InfiniteMenuItem[];
  private onActiveItemChange: (index: number) => void;
  private onMovementChange: (isMoving: boolean) => void;
  private gl!: WebGL2RenderingContext;
  private discProgram!: WebGLProgram;
  private discLocations!: DiscLocations;
  private discVAO!: WebGLVertexArrayObject | null;
  private discBuffers!: DiscBuffers;
  private discInstances!: DiscInstances;
  private instancePositions: vec3[] = [];
  private DISC_INSTANCE_COUNT = 0;
  private worldMatrix = mat4.create();
  private tex!: WebGLTexture;
  private atlasSize = 1;
  private viewportSize: vec2 = vec2.create();
  private forcedVertexIndex: number | null = null;

  control!: ArcballControl;

  constructor(
    canvas: HTMLCanvasElement,
    items: InfiniteMenuItem[],
    onActiveItemChange: (index: number) => void,
    onMovementChange: (isMoving: boolean) => void,
    options: { scale?: number; reduceMotion?: boolean; maxDpr?: number } = {},
  ) {
    this.canvas = canvas;
    this.items = items;
    this.onActiveItemChange = onActiveItemChange;
    this.onMovementChange = onMovementChange;
    this.scaleFactor = options.scale ?? 1;
    this.reduceMotion = options.reduceMotion ?? false;
    this.maxDpr = options.maxDpr ?? 2;
    this.camera.position[2] = 3 * this.scaleFactor;
    this.init();
  }

  resize() {
    this.viewportSize = vec2.set(
      this.viewportSize,
      this.canvas.clientWidth,
      this.canvas.clientHeight,
    );

    const gl = this.gl;
    const needsResize = resizeCanvasToDisplaySize(
      gl.canvas as HTMLCanvasElement,
      this.maxDpr,
    );
    if (needsResize) {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }

    this.updateProjectionMatrix(gl);
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.time = performance.now();
    this.rafId = requestAnimationFrame((t) => this.run(t));
  }

  stop() {
    this.running = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  dispose() {
    this.stop();
    this.control.dispose();
    const gl = this.gl;
    if (this.tex) gl.deleteTexture(this.tex);
    if (this.discProgram) gl.deleteProgram(this.discProgram);
  }

  run(time = 0) {
    if (!this.running) return;
    this.deltaTime = Math.min(32, time - this.time);
    this.time = time;
    this.deltaFrames = this.deltaTime / this.TARGET_FRAME_DURATION;
    this.frames += this.deltaFrames;

    this.animate(this.deltaTime);
    this.render();

    if (!this.running) return;
    this.rafId = requestAnimationFrame((t) => this.run(t));
  }

  /** Keyboard focus brings a specific service to the front of the sphere. */
  focusItem(itemIndex: number) {
    const candidates: number[] = [];
    for (let i = 0; i < this.instancePositions.length; ++i) {
      if (i % this.items.length === itemIndex) candidates.push(i);
    }
    if (candidates.length === 0) return;

    const n = this.control.snapDirection;
    const inversOrientation = quat.conjugate(quat.create(), this.control.orientation);
    const nt = vec3.transformQuat(vec3.create(), n, inversOrientation);

    let best = candidates[0]!;
    let maxD = -Infinity;
    for (const index of candidates) {
      const d = vec3.dot(nt, this.instancePositions[index]!);
      if (d > maxD) {
        maxD = d;
        best = index;
      }
    }

    this.forcedVertexIndex = best;
    this.start();
  }

  private init() {
    // alpha + non-premultiplied output so the page background shows through
    // the depth-faded discs without edge fringing.
    const gl = this.canvas.getContext("webgl2", {
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
    });
    if (!gl) {
      throw new Error("No WebGL 2 context!");
    }
    this.gl = gl;

    this.viewportSize = vec2.fromValues(this.canvas.clientWidth, this.canvas.clientHeight);

    const program = createProgram(gl, [discVertShaderSource, discFragShaderSource], {
      aModelPosition: 0,
      aModelNormal: 1,
      aModelUvs: 2,
      aInstanceMatrix: 3,
    });
    if (!program) throw new Error("Could not compile the infinite menu program");
    this.discProgram = program;

    this.discLocations = {
      aModelPosition: gl.getAttribLocation(program, "aModelPosition"),
      aModelUvs: gl.getAttribLocation(program, "aModelUvs"),
      aInstanceMatrix: gl.getAttribLocation(program, "aInstanceMatrix"),
      uWorldMatrix: gl.getUniformLocation(program, "uWorldMatrix"),
      uViewMatrix: gl.getUniformLocation(program, "uViewMatrix"),
      uProjectionMatrix: gl.getUniformLocation(program, "uProjectionMatrix"),
      uCameraPosition: gl.getUniformLocation(program, "uCameraPosition"),
      uScaleFactor: gl.getUniformLocation(program, "uScaleFactor"),
      uRotationAxisVelocity: gl.getUniformLocation(program, "uRotationAxisVelocity"),
      uTex: gl.getUniformLocation(program, "uTex"),
      uFrames: gl.getUniformLocation(program, "uFrames"),
      uItemCount: gl.getUniformLocation(program, "uItemCount"),
      uAtlasSize: gl.getUniformLocation(program, "uAtlasSize"),
      uReduceMotion: gl.getUniformLocation(program, "uReduceMotion"),
    };

    const discGeo = new DiscGeometry(56, 1);
    this.discBuffers = discGeo.data;
    this.discVAO = makeVertexArray(
      gl,
      [
        [
          makeBuffer(gl, this.discBuffers.vertices, gl.STATIC_DRAW),
          this.discLocations.aModelPosition,
          3,
        ],
        [
          makeBuffer(gl, this.discBuffers.uvs, gl.STATIC_DRAW),
          this.discLocations.aModelUvs,
          2,
        ],
      ],
      this.discBuffers.indices,
    );

    const icoGeo = new IcosahedronGeometry();
    icoGeo.subdivide(1).spherize(this.SPHERE_RADIUS);
    this.instancePositions = icoGeo.vertices.map((v) => v.position);
    this.DISC_INSTANCE_COUNT = icoGeo.vertices.length;
    this.initDiscInstances(this.DISC_INSTANCE_COUNT);

    this.worldMatrix = mat4.create();
    this.initTexture();

    this.control = new ArcballControl(
      this.canvas,
      (deltaTime) => this.onControlUpdate(deltaTime),
      () => this.start(),
    );
    this.control.reduceMotion = this.reduceMotion;

    this.updateCameraMatrix();
    this.updateProjectionMatrix(gl);
    this.resize();
    this.animate(16);
    this.render();
  }

  /** Sharp title atlas: no mipmaps, no baked grid/fill. */
  private initTexture() {
    const gl = this.gl;
    this.tex = createAndSetupTexture(
      gl,
      gl.LINEAR,
      gl.LINEAR,
      gl.CLAMP_TO_EDGE,
      gl.CLAMP_TO_EDGE,
    );

    const itemCount = Math.max(1, this.items.length);
    this.atlasSize = Math.ceil(Math.sqrt(itemCount));
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { alpha: true });
    const cellSize = 512;

    canvas.width = this.atlasSize * cellSize;
    canvas.height = this.atlasSize * cellSize;

    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.items.forEach((item, i) => {
        const x = (i % this.atlasSize) * cellSize;
        const y = Math.floor(i / this.atlasSize) * cellSize;
        paintSigmaCell(ctx, x, y, cellSize, item, i);
      });
    }

    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
  }

  private initDiscInstances(count: number) {
    const gl = this.gl;
    this.discInstances = {
      matricesArray: new Float32Array(count * 16),
      matrices: [],
      buffer: gl.createBuffer()!,
    };
    for (let i = 0; i < count; ++i) {
      const instanceMatrixArray = new Float32Array(
        this.discInstances.matricesArray.buffer,
        i * 16 * 4,
        16,
      );
      instanceMatrixArray.set(mat4.create());
      this.discInstances.matrices.push(instanceMatrixArray);
    }
    gl.bindVertexArray(this.discVAO);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.discInstances.buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      this.discInstances.matricesArray.byteLength,
      gl.DYNAMIC_DRAW,
    );
    const mat4AttribSlotCount = 4;
    const bytesPerMatrix = 16 * 4;
    for (let j = 0; j < mat4AttribSlotCount; ++j) {
      const loc = this.discLocations.aInstanceMatrix + j;
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, bytesPerMatrix, j * 4 * 4);
      gl.vertexAttribDivisor(loc, 1);
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindVertexArray(null);
  }

  private animate(deltaTime: number) {
    const gl = this.gl;
    this.control.update(deltaTime, this.TARGET_FRAME_DURATION);

    const positions = this.instancePositions.map((p) =>
      vec3.transformQuat(vec3.create(), p, this.control.orientation),
    );
    const scale = 0.25;
    const SCALE_INTENSITY = 0.6;
    positions.forEach((p, ndx) => {
      const s = (Math.abs(p[2]) / this.SPHERE_RADIUS) * SCALE_INTENSITY + (1 - SCALE_INTENSITY);
      const finalScale = s * scale;
      const matrix = mat4.create();
      mat4.multiply(matrix, matrix, mat4.fromTranslation(mat4.create(), vec3.negate(vec3.create(), p)));
      mat4.multiply(matrix, matrix, mat4.targetTo(mat4.create(), [0, 0, 0], p, [0, 1, 0]));
      mat4.multiply(matrix, matrix, mat4.fromScaling(mat4.create(), [finalScale, finalScale, finalScale]));
      mat4.multiply(matrix, matrix, mat4.fromTranslation(mat4.create(), [0, 0, -this.SPHERE_RADIUS]));

      mat4.copy(this.discInstances.matrices[ndx]!, matrix);
    });

    gl.bindBuffer(gl.ARRAY_BUFFER, this.discInstances.buffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.discInstances.matricesArray);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    this.smoothRotationVelocity = this.control.rotationVelocity;
  }

  private render() {
    const gl = this.gl;
    gl.useProgram(this.discProgram);

    gl.disable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const locations = this.discLocations;
    gl.uniformMatrix4fv(locations.uWorldMatrix, false, this.worldMatrix);
    gl.uniformMatrix4fv(locations.uViewMatrix, false, this.camera.matrices.view);
    gl.uniformMatrix4fv(locations.uProjectionMatrix, false, this.camera.matrices.projection);
    gl.uniform3f(
      locations.uCameraPosition,
      this.camera.position[0],
      this.camera.position[1],
      this.camera.position[2],
    );
    gl.uniform4f(
      locations.uRotationAxisVelocity,
      this.control.rotationAxis[0],
      this.control.rotationAxis[1],
      this.control.rotationAxis[2],
      this.smoothRotationVelocity * 1.1,
    );

    gl.uniform1i(locations.uItemCount, this.items.length);
    gl.uniform1i(locations.uAtlasSize, this.atlasSize);

    gl.uniform1f(locations.uFrames, this.frames);
    gl.uniform1f(locations.uScaleFactor, this.scaleFactor);
    gl.uniform1f(locations.uReduceMotion, this.reduceMotion ? 1 : 0);

    gl.uniform1i(locations.uTex, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.tex);

    gl.bindVertexArray(this.discVAO);
    gl.drawElementsInstanced(
      gl.TRIANGLES,
      this.discBuffers.indices.length,
      gl.UNSIGNED_SHORT,
      0,
      this.DISC_INSTANCE_COUNT,
    );
  }

  private updateCameraMatrix() {
    mat4.targetTo(this.camera.matrix, this.camera.position, [0, 0, 0], this.camera.up);
    mat4.invert(this.camera.matrices.view, this.camera.matrix);
  }

  private updateProjectionMatrix(gl: WebGL2RenderingContext) {
    const canvas = gl.canvas as HTMLCanvasElement;
    this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
    const height = this.SPHERE_RADIUS * 0.35;
    const distance = this.camera.position[2];
    if (this.camera.aspect > 1) {
      this.camera.fov = 2 * Math.atan(height / distance);
    } else {
      this.camera.fov = 2 * Math.atan(height / this.camera.aspect / distance);
    }
    mat4.perspective(
      this.camera.matrices.projection,
      this.camera.fov,
      this.camera.aspect,
      this.camera.near,
      this.camera.far,
    );
    mat4.invert(this.camera.matrices.inversProjection, this.camera.matrices.projection);
  }

  private onControlUpdate(deltaTime: number) {
    const timeScale = deltaTime / this.TARGET_FRAME_DURATION + 0.0001;
    let damping = 5 / timeScale;
    let cameraTargetZ = 3 * this.scaleFactor;

    const isMoving =
      this.control.isPointerDown || Math.abs(this.smoothRotationVelocity) > 0.01;

    if (isMoving !== this.movementActive) {
      this.movementActive = isMoving;
      this.onMovementChange(isMoving);
    }

    if (!this.control.isPointerDown) {
      const nearestVertexIndex = this.forcedVertexIndex ?? this.findNearestVertexIndex();
      const itemIndex = nearestVertexIndex % Math.max(1, this.items.length);
      this.onActiveItemChange(itemIndex);
      const snapDirection = vec3.normalize(
        vec3.create(),
        this.getVertexWorldPosition(nearestVertexIndex),
      );
      this.control.snapTargetDirection = snapDirection;

      // Keep the Portal field animating while the section is on-screen.
      // Reduced-motion still parks the loop once the sphere has snapped.
      if (
        this.reduceMotion &&
        !isMoving &&
        vec3.squaredDistance(snapDirection, this.control.snapDirection) < 1e-5
      ) {
        this.stop();
      }
    } else {
      this.forcedVertexIndex = null;
      cameraTargetZ += this.control.rotationVelocity * 80 + 2.5;
      damping = 7 / timeScale;
    }

    this.camera.position[2] += (cameraTargetZ - this.camera.position[2]) / damping;
    this.updateCameraMatrix();
  }

  private findNearestVertexIndex(): number {
    const n = this.control.snapDirection;
    const inversOrientation = quat.conjugate(quat.create(), this.control.orientation);
    const nt = vec3.transformQuat(vec3.create(), n, inversOrientation);

    let maxD = -1;
    let nearestVertexIndex = 0;
    for (let i = 0; i < this.instancePositions.length; ++i) {
      const d = vec3.dot(nt, this.instancePositions[i]!);
      if (d > maxD) {
        maxD = d;
        nearestVertexIndex = i;
      }
    }
    return nearestVertexIndex;
  }

  private getVertexWorldPosition(index: number): vec3 {
    const nearestVertexPos = this.instancePositions[index]!;
    return vec3.transformQuat(vec3.create(), nearestVertexPos, this.control.orientation);
  }
}

type InfiniteMenuProps = {
  items: readonly InfiniteMenuItem[];
  ariaLabel: string;
};

export function InfiniteMenu({ items, ariaLabel }: InfiniteMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sketchRef = useRef<InfiniteGridMenu | null>(null);
  const dragRef = useRef({ pointerId: -1, startX: 0, startY: 0, didDrag: false });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  const activeItem = items[activeIndex] ?? items[0];

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;

    let sketch: InfiniteGridMenu;
    try {
      sketch = new InfiniteGridMenu(
        canvas,
        items.map((item) => ({ ...item })),
        setActiveIndex,
        setIsMoving,
        { reduceMotion, maxDpr: isCoarse ? 1.5 : 2 },
      );
    } catch (error) {
      console.error("InfiniteMenu WebGL init failed", error);
      canvas.style.background = "#ff00aa";
      return;
    }
    sketchRef.current = sketch;

    const handleResize = () => sketch.resize();
    window.addEventListener("resize", handleResize);
    handleResize();

    let intersecting = false;
    const syncRun = () => {
      if (intersecting && !document.hidden) sketch.start();
      else sketch.stop();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        intersecting = Boolean(entry?.isIntersecting);
        syncRun();
      },
      { threshold: 0.05 },
    );
    observer.observe(root);

    const onVisibility = () => syncRun();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", handleResize);
      sketch.dispose();
      sketchRef.current = null;
    };
  }, [items]);

  const handleFocusItem = useCallback((index: number) => {
    sketchRef.current?.focusItem(index);
  }, []);

  const handlePointerDownCapture = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      didDrag: false,
    };
  };

  const handlePointerMoveCapture = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag.pointerId !== event.pointerId || drag.didDrag) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    if (Math.hypot(deltaX, deltaY) > 8) {
      drag.didDrag = true;
    }
  };

  const preventDragClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!dragRef.current.didDrag) return;
    event.preventDefault();
    event.stopPropagation();
    dragRef.current.didDrag = false;
  };

  const stateClass = isMoving ? "inactive" : "active";

  return (
    <div
      className="infinite-menu-root"
      ref={rootRef}
      onPointerDownCapture={handlePointerDownCapture}
      onPointerMoveCapture={handlePointerMoveCapture}
    >
      <canvas
        className="infinite-menu-canvas"
        ref={canvasRef}
        aria-hidden="true"
        tabIndex={-1}
      />

      {activeItem ? (
        <>
          <p className={`infinite-menu-face-title ${stateClass}`} aria-hidden="true">
            {activeItem.title}
          </p>
          <p className={`infinite-menu-face-index ${stateClass}`} aria-hidden="true">
            {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </p>
          <Link
            href={activeItem.link}
            className={`infinite-menu-action ${stateClass}`}
            aria-label={activeItem.title}
            tabIndex={-1}
            onClick={preventDragClick}
          >
            <ArrowUpRight className="infinite-menu-action-icon" aria-hidden="true" strokeWidth={2.25} />
          </Link>
        </>
      ) : null}

      <ul className="infinite-menu-links" aria-label={ariaLabel}>
        {items.map((item, index) => (
          <li key={item.link}>
            <Link
              href={item.link}
              onFocus={() => handleFocusItem(index)}
              aria-current={index === activeIndex ? "true" : undefined}
            >
              {item.title}
              {index === activeIndex ? " (in front)" : ""}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
