import { useState, useCallback } from 'react';
import { add, subtract, scale, interpolate, type RGB } from '@/utils/vectorMath';

export type RGBTab = 'A' | 'OPS' | 'B';

export const useRGBPalette = () => {
  // State for input vectors
  const [vectorA, setVectorA] = useState<RGB>({ r: 255, g: 0, b: 0 });
  const [vectorB, setVectorB] = useState<RGB>({ r: 0, g: 0, b: 255 });

  // State for result vector
  const [resultVector, setResultVector] = useState<RGB>({ r: 255, g: 0, b: 255 });

  // State for controls
  const [scalar, setScalar] = useState(1.0);
  const [interpolation, setInterpolation] = useState(0.5);

  // Active Tab State
  const [activeTab, setActiveTab] = useState<RGBTab>('OPS');

  // Operations
  const handleAdd = useCallback(() => {
    setResultVector(add(vectorA, vectorB));
  }, [vectorA, vectorB]);

  const handleSubtract = useCallback(() => {
    setResultVector(subtract(vectorA, vectorB));
  }, [vectorA, vectorB]);

  const handleScale = useCallback(() => {
    setResultVector(scale(vectorA, scalar));
  }, [vectorA, scalar]);

  const handleInterpolate = useCallback(() => {
    setResultVector(interpolate(vectorA, vectorB, interpolation));
  }, [vectorA, vectorB, interpolation]);

  return {
    vectorA,
    setVectorA,
    vectorB,
    setVectorB,
    resultVector,
    scalar,
    setScalar,
    interpolation,
    setInterpolation,
    activeTab,
    setActiveTab,
    handleAdd,
    handleSubtract,
    handleScale,
    handleInterpolate
  };
};
