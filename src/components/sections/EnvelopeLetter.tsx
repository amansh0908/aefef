import { useState, useEffect, useRef } from 'react';
import { Heart, Mail } from 'lucide-react';

const EnvelopeLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  // ============================================
  // 💌 CUSTOMIZE YOUR LOVE LETTER HERE:
  // ============================================
  const letterContent = `My Love Shahin,

You are my happiness, my peace, and my home. 
Every moment with you feels magical.

From the first time we talked, I knew there was 
something special about you. Your smile lights up 
my world, and your laugh is my favorite sound.

I promise to love you today, tomorrow, and always.
You are my forever, my everything.

With all my heart,
— Aman ❤️`;

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center p-6 py-20 relative"
    >
      {/* Section Title */}
      <div
        className={`text-center mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
        <h2 className="font-romantic text-3xl md:text-4xl text-foreground mb-2">
          Read My Heart…
        </h2>
        <p className="text-[#5b3441]">Click the envelope to open</p>
      </div>

      {/* Envelope + Letter Container */}
      <div
        className={`relative cursor-pointer transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Letter (slides up from behind envelope) */}
        <div
          className={`w-80 md:w-96 transition-all duration-700 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-[600px] opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0'
          }`}
        >
          <div className="paper-texture rounded-lg p-6 md:p-8 shadow-romantic">
            <pre className="font-cursive text-lg md:text-xl text-[#3a1a24] whitespace-pre-wrap leading-relaxed">
              {letterContent}
            </pre>
          </div>
        </div>

        {/* Envelope (stays at bottom) */}
        <div className="relative w-80 md:w-96 h-56 md:h-64">
          <div className="absolute inset-0 bg-gradient-to-br from-peach to-cream rounded-lg shadow-romantic">
            {/* Envelope Back Flap */}
            <div
              className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-peach-dark to-peach origin-top"
              style={{
                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              }}
            />
            
            {/* Envelope Front Triangle */}
            <div
              className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-secondary to-peach"
              style={{
                clipPath: 'polygon(0 100%, 50% 20%, 100% 100%)',
              }}
            />

            {/* Heart Seal */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-500 ${
                isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center shadow-soft">
                <Heart className="w-8 h-8 text-primary fill-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hint */}
      <p
        className={`mt-8 text-sm text-[#5b3441] transition-opacity duration-500 ${
          isOpen ? 'opacity-0' : 'opacity-100'
        }`}
      >
        Tap to {isOpen ? 'close' : 'open'} 💌
      </p>
    </section>
  );
};

export default EnvelopeLetter;
