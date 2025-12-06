import React, { useEffect, useState } from 'react';

const Confetti: React.FC = () => {
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    setParticles(Array.from({ length: 50 }, (_, i) => i));
    const timer = setTimeout(() => { setParticles([]); }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {particles.map((i) => {
        const left = Math.random() * 100;
        const animDelay = Math.random() * 0.5;
        const bg = ['#f97316', '#fbbf24', '#ffffff'][Math.floor(Math.random() * 3)];
        return (
          <div key={i} className="absolute top-0 w-3 h-3 rounded-sm animate-[fall_3s_ease-out_forwards]" style={{ left: `${left}%`, backgroundColor: bg, animationDelay: `${animDelay}s`, transform: `rotate(${Math.random() * 360}deg)` }}/>
        );
      })}
      <style>{`@keyframes fall { 0% { top: -10%; opacity: 1; transform: rotate(0deg); } 100% { top: 110%; opacity: 0; transform: rotate(720deg); } }`}</style>
    </div>
  );
};

export default Confetti;
