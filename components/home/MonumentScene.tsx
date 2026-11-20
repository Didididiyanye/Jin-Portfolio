"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Lightformer,
  RoundedBox,
  Sky,
} from "@react-three/drei";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SheepModel } from "./SheepModel";
import { useLanguage } from "@/lib/i18n";
import styles from "./monument-scene.module.css";

gsap.registerPlugin(useGSAP);

type SectionId = "about" | "works" | "approach" | "contact";

type MonumentModule = {
  id: SectionId;
  label: string;
  detail: string;
  color: string;
  ink: string;
  panel: string;
  position: [number, number, number];
  width: number;
  height: number;
  depth: number;
};

const MODULES: MonumentModule[] = [
  { id: "about", label: "ABOUT", detail: "Practice and point of view", color: "#9dd8bd", ink: "#0a1117", panel: "#9dd8bd", position: [-0.16, 1.72, 0.08], width: 3.05, height: 0.82, depth: 0.82 },
  { id: "works", label: "WORKS", detail: "Selected projects", color: "#2457d6", ink: "#ffffff", panel: "#153aa2", position: [0.18, 0.7, 0.14], width: 3.72, height: 0.94, depth: 0.94 },
  { id: "approach", label: "APPROACH", detail: "Systems and motion", color: "#c8f000", ink: "#0a1117", panel: "#d9ff22", position: [-0.2, -0.35, 0.09], width: 3.34, height: 0.84, depth: 0.84 },
  { id: "contact", label: "CONTACT", detail: "Start a conversation", color: "#ff5b4d", ink: "#ffffff", panel: "#dd4035", position: [0.14, -1.32, 0.12], width: 3.5, height: 0.82, depth: 0.82 },
];

function createGroundTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const context = canvas.getContext("2d");
  if (!context) return null;
  context.fillStyle = "#7fa35d";
  context.fillRect(0, 0, 1024, 1024);
  for (let index = 0; index < 11000; index += 1) {
    context.fillStyle = Math.random() > 0.52 ? "rgba(57,96,42,0.24)" : "rgba(185,214,135,0.2)";
    context.beginPath();
    context.arc(Math.random() * 1024, Math.random() * 1024, Math.random() * 2.1 + 0.3, 0, Math.PI * 2);
    context.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function createModuleTexture(module: MonumentModule) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  if (!context) return null;
  context.fillStyle = module.panel;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = module.ink;
  context.textAlign = "left";
  context.textBaseline = "middle";
  context.font = "700 68px Arial, sans-serif";
  context.fillText(module.label, 84, 108);
  context.globalAlpha = 0.7;
  context.font = "400 30px Arial, sans-serif";
  context.fillText(module.detail, 86, 176);
  context.globalAlpha = 1;
  context.strokeStyle = module.ink;
  context.lineWidth = 7;
  context.lineCap = "round";
  const arrowX = 892;
  const arrowY = 128;
  context.beginPath();
  context.moveTo(arrowX - 40, arrowY);
  context.lineTo(arrowX + 34, arrowY);
  context.moveTo(arrowX + 8, arrowY - 26);
  context.lineTo(arrowX + 34, arrowY);
  context.lineTo(arrowX + 8, arrowY + 26);
  context.stroke();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function createCrownTexture(label: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  if (!context) return null;
  context.fillStyle = "#f7f1e6";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#0a1117";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = "800 84px Arial, sans-serif";
  context.fillText(label, 512, 132);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function GrassField() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => new THREE.ConeGeometry(0.025, 0.34, 3), []);
  const material = useMemo(() => new THREE.MeshStandardMaterial({ color: "#4a7036", roughness: 1 }), []);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    let placed = 0;
    for (let attempt = 0; attempt < 1200 && placed < 320; attempt += 1) {
      const x = (Math.random() - 0.5) * 17;
      const z = (Math.random() - 0.5) * 9;
      if (Math.abs(x) < 2.8 && z > -2.6) continue;
      dummy.position.set(x, -2.9, z);
      dummy.rotation.y = Math.random() * Math.PI;
      dummy.scale.setScalar(0.65 + Math.random() * 0.9);
      dummy.updateMatrix();
      mesh.setMatrixAt(placed, dummy.matrix);
      placed += 1;
    }
    mesh.count = placed;
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  return <instancedMesh ref={meshRef} args={[geometry, material, 320]} castShadow receiveShadow />;
}

