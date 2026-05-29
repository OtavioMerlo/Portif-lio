import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface ParticleNode {
  position: THREE.Vector3
  velocity: THREE.Vector3
  originalPosition: THREE.Vector3
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
    camera.position.z = 80

    const NODE_COUNT = 120
    const nodes: ParticleNode[] = []
    const mouse = new THREE.Vector2(0, 0)

    // Create nodes
    for (let i = 0; i < NODE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 160
      const y = (Math.random() - 0.5) * 100
      const z = (Math.random() - 0.5) * 60
      const pos = new THREE.Vector3(x, y, z)
      nodes.push({
        position: pos.clone(),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.01
        ),
        originalPosition: pos.clone()
      })
    }

    // Sphere geometry for nodes
    const sphereGeo = new THREE.SphereGeometry(0.3, 6, 6)
    const sphereMat = new THREE.MeshBasicMaterial({ color: 0x6fffb0, transparent: true, opacity: 0.7 })
    const meshes = nodes.map(() => {
      const m = new THREE.Mesh(sphereGeo, sphereMat.clone())
      scene.add(m)
      return m
    })

    // Lines
    const MAX_CONNECTIONS = 400
    const linePositions = new Float32Array(MAX_CONNECTIONS * 6)
    const lineColors = new Float32Array(MAX_CONNECTIONS * 6)
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3))
    const lineMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.4 })
    const lineSegments = new THREE.LineSegments(lineGeo, lineMat)
    scene.add(lineSegments)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouse.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove)

    const handleResize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', handleResize)

    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Update node positions
      nodes.forEach((node, i) => {
        node.position.add(node.velocity)

        // Bounce boundaries
        if (Math.abs(node.position.x) > 85) node.velocity.x *= -1
        if (Math.abs(node.position.y) > 55) node.velocity.y *= -1
        if (Math.abs(node.position.z) > 35) node.velocity.z *= -1

        // Gentle floating
        const offset = Math.sin(t * 0.3 + i * 0.5) * 0.1
        node.position.y += offset * 0.01

        // Mouse repulsion
        const mouseWorld = new THREE.Vector3(mouse.x * 80, mouse.y * 50, 0)
        const dist = node.position.distanceTo(mouseWorld)
        if (dist < 25) {
          const force = mouseWorld.clone().sub(node.position).normalize().multiplyScalar(-0.05)
          node.position.add(force)
        }

        meshes[i].position.copy(node.position)
        const m = meshes[i].material as THREE.MeshBasicMaterial
        m.opacity = 0.4 + Math.sin(t * 0.5 + i) * 0.2
      })

      // Update connections
      let connectionCount = 0
      const THRESHOLD = 28

      for (let i = 0; i < nodes.length && connectionCount < MAX_CONNECTIONS; i++) {
        for (let j = i + 1; j < nodes.length && connectionCount < MAX_CONNECTIONS; j++) {
          const dist = nodes[i].position.distanceTo(nodes[j].position)
          if (dist < THRESHOLD) {
            const alpha = (1 - dist / THRESHOLD) * 0.6
            const idx = connectionCount * 6
            linePositions[idx] = nodes[i].position.x
            linePositions[idx + 1] = nodes[i].position.y
            linePositions[idx + 2] = nodes[i].position.z
            linePositions[idx + 3] = nodes[j].position.x
            linePositions[idx + 4] = nodes[j].position.y
            linePositions[idx + 5] = nodes[j].position.z

            // Color: green to cyan gradient
            lineColors[idx] = 0.43 * alpha
            lineColors[idx + 1] = alpha
            lineColors[idx + 2] = 0.69 * alpha
            lineColors[idx + 3] = 0.43 * alpha
            lineColors[idx + 4] = alpha
            lineColors[idx + 5] = 0.69 * alpha

            connectionCount++
          }
        }
      }

      lineGeo.setDrawRange(0, connectionCount * 2)
      lineGeo.attributes.position.needsUpdate = true
      lineGeo.attributes.color.needsUpdate = true

      // Gentle camera drift
      camera.position.x = Math.sin(t * 0.05) * 5
      camera.position.y = Math.cos(t * 0.04) * 3
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  )
}
