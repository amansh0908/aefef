import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number; delay: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    const generateHearts = () => {
      const newHearts = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 10 + Math.random() * 10,
        size: 12 + Math.random() * 16,
      }));
      setHearts(newHearts);
    };

    generateHearts();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute text-primary/20 fill-primary/10"
          style={{
            left: `${heart.left}%`,
            bottom: '-20px',
            width: heart.size,
            height: heart.size,
            animation: `float-up ${heart.duration}s linear ${heart.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingHearts;
