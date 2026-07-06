"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { audioReactive } from "@/lib/audio";

/**
 * Individual geometric element.
 * Idles with a slow spin, swells when the pointer passes near it, and pulses with
 * the beat (scale from bass, emissive glow from treble) when audio is active.
 */
function GeometricElement({
    position,
    color,
    wireframe,
    initialScale = 1,
}: {
    position: [number, number, number];
    color: string;
    wireframe?: boolean;
    initialScale?: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    // Random, stable rotation speed per element (computed once, off the render path).
    const [rotationSpeed] = useState(() => [
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
    ]);

    // Reusable vectors — allocated once, mutated every frame to avoid GC churn.
    const worldPos = useMemo(() => new THREE.Vector3(), []);
    const scaleTarget = useMemo(() => new THREE.Vector3(), []);

    useFrame((state) => {
        const mesh = meshRef.current;
        if (!mesh) return;

        // Base rotation (+ mid-band nudge on the beat).
        mesh.rotation.x += rotationSpeed[0];
        mesh.rotation.y += rotationSpeed[1];
        mesh.rotation.z += rotationSpeed[2] + audioReactive.mid * 0.08;

        // Project the mesh into normalized device coords to measure pointer proximity.
        mesh.getWorldPosition(worldPos);
        worldPos.project(state.camera);

        const dx = state.pointer.x - worldPos.x;
        const dy = state.pointer.y - worldPos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Scale = base × pointer swell × beat pulse.
        const hoverBoost = dist < 0.4 ? 1.5 : 1;
        const pulse = 1 + audioReactive.bass * 0.6;
        const s = initialScale * hoverBoost * pulse;
        mesh.scale.lerp(scaleTarget.set(s, s, s), 0.12);
        if (dist < 0.4) mesh.rotation.x += 0.05;

        // Emissive glow tracks the treble — this is what Bloom picks up on the beat.
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = audioReactive.treble * 1.6;
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={meshRef} position={position}>
                <tetrahedronGeometry args={[1, 0]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0}
                    wireframe={wireframe}
                    metalness={1}
                    roughness={0.2}
                    envMapIntensity={0.6}
                    transparent
                    opacity={0.2}
                />
            </mesh>
        </Float>
    );
}

/** Advances the audio analysis once per frame (reads, never re-renders React). */
function AudioDriver() {
    useFrame(() => audioReactive.update());
    return null;
}

const FIELD_RANGE = 25;
const FIELD_POOL_SIZE = 100;

function GeometricField({ count }: { count: number }) {
    // Stable pool generated once, off the render path; `count` just controls how
    // many of them we render (dense on desktop, light on mobile).
    const [pool] = useState(() =>
        new Array(FIELD_POOL_SIZE).fill(0).map(() => ({
            position: [
                (Math.random() - 0.5) * FIELD_RANGE * 1.5,
                (Math.random() - 0.5) * FIELD_RANGE,
                (Math.random() - 0.5) * 15 - 5,
            ] as [number, number, number],
            color: Math.random() > 0.5 ? "#F5D061" : "#C0C0C0", // Gold or silver
            wireframe: true,
            scale: 0.3 + Math.random() * 0.2,
        }))
    );

    return (
        <group>
            {pool.slice(0, count).map((el, i) => (
                <GeometricElement
                    key={i}
                    position={el.position}
                    color={el.color}
                    wireframe={el.wireframe}
                    initialScale={el.scale}
                />
            ))}
        </group>
    );
}

/**
 * Responsive tuning: dense field + post-processing on desktop; lighter field and
 * no post on mobile to protect frame rate on 4G Colombian phones.
 */
function useResponsive() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 768px)");
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    return { count: isMobile ? 35 : 100, isMobile };
}

export default function Background() {
    const [opacity, setOpacity] = useState(1);
    const { count, isMobile } = useResponsive();
    const reduceMotion = useReducedMotion();
    const enablePost = !isMobile && !reduceMotion;

    useEffect(() => {
        const handleScroll = () => {
            const newOpacity = Math.max(0.6, 1 - window.scrollY / 800);
            setOpacity(newOpacity);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        // pointer-events-none lets clicks/selection pass through to the UI above;
        // R3F still tracks the pointer via eventSource={document.body}.
        <div
            className="fixed inset-0 -z-10 pointer-events-none"
            style={{ opacity, transition: "opacity 0.5s ease-out" }}
        >
            <Canvas
                camera={{ position: [0, 0, 10], fov: 45 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
                eventSource={typeof window !== "undefined" ? document.body : undefined}
                eventPrefix="client"
            >
                <AudioDriver />

                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#F5D061" />
                <pointLight position={[-10, -10, -5]} intensity={0.5} color="#C0C0C0" />

                <GeometricField count={count} />

                {/* Local, baked reflections — no remote HDR fetch. */}
                <Environment resolution={256} frames={1}>
                    <Lightformer intensity={2} color="#F5D061" position={[0, 5, -5]} scale={[10, 10, 1]} />
                    <Lightformer intensity={1} color="#C0C0C0" position={[-6, -2, -3]} scale={[8, 8, 1]} />
                    <Lightformer form="ring" intensity={1.5} color="#ffffff" position={[6, 3, 2]} scale={[5, 5, 1]} />
                </Environment>

                {/* Desktop-only bloom so the gold glows on the beat. Off on mobile / reduced-motion. */}
                {enablePost && (
                    <EffectComposer>
                        <Bloom mipmapBlur intensity={1.1} luminanceThreshold={0.15} luminanceSmoothing={0.9} />
                        <Vignette offset={0.25} darkness={0.7} />
                    </EffectComposer>
                )}
            </Canvas>
        </div>
    );
}
