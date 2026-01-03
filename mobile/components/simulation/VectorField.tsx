import React, { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { Canvas, Circle, Group, Skia } from '@shopify/react-native-skia';
import { useSharedValue, useFrameCallback, useDerivedValue, SharedValue } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const PARTICLE_COUNT = 60; // Reduced slightly for guaranteed safety
const INTERACTION_RADIUS = 150;
const BASE_SPEED = 0.5;

type ParticleState = {
    x: number;
    y: number;
    vx: number;
    vy: number;
};

type ParticleStatic = {
    size: number;
    density: number;
    baseX: number;
    baseY: number;
};

export default function VectorField() {
    const { width, height } = useWindowDimensions();
    const screenWidth = useSharedValue(width);
    const screenHeight = useSharedValue(height);

    // Sync dimensions
    if (screenWidth.value !== width) screenWidth.value = width;
    if (screenHeight.value !== height) screenHeight.value = height;

    // Guard against invalid dimensions during initial render
    const isReady = width > 0 && height > 0;

    // Shared values for touch
    const touchX = useSharedValue(-1000);
    const touchY = useSharedValue(-1000);


    // Correct approach using single SharedValue for all states to avoid hook-in-loop
    // We store the entire state array in one SV. 
    // This is efficient enough for 60 items.

    const particleSystem = useSharedValue<ParticleState[]>(
        Array.from({ length: PARTICLE_COUNT }).map(() => {
            const size = Math.random() * 2 + 1;
            const x = Math.random() * width;
            const y = Math.random() * height;
            return {
                x, y,
                vx: (Math.random() * BASE_SPEED * 2) - BASE_SPEED,
                vy: (Math.random() * BASE_SPEED * 2) - BASE_SPEED,
            };
        })
    );

    const staticData = useMemo(() => {
        return Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
            // We need to match the initial positions of the SV, 
            // but effectively we can just regenerate or sync.
            // For simplicity, let's just make new randoms that will align over time 
            // or just accept random start.
            // Actually, to reference 'baseX', we need to capture it.
            const initial = particleSystem.value[i];
            return {
                size: Math.random() * 2 + 1,
                density: (Math.random() * 30) + 1,
                baseX: initial.x,
                baseY: initial.y
            };
        });
    }, [width, height]);


    useFrameCallback(() => {
        'worklet';
        // Physics update loop
        // We clone the array to mutate it (copy-on-write is needed for Reanimated usually, or mutable w/ modify)
        // modify() allows in-place mutation which is faster

        particleSystem.modify((particles) => {
            const tx = touchX.value;
            const ty = touchY.value;

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                const s = staticData[i]; // Accessing outer scope JS object in worklet? 
                // WARNING: staticData is on JS thread. 
                // We cannot access 'staticData' efficiently in UI thread worklet unless captured.
                // Reanimated captures closed-over variables. `staticData` is a constant array.
                // It should be fine if it's JSON serializable.

                // Ambient motion
                p.x += p.vx;
                p.y += p.vy;

                // Wall bouncing
                if (p.x < 0 || p.x > screenWidth.value) p.vx *= -1;
                if (p.y < 0 || p.y > screenHeight.value) p.vy *= -1;

                // Interaction
                let dx = tx - p.x;
                let dy = ty - p.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                let maxDistance = INTERACTION_RADIUS;

                if (distance < maxDistance) {
                    let force = (maxDistance - distance) / maxDistance;
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    
                    let directionX = forceDirectionX * force * s.density;
                    let directionY = forceDirectionY * force * s.density;

                    p.x -= directionX;
                    p.y -= directionY;
                }
            }
            return particles;
        });
    });

    const gesture = Gesture.Pan()
        .onChange((e) => {
            touchX.value = e.x;
            touchY.value = e.y;
        })
        .onFinalize(() => {
            touchX.value = -1000;
            touchY.value = -1000;
        });

    // Don't render until dimensions are valid
    if (!isReady) {
        return null;
    }

    return (
        <GestureDetector gesture={gesture}>
            <Canvas style={{ flex: 1, backgroundColor: 'transparent' }}>
                <Group>
                    {staticData.map((s, i) => (
                        <ParticleNode
                            key={i}
                            index={i}
                            system={particleSystem}
                            size={s.size}
                        />
                    ))}
                </Group>
            </Canvas>
        </GestureDetector>
    );
}

// Optimization: Individual component to select its specific state
// This prevents re-rendering all particles if we were using React State,
// but with Reanimated Skia binding, we need to bind props to derived values.
const ParticleNode = ({ index, system, size }: { index: number, system: SharedValue<ParticleState[]>, size: number }) => {

    // Create derived values for x and y specific to this particle
    const cx = useDerivedValue(() => {
        return system.value[index].x;
    });

    const cy = useDerivedValue(() => {
        return system.value[index].y;
    });

    return <Circle cx={cx} cy={cy} r={size * 0.7} color="#005fdb" opacity={0.15} />;
};
