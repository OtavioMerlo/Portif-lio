import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function HoloSphereInner() {
  const meshRef = useRef<THREE.Mesh>(null)
  const wireRef = useRef<THREE.Mesh>(null)
  const ringsRef = useRef<THREE.Group>(null)

  useFrame(({ clock }: any) => {
    const t = clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.2
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.25
      wireRef.current.rotation.z = t * 0.05
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.y = t * 0.3
      ringsRef.current.rotation.x = Math.cos(t * 0.08) * 0.3
    }
  })

  return (
    <group>
      {/* Core sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshStandardMaterial
          color="#6fffb0"
          transparent
          opacity={0.05}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe */}
      <mesh ref={wireRef}>
        <sphereGeometry args={[1.65, 18, 18]} />
        <meshBasicMaterial
          color="#6fffb0"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Orbit rings */}
      <group ref={ringsRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.2, 0.01, 8, 80]} />
          <meshBasicMaterial color="#6ee7ff" transparent opacity={0.3} />
        </mesh>
        <mesh rotation={[Math.PI / 3, 0.5, 0]}>
          <torusGeometry args={[2.6, 0.008, 8, 80]} />
          <meshBasicMaterial color="#6fffb0" transparent opacity={0.2} />
        </mesh>
        <mesh rotation={[Math.PI / 6, 1, 0]}>
          <torusGeometry args={[3.0, 0.006, 8, 80]} />
          <meshBasicMaterial color="#6ee7ff" transparent opacity={0.15} />
        </mesh>
      </group>

      {/* Point light */}
      <pointLight color="#6fffb0" intensity={3} distance={8} />
      <ambientLight intensity={0.3} />
    </group>
  )
}

export default function HolographicSphere() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <HoloSphereInner />
      </Canvas>
    </div>
  )
}
