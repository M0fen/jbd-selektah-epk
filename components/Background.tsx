"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { clsx } from "clsx";

/**
 * Individual Geometric Element
 * Rotates and scales up when mouse is near.
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

    // Random rotation speed
    const rotationSpeed = useMemo(() => {
        return [
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02,
        ];
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;

        // Base rotation
        meshRef.current.rotation.x += rotationSpeed[0];
        meshRef.current.rotation.y += rotationSpeed[1];
        meshRef.current.rotation.z += rotationSpeed[2];

        // Mouse Interaction (Magnetic Oscillation)
        // Convert world position to screen space to check mouse proximity?
        // Or check in 3D space if we have a raycaster?
        // Easier: Use state.pointer (normalized -1 to 1) and project mesh position?
        // Actually, simple vector distance in 3D if we unproject mouse?
        // Let's use simple distance from camera ray?

        // Simplest approach: Use the pointer vector and check distance to object's screen position?
        // But object is in 3D.
        // Let's just use the `useFrame` state.pointer which is [-1, 1].
        // We need object position in NDC.

        const vec = new THREE.Vector3();
        meshRef.current.getWorldPosition(vec);
        vec.project(state.camera); // vec is now in NDC [-1, 1]

        const dx = state.pointer.x - vec.x;
        const dy = state.pointer.y - vec.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // If close (e.g. < 0.3 NDC units), scale up and oscillate faster
        if (dist < 0.4) {
            const scaleTarget = initialScale * 1.5;
            meshRef.current.scale.lerp(new THREE.Vector3(scaleTarget, scaleTarget, scaleTarget), 0.1);
            meshRef.current.rotation.x += 0.05; // Spin faster
        } else {
            meshRef.current.scale.lerp(new THREE.Vector3(initialScale, initialScale, initialScale), 0.1);
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={meshRef} position={position}>
                <tetrahedronGeometry args={[1, 0]} />
                <meshStandardMaterial
                    color={color}
                    wireframe={wireframe}
                    metalness={1}
                    roughness={0.2}
                    transparent
                    opacity={0.2}
                />
            </mesh>
        </Float>
    );
}

// Fix Float syntax: <Float speed={2} ...>
// But wait, the component is defined below.

function GeometricField() {
    const count = 100; // Increased density
    const range = 25;

    const elements = useMemo(() => {
        return new Array(count).fill(0).map((_, i) => ({
            position: [
                (Math.random() - 0.5) * range * 1.5, // Wider spread
                (Math.random() - 0.5) * range,
                (Math.random() - 0.5) * 15 - 5, // Behind text mostly, but some front?
                // Z range: -10 to 0? Camera is at 0,0,5 usually.
                // Let's put them -15 to 2.
            ] as [number, number, number],
            color: Math.random() > 0.5 ? "#F5D061" : "#C0C0C0", // Gold or Silver
            wireframe: true, // Force wireframe for "finer" look? Or mixed. Let's keep mixed but mostly wireframe.
            scale: 0.3 + Math.random() * 0.2, // Smaller scale
        }));
    }, []);

    return (
        <group>
            {elements.map((el, i) => (
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

export default function Background() {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            // Fade out after 100vh? Or gradual?
            // "Opacity starts at 1.0 (Hero) and fades to 0.6 (lower sections)" - More visible triangles
            const newOpacity = Math.max(0.6, 1 - scrollY / 800);
            setOpacity(newOpacity);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className="fixed inset-0 -z-10 pointer-events-none" // pointer-events-none allows text selection, but blocks mouse interaction for R3F?
            // Wait, if pointer-events-none, R3F won't get mouse events?
            // We want R3F to receive mouse events but NOT block clicks on UI.
            // Canvas should have pointer-events-none? No, then it tracks?
            // R3F tracks mouse via window listener usually? Or canvas listener?
            // Usually R3F adds listeners to the canvas.
            // If canvas has pointer-events-none, it won't receive events?
            // Actually `eventSource={window}` allows R3F to track events even if canvas is ignored?
            // But we need to click links on top.
            // So `z-10` is behind. `pointer-events-none` on container implies clicks go through.
            // R3F `pointer-events-none` might disable hover?
            // Solution: `eventSource={document.body}` or similar.
            style={{ opacity, transition: "opacity 0.5s ease-out" }}
        >
            <Canvas
                camera={{ position: [0, 0, 10], fov: 45 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]} // Performance optimization
                eventSource={typeof window !== 'undefined' ? document.body : undefined}
                eventPrefix="client"
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#F5D061" />
                <pointLight position={[-10, -10, -5]} intensity={0.5} color="#C0C0C0" />

                <GeometricField />

                {/* Environment for reflections on metallic objects */}
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
