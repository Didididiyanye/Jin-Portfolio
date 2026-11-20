"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { SheepModel } from "@/components/home/SheepModel";
import styles from "./sheep-preview.module.css";

export default function SheepPreviewPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Character study / 01</p>
          <h1 className={styles.title}>Sheep form</h1>
        </div>
        <p className={styles.note}>Low-poly wool mass, dark face and articulated legs for later walking motion.</p>
      </header>

      <section className={styles.stage} aria-label="Interactive 3D sheep model preview">
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [3.7, 2.35, 5.1], fov: 34 }}
          gl={{ antialias: true, alpha: true }}
        >
          <color attach="background" args={["#e8e4da"]} />
          <fog attach="fog" args={["#e8e4da", 8, 15]} />
          <ambientLight intensity={0.85} />
          <hemisphereLight args={["#fffaf0", "#9aa68f", 1.45]} />
          <directionalLight
            position={[4.5, 7, 5]}
            intensity={2.7}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-left={-5}
            shadow-camera-right={5}
            shadow-camera-top={5}
            shadow-camera-bottom={-5}
          />
          <directionalLight position={[-4, 3, -3]} intensity={0.75} color="#c6d5cb" />

          <group position={[0, 0, 0]} rotation={[0, -0.4, 0]}>
            <SheepModel scale={0.82} />
          </group>

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]} receiveShadow>
            <circleGeometry args={[3.7, 72]} />
            <meshStandardMaterial color="#ded9ce" roughness={1} />
          </mesh>

          <ContactShadows position={[0, 0.005, 0]} opacity={0.34} scale={8} blur={2.6} far={4.2} color="#58625a" />
          <OrbitControls
            makeDefault
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.55}
            minDistance={4.2}
            maxDistance={7.5}
            minPolarAngle={Math.PI / 3.2}
            maxPolarAngle={Math.PI / 2.02}
            target={[0, 0.9, 0]}
          />
        </Canvas>

        <div className={styles.stageLabel}>
          <span>Drag to inspect</span>
          <span>3D model only / no grass</span>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>Wool / warm ivory</span>
        <span>Face and legs / charcoal green</span>
        <span>Motion-ready / four leg pivots</span>
      </footer>
    </main>
  );
}
