import { useEffect, useRef, useState } from 'react';
import { Sparkles, Moon } from 'lucide-react';
import { Card } from '@/components/ui/card';

const HowItBegan = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const moments = [
    {
      icon: Sparkles,
      title: 'First Hello',
      emoji: '✨',
    },
    {
      icon: Moon,
      title: 'Late Night Talks',
      emoji: '🌙',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center p-6 py-20"
    >
      {/* Section Title */}
      <div
        className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="font-romantic text-3xl md:text-4xl lg:text-5xl text-foreground">
          How It All Began…
        </h2>
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row gap-8 max-w-2xl">
        {moments.map((moment, index) => (
          <Card
            key={moment.title}
            className={`group relative p-8 md:p-10 rounded-2xl bg-card/80 backdrop-blur-sm border-primary/20 shadow-soft hover:shadow-romantic transition-all duration-500 cursor-default ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${index * 200 + 300}ms` }}
          >
            {/* Glow Effect on Hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-lavender/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Icon */}
            <div className="relative mb-6 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <moment.icon className="w-8 h-8 text-primary" />
              </div>
            </div>

            {/* Title */}
            <h3 className="relative font-romantic text-2xl text-center text-foreground group-hover:text-primary transition-colors duration-300">
              {moment.title} {moment.emoji}
            </h3>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default HowItBegan;
