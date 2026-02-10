import { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';

const MainReveal = () => {
  const [showContent, setShowContent] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 300);
    setTimeout(() => setShowName(true), 800);
    setTimeout(() => setShowQuote(true), 1400);
  }, []);

  const handleShowerLove = () => {
    // Heart-shaped confetti burst
    const colors = ['#f9a8d4', '#fda4af', '#fb7185', '#e879f9', '#c4b5fd'];
    
    // Center burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors,
      shapes: ['circle'],
    });

    // Side bursts
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
    }, 150);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-love-pattern opacity-50" />
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-1/4 animate-float-heart" style={{ animationDelay: '0.5s' }}>
        <Heart className="w-6 h-6 text-primary/30 fill-primary/20" />
      </div>
      <div className="absolute top-1/4 right-10 animate-float-heart" style={{ animationDelay: '1.5s' }}>
        <Sparkles className="w-8 h-8 text-gold/40" />
      </div>
      <div className="absolute bottom-1/4 left-10 animate-float-heart" style={{ animationDelay: '2s' }}>
        <Heart className="w-10 h-10 text-primary/20 fill-primary/10" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Happy Valentine's Day */}
        <div
          className={`transition-all duration-1000 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="inline-flex items-center gap-2 text-lg md:text-xl text-muted-foreground mb-4">
            <Sparkles className="w-5 h-5 text-gold" />
            Happy Valentine's Day
            <Sparkles className="w-5 h-5 text-gold" />
          </span>
        </div>

        {/* Name Reveal */}
        <div
          className={`transition-all duration-1000 ${
            showName ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <h1 className="font-cursive text-6xl md:text-8xl lg:text-9xl text-primary animate-text-glow mb-6">
            Shahin
          </h1>
        </div>

        {/* Quote */}
        <div
          className={`transition-all duration-1000 ${
            showQuote ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="font-romantic text-xl md:text-2xl text-foreground italic mb-12 flex items-center justify-center gap-2">
            "My heart beats only for you"
            <Heart className="w-5 h-5 text-primary fill-primary animate-pulse" />
          </p>
        </div>

        {/* Shower Love Button */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            showQuote ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Button
            onClick={handleShowerLove}
            size="lg"
            className="px-8 py-6 text-lg rounded-full bg-gradient-to-r from-primary to-lavender text-primary-foreground shadow-romantic hover:shadow-glow transition-all duration-300 hover:scale-105"
          >
            Shower Me With Love 💝
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MainReveal;
