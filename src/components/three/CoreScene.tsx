"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";

import { ORBIT_NODES } from "./nodes";

// @react-three/fiber v9 still constructs THREE.Clock internally, which three r18x flags as
// deprecated on every canvas mount. Drop only that one library notice; everything else passes through.
if (typeof window !== "undefined" && !(window as Window & { __clockWarnPatched?: boolean }).__clockWarnPatched) {
  (window as Window & { __clockWarnPatched?: boolean }).__clockWarnPatched = true;
  const warn = console.warn.bind(console);
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].startsWith("THREE.Clock: This module has been deprecated")) return;
    warn(...args);
  };
}

const RINGS = [
  { r: 2.15, rot: [1.18, 0.12, 0.3] as const, speed: 0.22 },
  { r: 2.9, rot: [1.32, -0.28, -0.55] as const, speed: -0.15 },
  { r: 3.65, rot: [1.02, 0.32, 0.95] as const, speed: 0.1 },
];

const GREEN = new THREE.Color("#3ee6a0");
const VIOLET = new THREE.Color("#8f6bff");

/** Deterministic PRNG so the particle field is stable between renders. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

let glowTex: THREE.Texture | null = null;
function getGlowTexture() {
  if (glowTex) return glowTex;
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.25, "rgba(255,255,255,0.45)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  glowTex = new THREE.CanvasTexture(c);
  return glowTex;
}

const coreVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;
const coreFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uA;
  uniform vec3 uB;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float f = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.4);
    float m = smoothstep(-0.7, 0.9, vNormal.y + sin(uTime * 0.7 + vNormal.x * 2.0) * 0.35);
    vec3 col = mix(uA, uB, m);
    vec3 base = vec3(0.012, 0.02, 0.016);
    gl_FragColor = vec4(base + col * f * 1.7, 1.0);
  }
`;

type SceneProps = {
  labelRefs: RefObject<(HTMLElement | null)[]>;
  coreRef: RefObject<HTMLElement | null>;
  lite: boolean;
  reduce: boolean;
};

function Scene({ labelRefs, coreRef, lite, reduce }: SceneProps) {
  const size = useThree((st) => st.size);
  const root = useRef<THREE.Group>(null);
  const wire = useRef<THREE.LineSegments>(null);
  const particles = useRef<THREE.Points>(null);
  const ringGroups = useRef<(THREE.Group | null)[]>([]);
  const nodeMeshes = useRef<(THREE.Object3D | null)[]>([]);
  const linkGeo = useRef<THREE.BufferGeometry>(null);
  const packetGeo = useRef<THREE.BufferGeometry>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const coreMesh = useRef<THREE.Mesh>(null);
  const coreUniforms = useMemo(() => ({ uTime: { value: 0 }, uA: { value: GREEN }, uB: { value: VIOLET } }), []);

  const wireGeo = useMemo(() => new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.6, 1)), []);

  const ringGeos = useMemo(
    () =>
      RINGS.map(({ r }) => {
        const pts: THREE.Vector3[] = [];
        for (let i = 0; i <= 128; i++) {
          const a = (i / 128) * Math.PI * 2;
          pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
        }
        return new THREE.BufferGeometry().setFromPoints(pts);
      }),
    [],
  );

  const particleData = useMemo(() => {
    const rand = mulberry32(7);
    const count = lite ? 260 : 720;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const tmp = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const r = 4.4 + rand() * 5;
      const th = rand() * Math.PI * 2;
      const ph = Math.acos(2 * rand() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.7;
      pos[i * 3 + 2] = r * Math.cos(ph);
      tmp.copy(GREEN).lerp(VIOLET, rand()).multiplyScalar(0.5 + rand() * 0.6);
      col.set([tmp.r, tmp.g, tmp.b], i * 3);
    }
    return { pos, col };
  }, [lite]);

  const linkPositions = useMemo(() => new Float32Array(ORBIT_NODES.length * 6), []);
  const packetPositions = useMemo(() => new Float32Array(ORBIT_NODES.length * 3), []);

  // Pointer parallax
  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce]);

  const v = useMemo(() => new THREE.Vector3(), []);
  const camPos = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const camera = state.camera;
    const t = reduce ? 4 : state.clock.elapsedTime;
    const mat = coreMesh.current?.material as THREE.ShaderMaterial | undefined;
    if (mat) mat.uniforms.uTime.value = t;

    if (root.current) {
      const tx = pointer.current.y * 0.18;
      const ty = pointer.current.x * 0.32 + t * 0.03;
      root.current.rotation.x += (tx - root.current.rotation.x) * Math.min(1, delta * 2.5);
      root.current.rotation.y += (ty - root.current.rotation.y) * Math.min(1, delta * 2.5);
    }
    if (wire.current) {
      wire.current.rotation.y = t * 0.12;
      wire.current.rotation.z = t * 0.05;
    }
    if (particles.current) particles.current.rotation.y = t * 0.015;

    // move nodes along rings
    ORBIT_NODES.forEach((n, i) => {
      const ring = RINGS[n.ring];
      const obj = nodeMeshes.current[i];
      if (!obj) return;
      const a = n.phase + t * ring.speed;
      obj.position.set(Math.cos(a) * ring.r, Math.sin(a) * ring.r, 0);
    });
    state.scene.updateMatrixWorld();

    camera.getWorldPosition(camPos);
    const coreDist = camPos.length();

    ORBIT_NODES.forEach((_, i) => {
      const obj = nodeMeshes.current[i];
      if (!obj) return;
      obj.getWorldPosition(v);

      linkPositions.set([0, 0, 0, v.x, v.y, v.z], i * 6);
      const k = (t * 0.45 + i / ORBIT_NODES.length) % 1;
      packetPositions.set([v.x * (1 - k), v.y * (1 - k), v.z * (1 - k)], i * 3);

      const el = labelRefs.current?.[i];
      if (el) {
        const behind = v.distanceTo(camPos) > coreDist;
        const p = v.clone().project(camera);
        const x = (p.x * 0.5 + 0.5) * size.width;
        const y = (-p.y * 0.5 + 0.5) * size.height;
        const s = behind ? 0.86 : 1;
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${s})`;
        el.style.opacity = behind ? "0.38" : "1";
        el.style.zIndex = behind ? "1" : "3";
      }
    });

    if (coreRef.current) {
      const p = v.set(0, 0, 0).project(camera);
      coreRef.current.style.transform = `translate3d(${((p.x * 0.5 + 0.5) * size.width).toFixed(1)}px, ${((-p.y * 0.5 + 0.5) * size.height).toFixed(1)}px, 0) translate(-50%, -50%)`;
    }

    if (linkGeo.current) linkGeo.current.attributes.position.needsUpdate = true;
    if (packetGeo.current) packetGeo.current.attributes.position.needsUpdate = true;

    camera.position.x += (pointer.current.x * 0.35 - camera.position.x) * Math.min(1, delta * 2);
    camera.position.y += (-pointer.current.y * 0.25 - camera.position.y) * Math.min(1, delta * 2);
    camera.lookAt(0, 0, 0);
  });

  const glow = getGlowTexture();

  return (
    <>
      {/* soft halo behind the core */}
      <sprite scale={[7.5, 7.5, 1]}>
        <spriteMaterial map={glow} color="#1f8f66" transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      <sprite scale={[11, 11, 1]} position={[0.8, -0.6, -2]}>
        <spriteMaterial map={glow} color="#4b2fa8" transparent opacity={0.4} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>

      <group ref={root} scale={lite ? 0.84 : 1}>
        <mesh ref={coreMesh} scale={1.15}>
          <sphereGeometry args={[1, 64, 64]} />
          <shaderMaterial uniforms={coreUniforms} vertexShader={coreVertex} fragmentShader={coreFragment} />
        </mesh>
        <sprite scale={[1.6, 1.6, 1]}>
          <spriteMaterial map={glow} color="#7dffd0" transparent opacity={0.7} depthWrite={false} blending={THREE.AdditiveBlending} />
        </sprite>
        <lineSegments ref={wire} geometry={wireGeo}>
          <lineBasicMaterial color="#3ee6a0" transparent opacity={0.16} depthWrite={false} />
        </lineSegments>

        {RINGS.map((ring, ri) => (
          <group key={ri} rotation={ring.rot as unknown as THREE.Euler} ref={(g) => { ringGroups.current[ri] = g; }}>
            <lineLoop geometry={ringGeos[ri]}>
              <lineBasicMaterial color={ri === 1 ? "#8f6bff" : "#3ee6a0"} transparent opacity={0.22} depthWrite={false} />
            </lineLoop>
            {ORBIT_NODES.map((n, i) =>
              n.ring === ri ? (
                <group key={n.id} ref={(o) => { nodeMeshes.current[i] = o; }}>
                  <mesh>
                    <sphereGeometry args={[0.065, 16, 16]} />
                    <meshBasicMaterial color={ri === 1 ? "#c9b8ff" : "#b8ffe0"} />
                  </mesh>
                  <sprite scale={[0.7, 0.7, 1]}>
                    <spriteMaterial map={glow} color={ri === 1 ? "#8f6bff" : "#3ee6a0"} transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
                  </sprite>
                </group>
              ) : null,
            )}
          </group>
        ))}

        <lineSegments>
          <bufferGeometry ref={linkGeo}>
            <bufferAttribute attach="attributes-position" args={[linkPositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#3ee6a0" transparent opacity={0.12} depthWrite={false} />
        </lineSegments>
        <points>
          <bufferGeometry ref={packetGeo}>
            <bufferAttribute attach="attributes-position" args={[packetPositions, 3]} />
          </bufferGeometry>
          <pointsMaterial map={glow} size={0.22} color="#b8ffe0" transparent depthWrite={false} blending={THREE.AdditiveBlending} />
        </points>
      </group>

      <points ref={particles}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particleData.pos, 3]} />
          <bufferAttribute attach="attributes-color" args={[particleData.col, 3]} />
        </bufferGeometry>
        <pointsMaterial map={glow} size={0.09} vertexColors transparent opacity={0.8} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
    </>
  );
}

export default function CoreCanvas({
  labelRefs,
  coreRef,
  lite,
  reduce,
  active,
  onReady,
}: SceneProps & { active: boolean; onReady: () => void }) {
  return (
    <Canvas
      dpr={[1, lite ? 1.5 : 1.75]}
      camera={{ position: [0, 0, lite ? 12 : 11], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduce ? "demand" : active ? "always" : "never"}
      onCreated={() => requestAnimationFrame(onReady)}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden
    >
      <Scene labelRefs={labelRefs} coreRef={coreRef} lite={lite} reduce={reduce} />
    </Canvas>
  );
}
