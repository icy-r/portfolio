"use client";

import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({
  position,
  geometry,
  color,
  speed = 1,
  distort = 0.3,
  scale = 1,
}: {
  position: [number, number, number];
  geometry: "torus" | "icosahedron" | "octahedron" | "torusKnot";
  color: string;
  speed?: number;
  distort?: number;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15 * speed;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
  });

  const geo = useMemo(() => {
    switch (geometry) {
      case "torus":
        return <torusGeometry args={[1, 0.4, 32, 64]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[1, 1]} />;
      case "octahedron":
        return <octahedronGeometry args={[1, 0]} />;
      case "torusKnot":
        return <torusKnotGeometry args={[0.8, 0.3, 128, 32]} />;
    }
  }, [geometry]);

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geo}
        <MeshDistortMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          distort={distort}
          speed={2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

function GlassSphere({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.5}
          chromaticAberration={0.3}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color="#a78bfa"
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
}

function generateParticles(count: number): [Float32Array, Float32Array] {
  const pos = new Float32Array(count * 3);
  const siz = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 30;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    siz[i] = Math.random() * 2 + 0.5;
  }
  return [pos, siz];
}

function Particles({ count = 800 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const [data] = useState(() => generateParticles(count));
  const [positions, sizes] = data;

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.015;
    points.current.rotation.x = state.clock.elapsedTime * 0.008;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#a78bfa"
        sizeAttenuation
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function MouseTracker() {
  const meshRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const x = (state.pointer.x * viewport.width) / 2;
    const y = (state.pointer.y * viewport.height) / 2;

    // Main shape follows mouse
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x, 0.08);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y, 0.08);
    meshRef.current.rotation.x += 0.015;
    meshRef.current.rotation.z += 0.01;

    // Trail follows slower
    if (trailRef.current) {
      trailRef.current.position.x = THREE.MathUtils.lerp(trailRef.current.position.x, x, 0.03);
      trailRef.current.position.y = THREE.MathUtils.lerp(trailRef.current.position.y, y, 0.03);
      trailRef.current.rotation.y += 0.008;
    }
  });

  return (
    <>
      {/* Main mouse-following shape */}
      <mesh ref={meshRef} scale={0.35}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#c4b5fd"
          emissive="#7c3aed"
          emissiveIntensity={0.5}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Trail shape - slower, larger, more transparent */}
      <mesh ref={trailRef} scale={0.6}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#6d28d9"
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </>
  );
}

/** Camera that subtly responds to scroll position */
function ScrollCamera() {
  const cameraRef = useRef({ scrollY: 0 });

  const handleScroll = useCallback(() => {
    cameraRef.current.scrollY = window.scrollY;
  }, []);

  useFrame((state) => {
    // Subtle camera movement based on scroll
    const scrollProgress = cameraRef.current.scrollY / (document.body.scrollHeight - window.innerHeight);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, -scrollProgress * 3, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 8 + scrollProgress * 2, 0.05);
    state.camera.lookAt(0, -scrollProgress * 1.5, 0);
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return null;
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 w-full h-full" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 10, 30]} />

        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} color="#a78bfa" />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#818cf8" />
        <pointLight position={[0, 5, 0]} intensity={0.2} color="#c4b5fd" />

        {/* Floating shapes spread across a larger area */}
        <FloatingShape position={[-4, 2, -3]} geometry="torus" color="#7c3aed" speed={0.5} scale={0.7} distort={0.2} />
        <FloatingShape position={[4.5, -1.5, -4]} geometry="icosahedron" color="#818cf8" speed={0.7} scale={0.6} distort={0.3} />
        <FloatingShape position={[-3, -2.5, -2]} geometry="octahedron" color="#a78bfa" speed={0.4} scale={0.5} distort={0.15} />
        <FloatingShape position={[3, 3, -5]} geometry="torusKnot" color="#6d28d9" speed={0.3} scale={0.4} distort={0.25} />
        {/* Extra shapes for depth when scrolled */}
        <FloatingShape position={[-5, -5, -6]} geometry="torus" color="#7c3aed" speed={0.2} scale={0.5} distort={0.2} />
        <FloatingShape position={[5, -6, -5]} geometry="icosahedron" color="#818cf8" speed={0.35} scale={0.4} distort={0.2} />
        <FloatingShape position={[0, -8, -4]} geometry="torusKnot" color="#a78bfa" speed={0.25} scale={0.35} distort={0.15} />

        {/* Glass sphere */}
        <GlassSphere position={[2, 0.5, -1.5]} scale={0.8} />

        {/* Particles - larger spread */}
        <Particles count={800} />

        {/* Mouse tracker - 3D shapes that follow mouse */}
        <MouseTracker />

        {/* Camera responds to scroll */}
        <ScrollCamera />

        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
