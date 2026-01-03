import { useState, useRef, useCallback, useEffect } from 'react';

export interface Point { x: number; y: number; }

interface UseProjectileMotionProps {
  canvasWidth: number;
  canvasHeight: number;
}

export const useProjectileMotion = ({ canvasWidth, canvasHeight }: UseProjectileMotionProps) => {
  const [projectile, setProjectile] = useState<Point | null>(null);
  const [trails, setTrails] = useState<Point[]>([]);
  const animationRef = useRef<number | null>(null);
  const velocityRef = useRef<Point>({ x: 0, y: 0 });

  const launchProjectile = useCallback((v0x: number, v0y: number) => {
    if (v0x === 0 && v0y === 0) return;
    
    velocityRef.current = { x: v0x, y: v0y };
    setTrails([]);
    
    const g = 0.5;
    const startTime = Date.now();
    const trailPoints: Point[] = [];
    let frameCount = 0;

    const animate = () => {
      const t = (Date.now() - startTime) / 100;
      const x = v0x * t / 10;
      const y = v0y * t / 10 - g * t * t;

      if (y < 0 || x > canvasWidth) {
        setProjectile(null);
        setTrails([...trailPoints]);
        animationRef.current = null;
        return;
      }

      setProjectile({ x, y });
      
      frameCount++;
      if (frameCount % 3 === 0) {
        trailPoints.push({ x, y });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
  }, [canvasWidth]);

  const reset = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    setProjectile(null);
    setTrails([]);
    velocityRef.current = { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return {
    projectile,
    trails,
    launchProjectile,
    reset
  };
};
