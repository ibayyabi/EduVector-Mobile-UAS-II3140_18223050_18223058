import React from 'react';
import Svg, { Line, Circle, G, Text as SvgText } from 'react-native-svg';
import { SharedValue, useDerivedValue } from 'react-native-reanimated';

interface SimulasiCanvasSvgProps {
    width: number;
    height: number;
    centerX: number;
    centerY: number;
    vecA: SharedValue<{ x: number; y: number }>;
    vecB: SharedValue<{ x: number; y: number }>;
    resultant: SharedValue<{ x: number; y: number }>;
}

export default function SimulasiCanvasSvg({ 
    width, 
    height, 
    centerX, 
    centerY, 
    vecA, 
    vecB, 
    resultant 
}: SimulasiCanvasSvgProps) {
    // Extract values for rendering (React state, not animated)
    const vecAVal = useDerivedValue(() => vecA.value);
    const vecBVal = useDerivedValue(() => vecB.value);
    const resultantVal = useDerivedValue(() => resultant.value);

    // Grid lines
    const gridLines = [];
    for (let x = 0; x <= width; x += 25) {
        gridLines.push(
            <Line key={`v${x}`} x1={x} y1={0} x2={x} y2={height} stroke="#e0e0e0" strokeWidth={1} />
        );
    }
    for (let y = 0; y <= height; y += 25) {
        gridLines.push(
            <Line key={`h${y}`} x1={0} y1={y} x2={width} y2={y} stroke="#e0e0e0" strokeWidth={1} />
        );
    }

    return (
        <Svg width={width} height={height} style={{ backgroundColor: '#fff' }}>
            {/* Grid */}
            <G>{gridLines}</G>
            
            {/* Axes */}
            <Line x1={0} y1={centerY} x2={width} y2={centerY} stroke="#9e9e9e" strokeWidth={2} />
            <Line x1={centerX} y1={0} x2={centerX} y2={height} stroke="#9e9e9e" strokeWidth={2} />
            
            {/* Vector A (Red) */}
            <Line 
                x1={centerX} 
                y1={centerY} 
                x2={centerX + vecAVal.value.x} 
                y2={centerY - vecAVal.value.y} 
                stroke="#ef4444" 
                strokeWidth={3} 
            />
            <Circle 
                cx={centerX + vecAVal.value.x} 
                cy={centerY - vecAVal.value.y} 
                r={6} 
                fill="#ef4444" 
            />
            
            {/* Vector B (Blue) */}
            <Line 
                x1={centerX} 
                y1={centerY} 
                x2={centerX + vecBVal.value.x} 
                y2={centerY - vecBVal.value.y} 
                stroke="#3b82f6" 
                strokeWidth={3} 
            />
            <Circle 
                cx={centerX + vecBVal.value.x} 
                cy={centerY - vecBVal.value.y} 
                r={6} 
                fill="#3b82f6" 
            />
            
            {/* Resultant (Green) */}
            <Line 
                x1={centerX} 
                y1={centerY} 
                x2={centerX + resultantVal.value.x} 
                y2={centerY - resultantVal.value.y} 
                stroke="#10b981" 
                strokeWidth={3} 
                strokeDasharray="5,5"
            />
            <Circle 
                cx={centerX + resultantVal.value.x} 
                cy={centerY - resultantVal.value.y} 
                r={6} 
                fill="#10b981" 
            />
        </Svg>
    );
}
