import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Float, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Custom Shader for the VFX Tornado based on the provided source
const TornadoMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color('#FF8B4D'),
    uTimeScale: 0.2,
    uParabolStrength: 1.0,
    uParabolOffset: 0.3,
    uParabolAmplitude: 0.2,
    uOpacity: 1.0,
  },
  // Vertex Shader
  `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uParabolStrength;
  uniform float uParabolOffset;
  uniform float uParabolAmplitude;
  uniform float uTimeScale;

  void main() {
    vUv = uv;
    vec3 pos = position;

    float angle = atan(pos.z, pos.x);
    float elevation = pos.y;
    float time = uTime * uTimeScale;
    
    // Parabol shape matching the source
    float radius = pow(uParabolStrength * (pos.y - uParabolOffset), 2.0) + uParabolAmplitude;
    
    // Turbulences
    radius += sin(elevation * 20.0 - time * 20.0 + angle * 2.0) * 0.05;

    vec3 twistedPos = vec3(
      cos(angle) * radius,
      elevation,
      sin(angle) * radius
    );

    gl_Position = projectionMatrix * modelViewMatrix * vec4(twistedPos, 1.0);
  }
  `,
  // Fragment Shader
  `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uTimeScale;
  uniform float uOpacity;

  void main() {
    float time = uTime * uTimeScale;
    
    // Simple noise-like pattern for the vortex effect
    float noise1 = sin(vUv.x * 10.0 + vUv.y * 5.0 + time * 10.0);
    float noise2 = cos(vUv.x * 20.0 - vUv.y * 10.0 - time * 5.0);
    float effect = (noise1 * 0.5 + 0.5) * (noise2 * 0.5 + 0.5);
    
    // Outer fade matching original source logic
    float outerFade = smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.6, vUv.y);
    
    float finalAlpha = smoothstep(0.0, 0.1, effect * outerFade) * uOpacity;
    
    gl_FragColor = vec4(uColor * 2.0, finalAlpha);
  }
  `
)

extend({ TornadoMaterial });

function VFXTornado({ scroll }: { scroll: any }) {
  const meshRef = useRef<any>(null);
  const groupRef = useRef<THREE.Group>(null);
  const isMobile = useMemo(() => typeof window !== 'undefined' && window.innerWidth < 1024, []);
  
  // Optimized geometry segments: 64 on desktop, 32 on mobile
  const segments = isMobile ? 32 : 64;
  const cylinderGeo = useMemo(() => new THREE.CylinderGeometry(1, 1, 1, segments, segments, true), [segments]);
  
  // Pre-calculate colors and values to avoid GC pressure
  const fireColor = useMemo(() => new THREE.Color('#FF8B4D'), []);
  const darkColor = useMemo(() => new THREE.Color('#201919'), []);

  // Pre-generate particle positions or use a fixed array
  const particlesCount = isMobile ? 250 : 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [particlesCount]);
  
  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;
    
    meshRef.current.uTime = state.clock.getElapsedTime();
    
    // Smooth scroll based behavior
    const scrollVal = scroll.get();
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, scrollVal * Math.PI * 4, 0.05);
    
    // Positioning
    const targetX = isMobile ? 0 : 1.5;
    const targetY = isMobile ? -0.5 : -1.5;
    const mouseX = state.mouse.x * (isMobile ? 0.2 : 0.5);
    const mouseY = state.mouse.y * (isMobile ? 0.1 : 0.2);

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX + mouseX, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY + mouseY, 0.05);
  });

  return (
    <group ref={groupRef} scale={isMobile ? 2.5 : 3.5}>
      {/* Main Emissive Tornado */}
      <mesh ref={meshRef} geometry={cylinderGeo}>
        {/* @ts-ignore */}
        <tornadoMaterial transparent side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} uColor={fireColor} />
      </mesh>

      {/* Dark Outer Shell for depth */}
      <mesh position={[0, 0, 0]} geometry={cylinderGeo}>
        {/* @ts-ignore */}
        <tornadoMaterial transparent side={THREE.DoubleSide} uColor={darkColor} uOpacity={0.5} uParabolAmplitude={0.22} />
      </mesh>

      {/* Particles around the tornado */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={isMobile ? 0.03 : 0.05} color="#FF8B4D" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  );
}

export default function RobotScene({ scroll }: { scroll: any }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  return (
    <div className="fixed inset-0 z-1 pointer-events-none bg-[#201919]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 35 }}
        gl={{ 
          antialias: !isMobile, // Disable antialiasing on mobile for performance boost
          alpha: true, 
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        dpr={isMobile ? 1 : [1, 2]} // Cap DPR to 1 on mobile
        style={{ pointerEvents: 'none' }}
      >
        <color attach="background" args={['#201919']} />
        <fog attach="fog" args={['#201919', 5, 20]} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={5} color="#FF8B4D" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#FFD700" />
        
        <Suspense fallback={null}>
            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
                <VFXTornado scroll={scroll} />
            </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
