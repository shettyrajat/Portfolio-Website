import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const skills = [
  { name: "Embedded\nComputing",   color: "#009688" },
  { name: "Edge AI",              color: "#7B2FBE" },
  { name: "Industrial AI",        color: "#673AB7" },
  { name: "NVIDIA Jetson",        color: "#76B900" },
  { name: "Embedded Linux",       color: "#F7C400" },
  { name: "BIOS/Firmware",        color: "#795548" },
  { name: "System\nIntegration",  color: "#00897B" },
  { name: "Python",               color: "#3776AB" },
  { name: "C / C++",              color: "#00599C" },
  { name: "RAG",                  color: "#FF6B35" },
  { name: "LLM",                  color: "#E91E8C" },
  { name: "ChromaDB",             color: "#E91E63" },
  { name: "Ollama",               color: "#444444" },
  { name: "Flask",                color: "#555555" },
  { name: "OpenVINO",             color: "#0071C5" },
  { name: "Qt",                   color: "#41CD52" },
  { name: "Technical\nPre-Sales", color: "#9C27B0" },
  { name: "RFQ Support",          color: "#E53935" },
  { name: "Solution\nConsulting", color: "#1565C0" },
  { name: "Product Demos",        color: "#F57C00" },
  { name: "PoC\nDevelopment",     color: "#2E7D32" },
  { name: "Technical\nPresentations", color: "#6A1B9A" },
  { name: "Customer\nEnablement", color: "#00838F" },
  { name: "Agile/Scrum",          color: "#1976D2" },
  { name: "Jira",                 color: "#0052CC" },
  { name: "Salesforce",           color: "#00A1E0" },
];

function makeTextTexture(name: string, textColor: string): THREE.Texture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Solid white background
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, size, size);

  // Colored text
  ctx.fillStyle = textColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const lines = name.split("\n");
  const fontSize = lines.some(l => l.length > 9) ? 50 : lines.length > 1 ? 56 : 68;
  ctx.font = `bold ${fontSize}px Arial, sans-serif`;
  const lineHeight = fontSize * 1.25;
  const startY = size / 2 - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, i) => {
    ctx.fillText(line, size / 2, startY + i * lineHeight);
  });

  return new THREE.CanvasTexture(canvas);
}

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

const spheres = [...Array(skills.length)].map(() => ({
  scale: [0.9, 1.1, 1, 1.05, 0.95][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );
    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = document
        .getElementById("work")!
        .getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const materials = useMemo(() => {
    return skills.map(({ name, color }) => {
      const texture = makeTextTexture(name, color);
      texture.needsUpdate = true;
      return new THREE.MeshPhysicalMaterial({
        map: texture,
        transparent: false,
        metalness: 0.0,
        roughness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        reflectivity: 1.0,
        iridescence: 0.5,
        iridescenceIOR: 1.5,
        iridescenceThicknessRange: [100, 400],
        sheen: 0.2,
        sheenColor: new THREE.Color("#ffccee"),
      });
    });
  }, []);

  return (
    <div className="techstack" id="techstack">
      <h2>Skills &amp; Technologies</h2>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              material={materials[i % materials.length]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
