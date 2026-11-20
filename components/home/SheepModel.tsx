"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

type SheepModelProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  walking?: boolean;
  walkPhase?: number;
  walkFrequency?: number;
  speed?: number;
  grazing?: boolean;
};

export const SHEEP_FOOT_OFFSET = 0.21;

const bodyClumps: Array<{ position: [number, number, number]; scale: [number, number, number] }> = [
  { position: [0, 1.02, 0], scale: [0.78, 0.58, 0.7] },
  { position: [-0.44, 1.08, 0.22], scale: [0.4, 0.38, 0.43] },
  { position: [0.44, 1.06, 0.18], scale: [0.41, 0.37, 0.44] },
  { position: [-0.24, 1.34, 0.04], scale: [0.35, 0.3, 0.36] },
  { position: [0.24, 1.35, -0.06], scale: [0.34, 0.29, 0.35] },
  { position: [0, 1.27, 0.43], scale: [0.37, 0.34, 0.4] },
  { position: [0, 1.06, -0.57], scale: [0.45, 0.42, 0.44] },
  { position: [-0.4, 0.8, -0.32], scale: [0.35, 0.33, 0.38] },
  { position: [0.4, 0.82, -0.27], scale: [0.36, 0.34, 0.39] },
  { position: [-0.34, 1.0, 0.46], scale: [0.32, 0.3, 0.34] },
  { position: [0.33, 1.02, 0.43], scale: [0.33, 0.3, 0.35] },
  { position: [0, 0.77, 0.27], scale: [0.36, 0.3, 0.4] },
];

const legs: Array<{ position: [number, number, number]; phase: number; stance: number }> = [
  // Four-beat lateral walk: left hind, left fore, right hind, right fore.
  { position: [-0.36, 0.52, 0.38], phase: 0.25, stance: 0.64 },
  { position: [0.36, 0.52, 0.38], phase: 0.75, stance: 0.64 },
  { position: [-0.36, 0.52, -0.38], phase: 0, stance: 0.7 },
  { position: [0.36, 0.52, -0.38], phase: 0.5, stance: 0.7 },
];

