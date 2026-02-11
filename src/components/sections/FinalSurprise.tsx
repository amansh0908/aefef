import { useState, useEffect, useRef } from 'react';
import { Gift, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';

const FinalSurprise = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [showProposal, setShowProposal] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
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

  const handleOpenBox = () => {
    if (!isBoxOpen) {
      setIsBoxOpen(true);
      setTimeout(() => {
        setShowProposal(true);
        triggerSparkles();
      }, 1200);
    }
  };

  const handleAlways = () => {
    setShowFinal(true);
    triggerCelebration();
  };

  const triggerSparkles = () => {
    const colors = ['#fbbf24', '#f9a8d4', '#e879f9'];
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 },
      colors,
    });
  };

  const triggerCelebration = () => {
    const duration = 3000;
    const colors = ['#f9a8d4', '#fda4af', '#fb7185', '#e879f9', '#c4b5fd', '#fbbf24'];

    const interval = setInterval(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors,
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors,
      });
    }, 250);

    setTimeout(() => clearInterval(interval), duration);
  };

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
        <Sparkles className="w-10 h-10 text-gold mx-auto mb-4" />
        <h2 className="font-romantic text-3xl md:text-4xl text-foreground">
          One Last Surprise 💍
        </h2>
        {!isBoxOpen && (
          <p className="text-muted-foreground mt-2">Click the box to open</p>
        )}
      </div>

      {/* Gift Box */}
      <div
        className={`relative cursor-pointer transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        } ${showProposal ? 'pointer-events-none' : ''}`}
        onClick={handleOpenBox}
      >
        {/* Box Container */}
        <div className="relative perspective-1000">
          {/* Box Base */}
          <div className="w-32 h-24 md:w-40 md:h-28 bg-gradient-to-br from-primary to-lavender rounded-lg shadow-romantic relative">
            {/* Box Pattern */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-1 bg-gold/40 absolute" />
              <div className="h-full w-1 bg-gold/40 absolute" />
            </div>
          </div>

          {/* Box Lid */}
          <div
            className={`absolute -top-6 md:-top-8 left-1/2 -translate-x-1/2 w-36 h-8 md:w-44 md:h-10 bg-gradient-to-br from-primary to-lavender rounded-t-lg shadow-soft origin-bottom transition-transform duration-700 ${
              isBoxOpen ? 'animate-box-open' : ''
            }`}
          >
            {/* Bow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Gift className="w-6 h-6 text-gold" />
            </div>
          </div>

          {/* Ring (appears when opened) */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 transition-all duration-700 ${
              isBoxOpen ? 'animate-ring-rise -translate-y-20 md:-translate-y-24' : 'translate-y-0 opacity-0'
            }`}
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 bg-gold/30 rounded-full blur-xl animate-pulse" />
              
              {/* Ring */}
              <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-gold shadow-glow flex items-center justify-center bg-gradient-to-br from-gold-light to-gold">
                <Heart className="w-5 h-5 md:w-6 md:h-6 text-primary fill-primary" />
              </div>

              {/* Sparkles */}
              <Sparkles
                className="absolute -top-3 -right-3 w-5 h-5 text-gold animate-sparkle"
                style={{ animationDelay: '0.2s' }}
              />
              <Sparkles
                className="absolute -bottom-2 -left-3 w-4 h-4 text-gold animate-sparkle"
                style={{ animationDelay: '0.5s' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Proposal Text */}
      {showProposal && !showFinal && (
        <div className="mt-16 text-center animate-fade-in-up">
          <h3 className="font-cursive text-4xl md:text-5xl lg:text-6xl text-primary animate-text-glow mb-8">
            Will You Be My Valentine? 👀
          </h3>
          <Button
            onClick={handleAlways}
            size="lg"
            className="px-12 py-6 text-xl rounded-full bg-gradient-to-r from-primary to-lavender text-primary-foreground shadow-romantic hover:shadow-glow transition-all duration-300 hover:scale-105"
          >
            Always ❤️
          </Button>
        </div>
      )}

      {/* Final Message */}
      {showFinal && (
        <div className="mt-16 text-center animate-fade-in-scale max-w-lg">
          <Heart className="w-16 h-16 text-primary fill-primary mx-auto mb-6 animate-pulse" />
          <h3 className="font-cursive text-4xl md:text-5xl text-primary mb-6">
            I Love You Forever! 💕
          </h3>
          <p className="font-romantic text-lg md:text-xl text-foreground leading-relaxed">
            Thank you for being the most amazing person in my life. 
            Every day with you is a gift, and I promise to cherish 
            you forever. You are my heart, my soul, my everything.
          </p>
          <p className="font-cursive text-2xl text-primary mt-8">
            — Aman ❤️ Shahin
          </p>
        </div>
      )}
    </section>
  );
};

export default FinalSurprise;
