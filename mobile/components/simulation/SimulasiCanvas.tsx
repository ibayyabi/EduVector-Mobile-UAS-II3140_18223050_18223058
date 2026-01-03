import React, { useMemo } from 'react';
import { Canvas, Group, Path, Skia } from '@shopify/react-native-skia';
import { VectorRenderer } from '@/components/simulation/VectorRenderer';
import { SharedValue } from 'react-native-reanimated';

interface SimulasiCanvasProps {
    width: number;
    height: number;
    centerX: number;
    centerY: number;
    vecA: SharedValue<{ x: number; y: number }>;
    vecB: SharedValue<{ x: number; y: number }>;
    resultant: SharedValue<{ x: number; y: number }>;
}

const Grid = ({ width, height, cx, cy }: { width: number, height: number, cx: number, cy: number }) => {
    const gridPath = useMemo(() => {
        const path = Skia.Path.Make();
        for (let x = 0; x <= width; x += 25) {
            path.moveTo(x, 0);
            path.lineTo(x, height);
        }
        for (let y = 0; y <= height; y += 25) {
            path.moveTo(0, y);
            path.lineTo(width, y);
        }
        return path;
    }, [width, height]);

    const axesPath = useMemo(() => {
        const path = Skia.Path.Make();
        path.moveTo(0, cy);
        path.lineTo(width, cy);
        path.moveTo(cx, 0);
        path.lineTo(cx, height);
        return path;
    }, [width, height, cx, cy]);

    return (
        <Group>
            <Path path={gridPath} color="#e0e0e0" style="stroke" strokeWidth={1} />
            <Path path={axesPath} color="#9e9e9e" style="stroke" strokeWidth={2} />
        </Group>
    );
};

export default function SimulasiCanvas({ 
    width, 
    height, 
    centerX, 
    centerY, 
    vecA, 
    vecB, 
    resultant 
}: SimulasiCanvasProps) {
    return (
        <Canvas style={{ flex: 1 }}>
            <Grid width={width} height={height} cx={centerX} cy={centerY} />
            <VectorRenderer vec={vecA} color="red" label="A" cx={centerX} cy={centerY} />
            <VectorRenderer vec={vecB} color="blue" label="B" cx={centerX} cy={centerY} />
            <VectorRenderer vec={resultant} color="green" label="R" cx={centerX} cy={centerY} />
        </Canvas>
    );
}