export function SheepModel({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  walking = false,
  walkPhase = 0,
  walkFrequency = 1.6,
  speed = 0.35,
  grazing = false,
}: SheepModelProps) {
  const legRefs = useRef<Array<Group | null>>([]);
  const bodyRef = useRef<Group>(null);
  const headRef = useRef<Group>(null);
  const gaitRef = useRef(walkPhase % 1);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    if (walking) gaitRef.current = (gaitRef.current + dt * walkFrequency) % 1;

    const legLengthWorld = 0.375 * scale;
    const strideLength = Math.max(0.08, speed / Math.max(0.2, walkFrequency));

    legRefs.current.forEach((leg, index) => {
      if (!leg) return;

      const legData = legs[index];
      const stanceFraction = legData.stance;
      const strideAngle = Math.min(
        0.5,
        Math.max(0.14, Math.asin(Math.min(0.9, (stanceFraction * strideLength) / (2 * legLengthWorld))))
      );
      const phase = (gaitRef.current + legData.phase) % 1;
      let targetRotation = 0;
      let targetLift = 0;

      if (walking) {
        if (phase < stanceFraction) {
          const t = phase / stanceFraction;
          targetRotation = -strideAngle + 2 * strideAngle * t;
        } else {
          const t = (phase - stanceFraction) / (1 - stanceFraction);
          const eased = t * t * (3 - 2 * t);
          targetRotation = strideAngle - 2 * strideAngle * eased;
          targetLift = Math.sin(Math.PI * t) * (index >= 2 ? 0.06 : 0.05);
        }
      }

      const baseY = legs[index].position[1];
      if (walking) {
        leg.rotation.x = targetRotation;
        leg.position.y = baseY + targetLift;
      } else {
        leg.rotation.x += (targetRotation - leg.rotation.x) * Math.min(1, dt * 12);
        leg.position.y += (baseY - leg.position.y) * Math.min(1, dt * 12);
      }
    });

    if (bodyRef.current) {
      const targetTilt = walking ? Math.sin(gaitRef.current * Math.PI * 2) * 0.012 : 0;
      bodyRef.current.rotation.z += (targetTilt - bodyRef.current.rotation.z) * Math.min(1, dt * 5);
    }

    if (headRef.current) {
      const targetRotation = grazing ? 0.62 : 0.04;
      const targetY = grazing ? 1.23 : 1.36;
      const targetZ = grazing ? 0.79 : 0.73;
      headRef.current.rotation.x += (targetRotation - headRef.current.rotation.x) * Math.min(1, dt * 4.5);
      headRef.current.position.y += (targetY - headRef.current.position.y) * Math.min(1, dt * 4.5);
      headRef.current.position.z += (targetZ - headRef.current.position.z) * Math.min(1, dt * 4.5);
    }
  });

  return (
    <group position={[position[0], position[1] - SHEEP_FOOT_OFFSET * scale, position[2]]} rotation={rotation} scale={scale}>
      <group ref={bodyRef}>
        {bodyClumps.map((clump, index) => (
          <mesh
            key={index}
            position={clump.position}
            scale={clump.scale}
            castShadow
            receiveShadow
          >
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color={index % 3 === 0 ? "#e6e1d6" : "#f2eee4"} roughness={0.96} flatShading />
          </mesh>
        ))}



        <group ref={headRef} position={[0, 1.36, 0.73]} rotation={[0.04, 0, 0]}>
          <mesh castShadow receiveShadow position={[0, -0.01, 0]} scale={[0.78, 1.08, 0.72]}>
            <sphereGeometry args={[0.4, 20, 16]} />
            <meshStandardMaterial color="#202724" roughness={0.94} flatShading />
          </mesh>

          <mesh position={[0, 0.24, -0.1]} scale={[0.47, 0.31, 0.35]} castShadow>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color="#f2eee4" roughness={0.96} flatShading />
          </mesh>
          <mesh position={[-0.28, 0.17, -0.08]} scale={[0.3, 0.25, 0.27]} castShadow>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color="#e6e1d6" roughness={0.96} flatShading />
          </mesh>
          <mesh position={[0.28, 0.17, -0.08]} scale={[0.3, 0.25, 0.27]} castShadow>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color="#e6e1d6" roughness={0.96} flatShading />
          </mesh>
          <mesh position={[0, 0.21, 0.16]} scale={[0.23, 0.16, 0.19]} castShadow>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color="#f2eee4" roughness={0.96} flatShading />
          </mesh>

          <mesh position={[-0.37, 0.015, 0.005]} rotation={[0, -0.2, -0.24]} scale={[0.27, 0.078, 0.11]} castShadow>
            <sphereGeometry args={[1, 18, 12]} />
            <meshStandardMaterial color="#37413d" roughness={0.94} />
          </mesh>
          <mesh position={[0.37, 0.015, 0.005]} rotation={[0, 0.2, 0.24]} scale={[0.27, 0.078, 0.11]} castShadow>
            <sphereGeometry args={[1, 18, 12]} />
            <meshStandardMaterial color="#37413d" roughness={0.94} />
          </mesh>
          <mesh position={[-0.37, 0.012, 0.075]} rotation={[0, -0.2, -0.24]} scale={[0.17, 0.038, 0.045]}>
            <sphereGeometry args={[1, 16, 10]} />
            <meshStandardMaterial color="#75675a" roughness={1} />
          </mesh>
          <mesh position={[0.37, 0.012, 0.075]} rotation={[0, 0.2, 0.24]} scale={[0.17, 0.038, 0.045]}>
            <sphereGeometry args={[1, 16, 10]} />
            <meshStandardMaterial color="#75675a" roughness={1} />
          </mesh>


        </group>
        <group position={[0, 1.12, -0.66]} scale={[0.24, 0.24, 0.28]} castShadow>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color="#f2eee4" roughness={0.96} flatShading />
        </group>

        {legs.map((leg, index) => (
          <group
            key={index}
            ref={(node) => { legRefs.current[index] = node; }}
            position={leg.position}
          >
            <mesh position={[0, -0.11, 0]} castShadow>
              <cylinderGeometry args={[0.05, 0.057, 0.4, 7]} />
              <meshStandardMaterial color="#1f2421" roughness={0.92} flatShading />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
