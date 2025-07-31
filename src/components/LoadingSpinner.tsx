'use client';

import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeMap = {
    sm: { container: 24, barWidth: 2, barHeight: 8 },
    md: { container: 32, barWidth: 3, barHeight: 12 },
    lg: { container: 48, barWidth: 4, barHeight: 18 }
  };

  const { container, barWidth, barHeight } = sizeMap[size];
  const radius = (container - barHeight) / 2;

  // 8개의 막대 생성
  const bars = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 360) / 8;
    const rotation = angle;
    
    return {
      id: i,
      rotation,
      delay: i * 0.125 // 각 막대마다 다른 애니메이션 지연 (1초 / 8 = 0.125초)
    };
  });

  return (
    <div 
      className={`relative inline-block ${className}`}
      style={{ width: container, height: container }}
    >
      {bars.map((barData) => (
        <motion.div
          key={barData.id}
          className="absolute bg-current rounded-sm"
          style={{
            width: `${barWidth}px`,
            height: `${barHeight}px`,
            left: '50%',
            top: '50%',
            transformOrigin: `50% ${radius + barHeight/2}px`,
            transform: `translate(-50%, -50%) rotate(${barData.rotation}deg)`
          }}
          animate={{
            opacity: [0.2, 1, 0.2]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: barData.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
} 