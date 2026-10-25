import React from 'react';

export const Vignette: React.FC<{
  intensity?: number;
  tintColor?: string;
}> = ({ intensity = 0.8, tintColor = 'rgba(0,0,0,' }) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 90,
        background: `radial-gradient(circle at 50% 50%, transparent 40%, ${tintColor}${intensity}) 100%)`,
        boxShadow: 'inset 0 0 120px rgba(0,0,0,0.9)',
      }}
    />
  );
};
