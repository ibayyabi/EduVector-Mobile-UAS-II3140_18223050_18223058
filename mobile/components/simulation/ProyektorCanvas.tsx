import React, { useRef, useState, useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Line, Circle } from 'react-native-svg';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import type { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { Colors } from '@/constants/theme';
import type { Point } from '@/hooks/useProjectileMotion';

interface ProyektorCanvasProps {
  width: number;
  height: number;
  projectile: Point | null;
  trails: Point[];
  onLaunch: (v0x: number, v0y: number) => void;
  onDrag: (info: { x: number; y: number; mag: number; angle: number }) => void;
}

export const ProyektorCanvas = ({ 
  width, 
  height, 
  projectile, 
  trails, 
  onLaunch,
  onDrag 
}: ProyektorCanvasProps) => {
  const [dragPos, setDragPos] = useState<Point>({ x: 0, y: 0 });
  const [showVector, setShowVector] = useState(false);

  // Grid lines
  const gridLines = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => (
      <React.Fragment key={i}>
        <Line x1={i * 40} y1={0} x2={i * 40} y2={height} stroke="#ddd" strokeWidth={0.5} />
        <Line x1={0} y1={i * 40} x2={width} y2={i * 40} stroke="#ddd" strokeWidth={0.5} />
      </React.Fragment>
    ));
  }, [width, height]);

  const onGestureEvent = useCallback((event: PanGestureHandlerGestureEvent) => {
    const { x, y, state } = event.nativeEvent;
    
    if (state === State.ACTIVE) {
      const posX = Math.max(0, Math.min(x, width));
      const posY = Math.max(0, Math.min(height - y, height));
      
      setDragPos({ x: posX, y: posY });
      setShowVector(true);
      
      const mag = Math.sqrt(posX * posX + posY * posY);
      const angle = Math.atan2(posY, posX) * 180 / Math.PI;
      
      onDrag({ 
        x: Math.round(posX), 
        y: Math.round(posY), 
        mag: Math.round(mag), 
        angle: Math.round(angle) 
      });
    }
  }, [width, height, onDrag]);

  const onHandlerStateChange = useCallback((event: PanGestureHandlerGestureEvent) => {
    // @ts-ignore
    const { state, oldState } = event.nativeEvent;
    
    if (oldState === State.ACTIVE && (state === State.END || state === State.CANCELLED)) {
      setShowVector(false);
      onLaunch(dragPos.x, dragPos.y);
    }
  }, [dragPos, onLaunch]);

  return (
    <PanGestureHandler 
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <View style={{ flex: 1 }}>
        <Svg width={width} height={height} style={{ backgroundColor: '#fafafa' }}>
          {gridLines}
          
          {/* Axes */}
          <Line x1={0} y1={height} x2={width} y2={height} stroke="#000" strokeWidth={2} />
          <Line x1={0} y1={0} x2={0} y2={height} stroke="#000" strokeWidth={2} />
          
          {/* Vector arrow */}
          {showVector && dragPos.x > 0 && dragPos.y > 0 && (
            <Line 
              x1={0} 
              y1={height} 
              x2={dragPos.x} 
              y2={height - dragPos.y} 
              stroke={Colors.error} 
              strokeWidth={3} 
            />
          )}
          
          {/* Trails */}
          {trails.map((p, i) => (
            <Circle key={i} cx={p.x} cy={height - p.y} r={2} fill="rgba(59,130,246,0.5)" />
          ))}
          
          {/* Projectile */}
          {projectile && (
            <Circle cx={projectile.x} cy={height - projectile.y} r={6} fill={Colors.primary} />
          )}
        </Svg>
      </View>
    </PanGestureHandler>
  );
};
