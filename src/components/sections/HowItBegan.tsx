import { useEffect, useRef, useState } from 'react';

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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const moments = [
    {
      title: 'First Hello',
      emoji: '💬 ✨',
      description: 'A simple "hi" that turned into endless conversations and unexpected feelings.',
      align: 'right' as const,
    },
    {
      title: 'Late Night Talks',
      emoji: '❤️ 🌙',
      description: 'Talking till midnight, sharing secrets, laughing softly, and forgetting the world.',
      align: 'left' as const,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center p-6 py-20"
    >
      {/* Section Title */}
      <div
        className={`text-center mb-4 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="font-romantic text-4xl md:text-5xl lg:text-6xl text-foreground">
          How It All Began…
        </h2>
      </div>

      {/* Timeline Cards */}
      <div className="relative w-full max-w-3xl mt-12 flex flex-col gap-16">
        {/* Vertical center line (hidden on mobile) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-primary/20 -translate-x-1/2" />

        {moments.map((moment, index) => (
          <div
            key={moment.title}
            className={`relative flex w-full ${
              moment.align === 'right' ? 'md:justify-end' : 'md:justify-start'
            } justify-center transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${index * 300 + 300}ms` }}
          >
            {/* Dot on timeline (hidden on mobile) */}
            <div className="hidden md:block absolute left-1/2 top-8 w-3 h-3 rounded-full bg-primary/40 -translate-x-1/2 z-10" />

            <div
              className={`w-full md:w-[45%] bg-card/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-soft border border-primary/10 hover:shadow-romantic transition-shadow duration-500`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{moment.emoji}</span>
                <h3 className="font-semibold text-lg text-foreground">{moment.title}</h3>
              </div>
              <p className="text-[#4a2a35] text-sm leading-relaxed">
                {moment.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItBegan;