function CloudPuff({ position, scale }: { position: [number, number, number]; scale: number }) {
  return (
    <group position={position} scale={scale}>
      {[
        [-1.1, 0, 0, 1.1],
        [0, 0.25, 0, 1.45],
        [1.25, 0, 0, 1.05],
        [0.45, -0.05, 0.15, 1.2],
      ].map(([x, y, z, s], index) => (
        <mesh key={index} position={[x, y, z]}>
          <sphereGeometry args={[s, 24, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={1} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function MonumentBlock({ module, index, onSelect }: { module: MonumentModule; index: number; onSelect: (id: SectionId) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const baseZ = module.position[2];
  const { contextSafe } = useGSAP({ scope: groupRef });
  const moduleTexture = useMemo(() => createModuleTexture(module), [module]);
  const labelWidth = module.width * 0.83;
  const labelHeight = labelWidth / 4;

  useEffect(() => () => moduleTexture?.dispose(), [moduleTexture]);

  const enter = contextSafe(() => {
    if (!groupRef.current) return;
    gsap.to(groupRef.current.position, { z: baseZ + 0.5, y: module.position[1] + 0.06, duration: 0.34, ease: "power3.out", overwrite: "auto" });
    gsap.to(groupRef.current.rotation, { y: 0, duration: 0.34, ease: "power3.out", overwrite: "auto" });
  });

  const leave = contextSafe(() => {
    if (!groupRef.current) return;
    gsap.to(groupRef.current.position, { z: baseZ, y: module.position[1], duration: 0.54, ease: "elastic.out(1, 0.7)", overwrite: "auto" });
    gsap.to(groupRef.current.rotation, { y: index % 2 === 0 ? -0.025 : 0.025, duration: 0.54, ease: "elastic.out(1, 0.7)", overwrite: "auto" });
  });

  return (
    <group
      ref={groupRef}
      name={`module-${module.id}`}
      position={module.position}
      rotation={[0, index % 2 === 0 ? -0.025 : 0.025, 0]}
      onPointerOver={(event) => { event.stopPropagation(); document.body.style.cursor = "pointer"; enter?.(); }}
      onPointerOut={() => { document.body.style.cursor = "default"; leave?.(); }}
    >
      <RoundedBox args={[module.width, module.height, module.depth]} radius={0.09} smoothness={4} castShadow receiveShadow onClick={() => onSelect(module.id)}>
        <meshPhysicalMaterial color={module.color} roughness={0.3} metalness={0.34} clearcoat={0.65} clearcoatRoughness={0.22} />
      </RoundedBox>

      <mesh position={[0, 0, module.depth / 2 + 0.045]} castShadow onClick={() => onSelect(module.id)}>
        <planeGeometry args={[labelWidth, labelHeight]} />
        {moduleTexture ? <meshStandardMaterial map={moduleTexture} roughness={0.42} metalness={0.18} /> : <meshStandardMaterial color={module.panel} roughness={0.42} />}
      </mesh>

      <mesh position={[0, -module.height / 2 - 0.03, module.depth / 2 - 0.01]} castShadow>
        <boxGeometry args={[module.width * 0.92, 0.055, 0.1]} />
        <meshStandardMaterial color="#121b1a" metalness={0.75} roughness={0.36} />
      </mesh>
    </group>
  );
}

function CameraSetup() {
  const { camera, size } = useThree();
  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;
    if (size.width < 640) {
      camera.position.set(0, 0.85, 13.2);
      camera.fov = 48;
    } else {
      camera.position.set(0, 1.15, 10.6);
      camera.fov = 39;
    }
    camera.lookAt(0, 0.35, 0);
    camera.updateProjectionMatrix();
  }, [camera, size.width]);
  return null;
}

const SHEEP_GROUND_Y = -2.22;
const SHEEP_BOUNDS = { minX: -14, maxX: 14, minZ: -9, maxZ: 7.5 };
const MONUMENT_CLEAR_RADIUS = 3.35;
const SHEEP_SPAWN_CLEAR_RADIUS = 3.8;

type SheepConfig = {
  start: [number, number];
  scale: number;
  speed: number;
  walkPhase: number;
  walkFrequency: number;
};

function randomGrassPoint() {
  for (let attempt = 0; attempt < 64; attempt += 1) {
    const x = SHEEP_BOUNDS.minX + Math.random() * (SHEEP_BOUNDS.maxX - SHEEP_BOUNDS.minX);
    const z = SHEEP_BOUNDS.minZ + Math.random() * (SHEEP_BOUNDS.maxZ - SHEEP_BOUNDS.minZ);
    if (x * x + z * z > SHEEP_SPAWN_CLEAR_RADIUS * SHEEP_SPAWN_CLEAR_RADIUS) return [x, z] as const;
  }
  return [SHEEP_BOUNDS.maxX * 0.8, SHEEP_BOUNDS.maxZ * 0.72] as const;
}

function randomWanderTarget(fromX: number, fromZ: number) {
  for (let attempt = 0; attempt < 64; attempt += 1) {
    const [x, z] = randomGrassPoint();
    const dx = Math.abs(x - fromX);
    const dz = Math.abs(z - fromZ);
    if (dx > 1.8 && dx > dz * 1.55) return [x, z] as const;
  }
  return randomGrassPoint();
}

function createFlock(count: number): SheepConfig[] {
  const starts: Array<[number, number]> = [];

  for (let index = 0; index < count; index += 1) {
    let start = randomGrassPoint();
    for (let attempt = 0; attempt < 24; attempt += 1) {
      const spaced = starts.every(([x, z]) => Math.hypot(start[0] - x, start[1] - z) > 4);
      if (spaced) break;
      start = randomGrassPoint();
    }
    starts.push([start[0], start[1]]);
  }

  const gaitBase = 0.8 + Math.random() * 0.06;
  const gaitSpacing = 0.15 + Math.random() * 0.04;

  return starts.map((start, index) => ({
    start,
    scale: 0.46 + Math.random() * 0.1,
    speed: 0.13 + Math.random() * 0.1,
    walkPhase: Math.random() * Math.PI * 2,
    walkFrequency: gaitBase + index * gaitSpacing + (Math.random() - 0.5) * 0.04,
  }));
}

function SheepWanderer({ config }: { config: SheepConfig }) {
  const groupRef = useRef<THREE.Group>(null);
  const [walking, setWalking] = useState(true);
  const [grazing, setGrazing] = useState(false);
  const state = useRef({
    position: new THREE.Vector2(config.start[0], config.start[1]),
    target: new THREE.Vector2(...randomWanderTarget(config.start[0], config.start[1])),
    paused: false,
    pauseRemaining: 0,
    walkTime: 0,
    nextPauseTime: 1.8 + Math.random() * 2.8,
    facing: Math.random() * Math.PI * 2,
  });

  useFrame(({ clock }, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const dt = Math.min(delta, 0.05);
    const motion = state.current;
    const distanceToTarget = motion.position.distanceTo(motion.target);

    if (motion.paused) {
      motion.pauseRemaining -= dt;
      if (motion.pauseRemaining <= 0) {
        motion.paused = false;
        motion.walkTime = 0;
        motion.nextPauseTime = 1.6 + Math.random() * 2.8;
        motion.target.set(...randomWanderTarget(motion.position.x, motion.position.y));
        setGrazing(false);
        setWalking(true);
      }
      return;
    }

    if (distanceToTarget < 0.12) {
      const shouldGraze = Math.random() < 0.45;
      motion.paused = true;
      motion.walkTime = 0;
      motion.nextPauseTime = 1.6 + Math.random() * 2.8;
      motion.pauseRemaining = shouldGraze ? 3.2 + Math.random() * 3 : 1.2 + Math.random() * 1.4;
      setWalking(false);
      setGrazing(shouldGraze);
      return;
    }

    motion.walkTime += dt;
    if (motion.walkTime >= motion.nextPauseTime) {
      motion.walkTime = 0;
      motion.nextPauseTime = 1.6 + Math.random() * 2.8;

      if (Math.random() < 0.45) {
        const shouldGraze = Math.random() < 0.45;
        motion.paused = true;
        motion.pauseRemaining = shouldGraze ? 3.2 + Math.random() * 3 : 1.2 + Math.random() * 1.4;
        setWalking(false);
        setGrazing(shouldGraze);
        return;
      }
    }

    const dx = motion.target.x - motion.position.x;
    const dz = motion.target.y - motion.position.y;
    const distance = Math.max(0.0001, Math.hypot(dx, dz));
    const step = config.speed * dt;
    const meander = Math.sin(clock.elapsedTime * 0.22 + config.walkPhase) * 0.16;
    const desiredFacing = Math.atan2(dx, dz) + meander;
    const turn = Math.atan2(Math.sin(desiredFacing - motion.facing), Math.cos(desiredFacing - motion.facing));
    motion.facing += turn * Math.min(1, dt * 4.5);

    const nextX = motion.position.x + Math.sin(motion.facing) * step;
    const nextZ = motion.position.y + Math.cos(motion.facing) * step;

    const collisionRadius = MONUMENT_CLEAR_RADIUS + config.scale * 0.65;
    if (nextX * nextX + nextZ * nextZ < collisionRadius * collisionRadius) {
      const fromCenter = Math.max(0.001, Math.hypot(motion.position.x, motion.position.y));
      const awayX = motion.position.x / fromCenter;
      const awayZ = motion.position.y / fromCenter;
      const retreat = 2.8 + Math.random() * 2.2;
      motion.target.set(
        THREE.MathUtils.clamp(motion.position.x + awayX * retreat, SHEEP_BOUNDS.minX, SHEEP_BOUNDS.maxX),
        THREE.MathUtils.clamp(motion.position.y + awayZ * retreat, SHEEP_BOUNDS.minZ, SHEEP_BOUNDS.maxZ)
      );
      return;
    }

    motion.position.set(nextX, nextZ);
    group.position.set(motion.position.x, SHEEP_GROUND_Y, motion.position.y);
    group.rotation.y = motion.facing;
  });

  return (
    <group
      ref={groupRef}
      position={[config.start[0], SHEEP_GROUND_Y, config.start[1]]}
      rotation={[0, state.current.facing, 0]}
    >
      <SheepModel
        scale={config.scale}
        walking={walking}
        walkPhase={config.walkPhase}
        walkFrequency={config.walkFrequency}
        grazing={grazing}
      />
    </group>
  );
}

function SheepFlock() {
  const flock = useMemo(() => createFlock(2 + Math.floor(Math.random() * 3)), []);

  useEffect(() => {
    document.documentElement.dataset.sheepCount = String(flock.length);
    document.documentElement.dataset.sheepStarts = flock.map((sheep) => sheep.start.join(",")).join(";");
    document.documentElement.dataset.sheepGait = flock.map((sheep) => sheep.walkFrequency.toFixed(2)).join(",");
    return () => {
      delete document.documentElement.dataset.sheepCount;
      delete document.documentElement.dataset.sheepStarts;
      delete document.documentElement.dataset.sheepGait;
    };
  }, [flock]);

  return (
    <>
      {flock.map((config, index) => (
        <SheepWanderer key={index} config={config} />
      ))}
    </>
  );
}

function SceneEnvironment() {
  const groundTexture = useMemo(() => createGroundTexture(), []);

  useEffect(() => () => groundTexture?.dispose(), [groundTexture]);

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.22, 0]} receiveShadow>
        <planeGeometry args={[34, 26]} />
        {groundTexture ? <meshStandardMaterial map={groundTexture} roughness={0.96} metalness={0} /> : <meshStandardMaterial color="#7fa35d" roughness={1} />}
      </mesh>

      <GrassField />
      <SheepFlock />
      <CloudPuff position={[-6, 5.1, -7]} scale={1.35} />
      <CloudPuff position={[5.8, 4.4, -8]} scale={1.05} />

      <Environment resolution={64}>
        <Lightformer form="rect" intensity={2.2} color="#fff3dc" position={[0, 5, 5]} scale={[8, 4, 1]} />
        <Lightformer form="ring" intensity={1.2} color="#8fc8ea" position={[-5, 2, 2]} scale={4} />
      </Environment>
    </>
  );
}

function SceneContent({ onSelect }: { onSelect: (id: SectionId) => void }) {
  const { t } = useLanguage();
  const rootRef = useRef<THREE.Group>(null);
  const crownRef = useRef<THREE.Group>(null);
  const modules = useMemo(
    () => MODULES.map((module) => ({ ...module, label: t(module.label), detail: t(module.detail) })),
    [t]
  );
  const crownTexture = useMemo(() => createCrownTexture(t("PORTFOLIO")), [t]);
  const { gl } = useThree();

  useEffect(() => () => crownTexture?.dispose(), [crownTexture]);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const modules = root.children.filter((child) => child.name.startsWith("module-"));
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (crownRef.current) timeline.from(crownRef.current.position, { y: 0.35, duration: 0.7 }, 0.1);
      modules.forEach((module, index) => {
        const nextModule = module as THREE.Group;
        const baseY = nextModule.position.y;
        timeline.fromTo(nextModule.position, { y: baseY - 0.3, z: -0.4 }, { y: baseY, z: MODULES[index].position[2], duration: 0.74 }, 0.32 + index * 0.09);
        timeline.fromTo(nextModule.scale, { x: 0.8, y: 0.8, z: 0.8 }, { x: 1, y: 1, z: 1, duration: 0.74 }, 0.32 + index * 0.09);
      });

      const rotateY = gsap.quickTo(root.rotation, "y", { duration: 0.85, ease: "power3" });
      const rotateX = gsap.quickTo(root.rotation, "x", { duration: 0.85, ease: "power3" });
      const onPointerMove = (event: PointerEvent) => {
        const rect = gl.domElement.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        rotateY(x * 0.17);
        rotateX(-y * 0.08);
      };
      const onPointerLeave = () => { rotateY(0); rotateX(0); };
      gl.domElement.addEventListener("pointermove", onPointerMove);
      gl.domElement.addEventListener("pointerleave", onPointerLeave);
      return () => {
        gl.domElement.removeEventListener("pointermove", onPointerMove);
        gl.domElement.removeEventListener("pointerleave", onPointerLeave);
      };
    },
    { scope: rootRef }
  );

  return (
    <group ref={rootRef} position={[0, 0.2, 0]}>
      <RoundedBox args={[0.78, 4.7, 0.58]} radius={0.1} smoothness={4} position={[0, 0.25, -0.42]} castShadow receiveShadow>
        <meshPhysicalMaterial color="#1a2924" metalness={0.7} roughness={0.4} clearcoat={0.2} />
      </RoundedBox>

      <mesh position={[-1.72, 0.38, -0.14]} castShadow receiveShadow>
        <boxGeometry args={[0.09, 4.35, 0.14]} />
        <meshStandardMaterial color="#2b3b34" metalness={0.76} roughness={0.36} />
      </mesh>
      <mesh position={[1.72, 0.38, -0.14]} castShadow receiveShadow>
        <boxGeometry args={[0.09, 4.35, 0.14]} />
        <meshStandardMaterial color="#2b3b34" metalness={0.76} roughness={0.36} />
      </mesh>

      <RoundedBox args={[5.2, 0.18, 1.82]} radius={0.05} smoothness={3} position={[0, -1.82, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#1d2924" metalness={0.58} roughness={0.5} />
      </RoundedBox>

      <group ref={crownRef} position={[0, 2.75, 0.12]}>
        <RoundedBox args={[2.55, 0.68, 0.74]} radius={0.08} smoothness={4} castShadow receiveShadow>
          <meshPhysicalMaterial color="#f7f1e6" roughness={0.3} metalness={0.25} clearcoat={0.55} />
        </RoundedBox>
        <mesh position={[0, 0.42, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.05, 0.55, 16]} />
          <meshStandardMaterial color="#1a2421" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.74, 0]} castShadow>
          <sphereGeometry args={[0.11, 20, 14]} />
          <meshPhysicalMaterial color="#ff5b4d" emissive="#ff2f25" emissiveIntensity={1.4} roughness={0.24} clearcoat={0.7} />
        </mesh>
        <mesh position={[0, 0, 0.381]}>
          <planeGeometry args={[2.26, 0.565]} />
          {crownTexture ? <meshStandardMaterial map={crownTexture} roughness={0.38} metalness={0.12} /> : <meshStandardMaterial color="#f7f1e6" roughness={0.4} />}
        </mesh>
      </group>

      {modules.map((module, index) => <MonumentBlock key={module.id} module={module} index={index} onSelect={onSelect} />)}

      <mesh position={[0, -2.03, 0.02]} castShadow receiveShadow>
        <cylinderGeometry args={[2.35, 2.75, 0.32, 48]} />
        <meshStandardMaterial color="#2a382e" roughness={0.52} metalness={0.55} />
      </mesh>

      <ContactShadows position={[0, -2.2, 0]} opacity={0.44} scale={14} blur={2.5} far={5.6} color="#1e3327" />
    </group>
  );
}

export function MonumentScene({
  onSelect,
  showMonument = true,
  onReady,
}: {
  onSelect: (id: SectionId) => void;
  showMonument?: boolean;
  onReady?: () => void;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0, 1.15, 10.6], fov: 39 }}
      gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
      className={styles.canvas}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      onCreated={({ gl, scene, camera }) => {
        if (!onReady) return;

        let frames = 0;
        const waitForFullSize = () => {
          const canvas = gl.domElement;
          const rect = canvas.getBoundingClientRect();
          const hasFullSize =
            canvas.width >= Math.max(1, rect.width) &&
            canvas.height >= Math.max(1, rect.height);

          if (!hasFullSize && frames < 30) {
            frames += 1;
            requestAnimationFrame(waitForFullSize);
            return;
          }

          gl.render(scene, camera);
          requestAnimationFrame(onReady);
        };

        requestAnimationFrame(waitForFullSize);
      }}
    >
      <color attach="background" args={["#cfe8f2"]} />
      <fog attach="fog" args={["#d7e9e1", 14, 30]} />
      <ambientLight intensity={1.12} />
      <hemisphereLight args={["#eaf7ff", "#78935f", 1.8]} />
      <directionalLight position={[5, 8, 5]} intensity={2.5} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <Sky distance={450000} sunPosition={[5, 4, -5]} inclination={0.48} azimuth={0.22} />
      <CameraSetup />
      <SceneEnvironment />
      {showMonument ? <SceneContent onSelect={onSelect} /> : null}
      <EffectComposer>
        <Bloom intensity={0.22} luminanceThreshold={0.88} mipmapBlur />
        <Vignette eskil={false} offset={0.18} darkness={0.26} />
        <Noise opacity={0.018} />
      </EffectComposer>
    </Canvas>
  );
}







