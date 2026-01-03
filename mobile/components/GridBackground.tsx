import React, { useId } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, Pattern, Rect, Path } from 'react-native-svg';
import { Colors } from '@/constants/theme';
import AnimatedBackground from './AnimatedBackground';

interface GridBackgroundProps {
  children?: React.ReactNode;
  animated?: boolean;
}

export default function GridBackground({ children, animated = false }: GridBackgroundProps) {
  // Use unique ID for pattern to avoid collision when multiple instances exist
  const patternId = useId();

  return (
    <View style={styles.container}>
      <View style={styles.background} pointerEvents="none">
        {animated && <AnimatedBackground />}
        <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
          <Defs>
            <Pattern
              id={patternId}
              width="25"
              height="25"
              patternUnits="userSpaceOnUse"
            >
              <Path
                d="M 25 0 L 0 0 0 25"
                fill="none"
                stroke={Colors.primaryDark}
                strokeWidth="0.5"
                opacity="0.3"
              />
            </Pattern>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${patternId})`} />
        </Svg>
      </View>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});
