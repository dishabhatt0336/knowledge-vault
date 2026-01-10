import React from 'react';
import { useCanvasAnimation } from '@/hooks/useCanvasAnimation';

const SparklesBackground = () => {
  const { canvasRef } = useCanvasAnimation();

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 "
      style={{ zIndex: 0  }}
      
    />
  );
};

export default SparklesBackground;
