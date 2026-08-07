import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const FloatingCrystal: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerWireRef = useRef<THREE.Mesh>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state, delta) => {
    const scrollFactor = scrollYRef.current * 0.0025;

    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, scrollFactor + state.clock.elapsedTime * 0.3, 0.08);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, scrollFactor * 1.5 + state.clock.elapsedTime * 0.4, 0.08);
    }
    if (outerWireRef.current) {
      outerWireRef.current.rotation.x = THREE.MathUtils.lerp(outerWireRef.current.rotation.x, -scrollFactor * 0.8 - state.clock.elapsedTime * 0.2, 0.08);
      outerWireRef.current.rotation.y = THREE.MathUtils.lerp(outerWireRef.current.rotation.y, -scrollFactor * 1.2 - state.clock.elapsedTime * 0.25, 0.08);
    }

    // Dynamic camera tilt following mouse + initial zoom-in
    const targetZ = Math.max(5, 7 + scrollYRef.current * 0.005);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.04);
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 1.5, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.mouse.y * 1.5 - scrollYRef.current * 0.003, 0.05);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
        {/* Core Animated Glass Torus Knot */}
        <mesh ref={meshRef} scale={1.8}>
          <torusKnotGeometry args={[1, 0.35, 128, 32]} />
          <MeshDistortMaterial
            color="#6CD9BA"
            emissive="#3F289D"
            emissiveIntensity={0.7}
            roughness={0.1}
            metalness={0.9}
            clearcoat={1}
            clearcoatRoughness={0.1}
            distort={0.3}
            speed={2}
          />
        </mesh>

        {/* Outer Futuristic Wireframe Shell */}
        <mesh ref={outerWireRef} scale={2.5}>
          <icosahedronGeometry args={[1, 2]} />
          <meshStandardMaterial
            color="#B775BF"
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>
      </Float>

      {/* Floating Particle Stars Field */}
      <PointsField />
    </group>
  );
};

const PointsField: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const count = 500;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 22;
    positions[i + 1] = (Math.random() - 0.5) * 22;
    positions[i + 2] = (Math.random() - 0.5) * 22;
  }

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#6CD9BA"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export const Hero3D: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none">
      <Canvas gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 11]} fov={50} />
        
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#6CD9BA" />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color="#B775BF" />
        <spotLight position={[0, 5, 5]} intensity={2} color="#ffffff" angle={0.6} penumbra={1} />

        <FloatingCrystal />
      </Canvas>
    </div>
  );
};
