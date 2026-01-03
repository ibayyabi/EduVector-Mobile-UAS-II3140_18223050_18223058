import React from 'react';
import { Canvas, Path, Skia, Paint, Group, Text, useFont, FontStyle } from '@shopify/react-native-skia';
import { SharedValue, useDerivedValue } from 'react-native-reanimated';

interface VectorProps {
    vec: SharedValue<{ x: number, y: number }>;
    color: string;
    label: string;
    cx: number;
    cy: number;
}

// Arrow drawing helper
const getVectorPath = (x: number, y: number, cx: number, cy: number, arrowSize = 10) => {
    'worklet';
    const path = Skia.Path.Make();
    // Start at origin
    path.moveTo(cx, cy);
    // End point in Canvas coords
    const endX = cx + x;
    const endY = cy - y; // Flip Y
    path.lineTo(endX, endY);

    // Arrowhead logic
    const angle = Math.atan2(endY - cy, endX - cx);

    // We can draw arrowhead as a separate path or append
    // Skia path doesn't have "save/restore" for transforms inside path construction easily
    // Manual transform:
    // Left wing
    path.lineTo(
        endX - arrowSize * Math.cos(angle - Math.PI / 6),
        endY - arrowSize * Math.sin(angle - Math.PI / 6)
    );
    path.moveTo(endX, endY);
    // Right wing
    path.lineTo(
        endX - arrowSize * Math.cos(angle + Math.PI / 6),
        endY - arrowSize * Math.sin(angle + Math.PI / 6)
    );

    return path;
};

export const VectorRenderer = ({ vec, color, label, cx, cy }: VectorProps) => {
    const font = useFont(require('@/assets/fonts/SpaceMono-Regular.ttf'), 14);

    // ✅ CRITICAL: Always call hooks in the same order
    // Must be called BEFORE any conditional logic or early returns
    const path = useDerivedValue(() => {
        'worklet';
        return getVectorPath(vec.value.x, vec.value.y, cx, cy);
    }, [vec, cx, cy]);

    const textPos = useDerivedValue(() => {
        'worklet';
        const x = cx + vec.value.x;
        const y = cy - vec.value.y;
        return { x: x + 10, y: y }; // Offset label
    }, [vec, cx, cy]);

    // ✅ Conditional rendering happens AFTER all hooks
    return (
        <Group>
            <Path
                path={path}
                color={color}
                style="stroke"
                strokeWidth={3}
                strokeCap="round"
                strokeJoin="round"
            />
            {/* Only render text when font is loaded */}
            {font && (
                <Text
                    x={textPos.value.x}
                    y={textPos.value.y}
                    text={label}
                    font={font}
                    color={color}
                />
            )}
        </Group>
    );
};
