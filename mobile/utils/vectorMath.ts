// Vector math utilities for RGB color space

export interface RGB {
  r: number;
  g: number;
  b: number;
}

// Clamp value to 0-255 range
const clamp = (value: number): number => Math.max(0, Math.min(255, Math.round(value)));

// Add two RGB vectors
export const add = (a: RGB, b: RGB): RGB => ({
  r: clamp(a.r + b.r),
  g: clamp(a.g + b.g),
  b: clamp(a.b + b.b),
});

// Subtract RGB vectors (A - B)
export const subtract = (a: RGB, b: RGB): RGB => ({
  r: clamp(a.r - b.r),
  g: clamp(a.g - b.g),
  b: clamp(a.b - b.b),
});

// Scale RGB vector by scalar
export const scale = (vec: RGB, scalar: number): RGB => ({
  r: clamp(vec.r * scalar),
  g: clamp(vec.g * scalar),
  b: clamp(vec.b * scalar),
});

// Interpolate between two RGB vectors
// t=0 returns A, t=1 returns B, t=0.5 returns midpoint
export const interpolate = (a: RGB, b: RGB, t: number): RGB => ({
  r: clamp(a.r * (1 - t) + b.r * t),
  g: clamp(a.g * (1 - t) + b.g * t),
  b: clamp(a.b * (1 - t) + b.b * t),
});

// Convert RGB to hex string
export const toHex = ({ r, g, b }: RGB): string => {
  const hex = [r, g, b]
    .map(x => clamp(x).toString(16).padStart(2, '0'))
    .join('');
  return `#${hex}`.toUpperCase();
};

// Convert hex string to RGB
export const fromHex = (hex: string): RGB => {
  const cleaned = hex.replace('#', '');
  return {
    r: parseInt(cleaned.substr(0, 2), 16),
    g: parseInt(cleaned.substr(2, 2), 16),
    b: parseInt(cleaned.substr(4, 2), 16),
  };
};
